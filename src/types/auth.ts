// GitHub 用户信息类型定义
export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

// 认证状态类型定义
export interface AuthState {
  isAuthenticated: boolean;
  user: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
}

// OAuth 配置类型定义
export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}