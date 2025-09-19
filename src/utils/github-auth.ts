import type { GitHubUser } from '../types/auth';

// GitHub OAuth 配置
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'your_github_client_id';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const REDIRECT_URI = `${BACKEND_URL}/api/auth/github/callback`;

/**
 * GitHub OAuth 工具类
 * 处理 GitHub 第三方登录相关的操作
 */
export class GitHubAuth {
  /**
   * 生成 GitHub OAuth 授权 URL
   * @returns GitHub 授权页面 URL
   */
  static getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'user:email read:user',
      state: Math.random().toString(36).substring(7), // 简单的状态参数
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  /**
   * 发起 GitHub OAuth 登录
   * 重定向到 GitHub 授权页面
   */
  static login(): void {
    const authUrl = this.getAuthUrl();
    window.location.href = authUrl;
  }

  /**
   * 从 URL 参数中获取认证结果
   * @param url 当前页面 URL
   * @returns 认证结果对象
   */
  static getAuthResult(url: string = window.location.href): {
    success: boolean;
    user?: GitHubUser;
    error?: string;
    code?: string;
  } {
    const urlParams = new URLSearchParams(url.split('?')[1]);

    // 检查是否是认证成功的回调
    if (urlParams.get('auth_success') === 'true') {
      const userDataStr = urlParams.get('user');
      if (userDataStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userDataStr));
          return { success: true, user };
        } catch (error) {
          console.error('解析用户数据失败:', error);
          return { success: false, error: 'Failed to parse user data' };
        }
      }
    }

    // 检查是否有错误
    const error = urlParams.get('error');
    if (error) {
      const message = urlParams.get('message');
      return {
        success: false,
        error: message ? decodeURIComponent(message) : error
      };
    }

    // 检查是否有授权码（备用方案）
    const code = urlParams.get('code');
    if (code) {
      return { success: false, code };
    }

    return { success: false };
  }

  /**
   * 使用授权码获取用户信息（备用方案）
   * @param code 授权码
   * @returns 用户信息
   */
  static async getUserInfoByCode(code: string): Promise<GitHubUser> {
    const response = await fetch(`${BACKEND_URL}/api/auth/github/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user info');
    }

    const data = await response.json();
    return data.user;
  }

  /**
   * 清理 URL 中的认证参数
   */
  static cleanUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('auth_success');
    url.searchParams.delete('user');
    url.searchParams.delete('error');
    url.searchParams.delete('message');
    url.searchParams.delete('code');
    url.searchParams.delete('state');

    window.history.replaceState({}, document.title, url.toString());
  }
}