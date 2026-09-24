const path = require('node:path');
const os = require('node:os');
const home = os.homedir();
const p = (...x) => path.join(home, ...x);
module.exports = [
  { id:'cursor', name:'Cursor', paths:[p('Library/Application Support/Cursor/User/settings.json'),p('AppData/Roaming/Cursor/User/settings.json'),p('.config/Cursor/User/settings.json')], format:'json', patch:(c,i)=>({...c, 'openai.apiBase':i.baseURL, 'openai.apiKey':i.apiKey, 'openai.model':i.model}) },
  { id:'claude-code', name:'Claude Code', paths:[p('.claude/settings.json')], format:'json', patch:(c,i)=>({...c, env:{...(c.env||{}), ANTHROPIC_BASE_URL:i.baseURL, ANTHROPIC_API_KEY:i.apiKey, ANTHROPIC_MODEL:i.model}}) },
  { id:'codex', name:'Codex CLI', paths:[p('.codex/config.toml')], format:'toml', patch:(_,i)=>`model = "${i.model}"\nmodel_provider = "ccapi"\n\n[model_providers.ccapi]\nname = "CCAPI"\nbase_url = "${i.baseURL}"\nenv_key = "OPENAI_API_KEY"\n` },
  { id:'cherry', name:'Cherry Studio', paths:[p('Library/Application Support/CherryStudio/config.json'),p('AppData/Roaming/CherryStudio/config.json'),p('.config/CherryStudio/config.json')], format:'json', patch:(c,i)=>({...c, providers:[...(c.providers||[]).filter(x=>x.name!=='CCAPI'),{name:'CCAPI',type:'openai',baseURL:i.baseURL,apiKey:i.apiKey,models:[i.model]}]}) },
  { id:'lobe', name:'LobeChat / NextChat', paths:[p('.lobechat/config.json'),p('.nextchat/config.json')], format:'json', patch:(c,i)=>({...c, OPENAI_API_KEY:i.apiKey, OPENAI_PROXY_URL:i.baseURL, CUSTOM_MODELS:i.model}) },
  { id:'openclaw', name:'OpenClaw', paths:[p('.openclaw/config.json'),p('.config/openclaw/config.json')], format:'json', patch:(c,i)=>({...c, providers:{...(c.providers||{}),ccapi:{baseURL:i.baseURL,apiKey:i.apiKey,models:[i.model]}}}) },
  { id:'cline', name:'Cline', paths:[p('.cline/config.json'),p('Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json')], format:'json', patch:(c,i)=>({...c, apiProvider:'openai-compatible', openAiBaseUrl:i.baseURL, openAiApiKey:i.apiKey, openAiModelId:i.model}) },
  { id:'continue', name:'Continue', paths:[p('.continue/config.yaml')], format:'yaml', patch:(_,i)=>`name: CCAPI\nversion: 1.0.0\nmodels:\n  - name: ${i.model}\n    provider: openai\n    model: ${i.model}\n    apiBase: ${i.baseURL}\n    apiKey: ${i.apiKey}\n` },
  { id:'chatbox', name:'Chatbox', paths:[p('Library/Application Support/Chatbox/config.json'),p('AppData/Roaming/Chatbox/config.json')], format:'json', patch:(c,i)=>({...c, providers:[...(c.providers||[]).filter(x=>x.name!=='CCAPI'),{name:'CCAPI',apiHost:i.baseURL,apiKey:i.apiKey,model:i.model}]}) },
  { id:'generic', name:'通用 OpenAI 兼容工具', paths:[], format:'env', patch:(_,i)=>`OPENAI_BASE_URL=${i.baseURL}\nOPENAI_API_KEY=${i.apiKey}\nOPENAI_MODEL=${i.model}\n` }
];
