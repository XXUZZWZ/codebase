# Bytebase 登录系统 - 完整指南

## 🚀 完整的 GitHub OAuth 集成

现在我们有了一个完整的 GitHub OAuth 认证系统，包含：

### 📁 项目结构
```
codebase/
├── src/                    # 前端代码
│   ├── components/         # React 组件
│   ├── hooks/             # 自定义 Hooks
│   ├── types/             # TypeScript 类型
│   └── utils/             # 工具函数
├── server/                # 后端服务器
│   ├── server.js          # Express 服务器
│   ├── package.json       # 后端依赖
│   └── .env              # 后端环境变量
└── .env                  # 前端环境变量
```

## ⚙️ 配置步骤

### 1. GitHub OAuth App 配置

在你的 GitHub OAuth App 中设置：
- **Application name**: codebase
- **Homepage URL**: `http://localhost:5173`
- **Authorization callback URL**: `http://localhost:3000/api/auth/github/callback`

### 2. 环境变量配置

#### 前端 (`.env`)
```bash
VITE_GITHUB_CLIENT_ID=你的_github_client_id
VITE_BACKEND_URL=http://localhost:3000
```

#### 后端 (`server/.env`)
```bash
GITHUB_CLIENT_ID=你的_github_client_id
GITHUB_CLIENT_SECRET=你的_github_client_secret
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## 🏃‍♂️ 运行项目

### 方法一：分别启动
```bash
# 终端 1 - 启动后端服务器
cd server
npm run dev

# 终端 2 - 启动前端开发服务器
npm run dev
```

### 方法二：使用启动脚本（推荐）
```bash
# Windows
npm run start:all

# macOS/Linux
npm run start:all:unix
```

## 🔄 OAuth 流程

1. **用户点击登录** → 前端重定向到 GitHub 授权页面
2. **用户授权** → GitHub 重定向到后端回调接口
3. **后端处理** → 使用授权码换取 access_token，获取真实用户信息
4. **返回前端** → 后端将用户信息通过 URL 参数传递给前端
5. **前端处理** → 解析用户信息，更新状态，保存到本地存储

## 📱 功能特性

### ✅ 已实现
- 🔐 真实的 GitHub OAuth 认证
- 👤 获取真实的用户头像、ID、用户名等信息
- 💾 本地状态持久化
- 📱 响应式设计
- ⚡ 加载状态和错误处理
- 🎨 现代化 UI 设计

### 🎯 用户信息展示
- 用户头像（真实 GitHub 头像）
- 用户 ID
- 用户名和显示名
- 邮箱地址
- 个人简介
- 仓库数量、关注者、关注中数量
- GitHub 注册时间

## 🚨 重要提醒

1. **GitHub Client Secret**: 必须保密，只能在后端使用
2. **环境变量**: 确保设置了正确的 GitHub Client ID 和 Secret
3. **CORS**: 后端已配置 CORS 允许前端访问
4. **URL 清理**: 认证完成后会自动清理 URL 中的敏感参数

## 🔧 调试技巧

- 查看浏览器控制台的日志输出
- 查看后端服务器的控制台日志
- 确认 GitHub OAuth App 的回调 URL 配置正确
- 确认环境变量设置正确

现在你可以获得真实的 GitHub 用户数据了！🎉