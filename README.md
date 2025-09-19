# Bytebase 登录页面

一个基于 React + TypeScript + Vite 的 Bytebase 登录页面实现，包含完整的 GitHub OAuth 认证功能。

## 🚀 功能特性

- 🔐 **真实的 GitHub OAuth 认证**
- 👤 **获取真实的用户头像、ID、用户名等信息**
- 💾 **本地状态持久化**
- 📱 **响应式设计**
- ⚡ **加载状态和错误处理**
- 🎨 **现代化 UI 设计**

## 🏗️ 技术栈

### 前端
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Hooks

### 后端
- Node.js
- Express
- GitHub OAuth API
- Axios

## 📁 项目结构

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

## ⚙️ 配置和运行

### 1. GitHub OAuth App 配置

在 GitHub 创建 OAuth App，设置：
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

### 3. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
```

### 4. 启动服务

```bash
# 方法1：分别启动
# 终端1 - 后端
cd server && npm run dev

# 终端2 - 前端
npm run dev

# 方法2：使用脚本（Windows）
npm run start:all
```

## 🔄 OAuth 流程

1. 用户点击登录 → 重定向到 GitHub 授权页面
2. 用户授权 → GitHub 重定向到后端回调接口
3. 后端处理 → 获取 access_token 和用户信息
4. 返回前端 → 显示用户信息

## 🎯 功能展示

### 登录页面
- 复刻 Bytebase 官方登录页面设计
- 支持多种登录方式（GitHub 已实现）
- 响应式设计，支持移动端

### 用户信息展示
- 真实的 GitHub 头像
- 用户 ID 和用户名
- 邮箱地址
- 个人简介
- GitHub 统计数据（仓库、关注者等）

## 📱 响应式设计

- 桌面端：左右分栏布局
- 移动端：单栏布局，优化触摸体验
- 使用 Tailwind CSS 响应式工具类

## 🔐 安全特性

- Client Secret 仅在后端使用
- 状态参数防止 CSRF 攻击
- 安全的 OAuth 流程实现
- 自动清理敏感 URL 参数

## 📄 许可证

MIT License