# Bytebase 登录页面

## 项目概述

这是一个基于 React + TypeScript + Vite 的 Bytebase 登录页面实现，包含以下功能：

## 🚀 功能特性

### ✅ 已实现功能

1. **完整的 UI 设计**
   - 复刻了原版 Bytebase 登录页面的设计
   - 响应式布局，支持桌面端和移动端
   - 使用 Tailwind CSS 实现现代化样式

2. **GitHub OAuth 登录**
   - 完整的 GitHub 第三方登录流程
   - 用户信息获取和展示
   - 本地状态管理和持久化

3. **多种登录方式**
   - GitHub 登录（已实现）
   - Google 登录（UI 已实现，等待集成）
   - Microsoft 登录（UI 已实现，等待集成）
   - 邮箱登录（UI 已实现，等待后端集成）

4. **用户体验优化**
   - 加载状态提示
   - 错误处理和提示
   - 响应式设计
   - 清晰的注释和代码结构

## 🏗️ 项目结构

```
src/
├── components/          # React 组件
│   ├── BytebaseLogo.tsx        # Bytebase Logo 组件
│   ├── SocialLoginButton.tsx   # 社交登录按钮
│   ├── EmailLoginForm.tsx      # 邮箱登录表单
│   ├── UserProfile.tsx         # 用户资料展示
│   └── LoginPage.tsx           # 主登录页面
├── hooks/               # 自定义 Hooks
│   └── useAuth.ts              # 认证状态管理
├── types/               # TypeScript 类型定义
│   └── auth.ts                 # 认证相关类型
├── utils/               # 工具函数
│   └── github-auth.ts          # GitHub OAuth 工具
└── App.tsx              # 主应用组件
```

## 🔧 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 预览构建结果
npm run preview
```

## ⚙️ 配置说明

### GitHub OAuth 配置

1. 在 `.env` 文件中设置 GitHub Client ID：
   ```bash
   VITE_GITHUB_CLIENT_ID=your_github_client_id_here
   ```

2. 在 GitHub 开发者设置中创建 OAuth App：
   - Homepage URL: `http://localhost:5173` (开发环境)
   - Authorization callback URL: `http://localhost:5173/auth/callback`

### 环境变量

- `VITE_GITHUB_CLIENT_ID`: GitHub OAuth 应用的 Client ID
- `VITE_APP_NAME`: 应用名称
- `VITE_APP_VERSION`: 应用版本

## 🎨 设计特点

### 响应式设计
- 桌面端：左右分栏布局，左侧展示 Logo 和标题，右侧为登录表单
- 移动端：单栏布局，优化触摸操作体验

### 颜色方案
- 主色调：蓝色系 (`#3b82f6`, `#2563eb`)
- 背景：浅灰色 (`#f9fafb`)
- 文字：深灰色系

### 交互效果
- 按钮悬停效果
- 输入框焦点状态
- 加载动画
- 错误提示

## 🔐 安全考虑

1. **OAuth 流程**：在生产环境中，授权码交换应在后端进行
2. **状态参数**：使用随机状态参数防止 CSRF 攻击
3. **本地存储**：用户信息存储在 localStorage 中，生产环境建议使用更安全的方式

## 📱 移动端适配

- 使用 Tailwind CSS 的响应式工具类
- 优化触摸操作体验
- 适配不同屏幕尺寸

## 🔄 状态管理

使用 React Hooks 进行状态管理：
- `useAuth`: 认证状态管理
- `useState`: 本地组件状态
- `useEffect`: 副作用处理

## 🎯 未来优化方向

1. **后端集成**：实现完整的 OAuth 后端服务
2. **其他登录方式**：完成 Google 和 Microsoft 登录集成
3. **安全增强**：添加更多安全措施
4. **性能优化**：代码分割和懒加载
5. **测试覆盖**：添加单元测试和集成测试

## 📝 注意事项

- 当前 GitHub 登录使用模拟数据进行演示
- 生产环境需要配置真实的 OAuth 后端服务
- 建议使用 HTTPS 协议部署应用