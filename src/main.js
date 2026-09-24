const { app, BrowserWindow, ipcMain, safeStorage, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs/promises');
const os = require('node:os');

const API_BASE = 'https://api-direct.ccapi.us/v1';
const CONFIG_ROOT = path.join(app.getPath('userData'), 'profiles');

function createWindow() {
  const win = new BrowserWindow({ width: 1180, height: 820, minWidth: 980, minHeight: 680, title: 'CCAPI Setup', webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false } });
  win.loadFile(path.join(__dirname, 'index.html'));
}
async function safeFetch(url, options = {}) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 15000);
  try { return await fetch(url, { ...options, signal: controller.signal }); } finally { clearTimeout(timer); }
}
ipcMain.handle('api-test', async (_, { token, kind = 'models', model, prompt }) => {
  if (!token || typeof token !== 'string') return { ok: false, message: '请输入 API Key' };
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  try {
    let res;
    if (kind === 'models') res = await safeFetch(`${API_BASE}/models`, { headers });
    else if (kind === 'chat') res = await safeFetch(`${API_BASE}/chat/completions`, { method: 'POST', headers, body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt || '请回复：配置成功' }], max_tokens: 20 }) });
    else if (kind === 'image') res = await safeFetch(`${API_BASE}/images/generations`, { method: 'POST', headers, body: JSON.stringify({ model, prompt: prompt || '一朵白色雏菊，简洁插画', size: '1024x1024' }) });
    else if (kind === 'video') res = await safeFetch(`${API_BASE}/videos`, { method: 'POST', headers, body: JSON.stringify({ model, prompt: prompt || '静态镜头，清晨光线中的白色纸船', duration: 4, resolution: '768p', aspect_ratio: '16:9' }) });
    const text = await res.text(); let data; try { data = JSON.parse(text); } catch { data = {}; }
    return { ok: res.ok, status: res.status, data, message: res.ok ? '连接成功' : (data?.error?.message || `请求失败（HTTP ${res.status}）`) };
  } catch (e) { return { ok: false, message: e.name === 'AbortError' ? '请求超时，请检查网络' : '连接失败，请检查网络或 API 地址' }; }
});
ipcMain.handle('save-token', async (_, token) => {
  if (!safeStorage.isEncryptionAvailable()) return { ok: false, message: '系统密钥存储不可用' };
  await fs.mkdir(CONFIG_ROOT, { recursive: true });
  await fs.writeFile(path.join(CONFIG_ROOT, 'api-key.bin'), safeStorage.encryptString(token));
  return { ok: true };
});
ipcMain.handle('get-token', async () => { try { return safeStorage.decryptString(await fs.readFile(path.join(CONFIG_ROOT, 'api-key.bin'))); } catch { return ''; } });
ipcMain.handle('open-url', (_, url) => shell.openExternal(url));
ipcMain.handle('export-config', async (_, { format, tool, token, model }) => {
  const payload = { baseURL: API_BASE, apiKey: token || 'YOUR_API_KEY', model: model || 'gpt-6-sol' };
  const content = format === 'env' ? `OPENAI_BASE_URL=${API_BASE}\nOPENAI_API_KEY=${payload.apiKey}\nOPENAI_MODEL=${payload.model}\n` : JSON.stringify(payload, null, 2);
  const file = path.join(app.getPath('downloads'), `ccapi-${tool || 'config'}.${format === 'env' ? 'env' : 'json'}`);
  await fs.writeFile(file, content, { mode: 0o600 }); return file;
});
app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
