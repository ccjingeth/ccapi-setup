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
