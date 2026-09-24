# CCAPI Setup

面向小白的 AI 工具一键配置桌面客户端，默认 API 地址：`https://api-direct.ccapi.us/v1`。

## 当前能力
- 本地系统密钥存储保存 API Key
- 连接测试、模型选择、JSON/.env 配置导出
- MiniMax-H3/qy 预置 768p、4–15 秒提示
- OpenAI 兼容客户端、Cursor、Claude Code、Codex、Cherry Studio、LobeChat、OpenClaw 配置入口
- 不上传密钥，不把密钥写入日志

## 本地运行
```bash
npm install
npm start
```

## 打包
```bash
npm run dist
```


## 未签名版本首次打开方法

本 Release 使用 GitHub 提供安装包，但当前没有 Apple Developer ID、Windows 代码签名或 macOS 公证。首次启动出现系统提示属于正常现象。请只从本仓库的 Releases 页面下载，并先用 `SHA256SUMS.txt` 校验文件。

### macOS（ZIP，Apple Silicon）

1. 在 [Releases](https://github.com/ccjingeth/ccapi-setup/releases) 下载 `CCAPI Setup-0.2.0-arm64-mac.zip`。
2. 双击 ZIP 解压。
3. 将 `CCAPI Setup.app` 拖入“应用程序”。
4. 第一次打开时，如果提示“无法验证开发者”，不要直接双击反复尝试：在 Finder 中右键（或按住 Control 点击）`CCAPI Setup.app`，选择“打开”，然后在确认窗口再次选择“打开”。
5. 如果仍被拦截：打开“系统设置 → 隐私与安全性”，在安全性提示下点击“仍要打开”，输入 Mac 登录密码后再启动。
6. 也可以在终端执行下面的命令移除当前应用的下载隔离标记，然后再打开：

```bash
xattr -dr com.apple.quarantine "/Applications/CCAPI Setup.app"
open "/Applications/CCAPI Setup.app"
```

仅对你从本仓库 Release 下载、并完成 SHA256 校验的文件执行上述命令。

### Windows（ARM64）

1. 下载 `CCAPI Setup Setup 0.2.0.exe`，双击运行安装。
2. 如果出现“Windows 已保护你的电脑”，点击“更多信息”。
3. 确认发布者和文件来源后，点击“仍要运行”。
4. 安装器没有自动运行时，右键安装包 →“属性”，勾选“解除锁定”→“应用”，再重新打开。
5. 如果你的电脑是 Intel/AMD x64，而不是 Windows ARM64，请下载 ZIP 后解压尝试运行；后续版本会提供 x64 安装包。

### Linux（AppImage）

```bash
chmod +x "CCAPI Setup-0.2.0-arm64.AppImage"
./"CCAPI Setup-0.2.0-arm64.AppImage"
```

如果桌面环境阻止运行，请右键文件 →“属性”→“允许作为程序执行”。

### 安全提醒

- 未签名提示不代表程序损坏，但必须从本仓库 Release 下载并校验哈希。
- 不要下载第三方重新打包的安装包。
- 不要把 API Key 发给任何人；客户端默认使用系统密钥存储。
- 视频测试可能产生费用，执行前请确认当前模型价格。
