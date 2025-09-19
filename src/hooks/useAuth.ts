import { useState, useEffect } from 'react';
import type { AuthState, GitHubUser } from '../types/auth';
import { GitHubAuth } from '../utils/github-auth';

/**
 * 认证状态管理 Hook
 * 处理用户登录状态、GitHub OAuth 流程等
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  });

  // 检查本地存储中的用户信息
  useEffect(() => {
    const savedUser = localStorage.getItem('github_user');
    if (savedUser) {
      try {
        const user: GitHubUser = JSON.parse(savedUser);
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          user,
        }));
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('github_user');
      }
    }
  }, []);

  // 检查 URL 中的认证结果
  useEffect(() => {
    const authResult = GitHubAuth.getAuthResult();

    if (authResult.success && authResult.user) {
      // 认证成功，处理用户信息
      handleAuthSuccess(authResult.user);
      GitHubAuth.cleanUrl();
    } else if (authResult.error) {
      // 认证失败，显示错误
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: authResult.error || 'Authentication failed',
      }));
      GitHubAuth.cleanUrl();
    } else if (authResult.code && !authState.isAuthenticated) {
      // 有授权码但没有用户信息，使用备用方案
      handleOAuthCallback(authResult.code);
      GitHubAuth.cleanUrl();
    }
  }, [authState.isAuthenticated]);

  /**
   * 处理认证成功
   * @param user 用户信息
   */
  const handleAuthSuccess = (user: GitHubUser) => {
    console.log('认证成功，用户:', user.login);

    // 保存到本地存储
    localStorage.setItem('github_user', JSON.stringify(user));

    // 更新状态
    setAuthState({
      isAuthenticated: true,
      user,
      isLoading: false,
      error: null,
    });
  };

  /**
   * 处理 GitHub OAuth 回调（备用方案）
   * @param code 授权码
   */
  const handleOAuthCallback = async (code: string) => {
    console.log('使用授权码获取用户信息...');
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await GitHubAuth.getUserInfoByCode(code);
      handleAuthSuccess(user);
    } catch (error) {
      console.error('获取用户信息失败:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      }));
    }
  };

  /**
   * 发起 GitHub 登录
   */
  const loginWithGitHub = () => {
    console.log('发起 GitHub 登录...');
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    GitHubAuth.login();
  };

  /**
   * 登出用户
   */
  const logout = () => {
    console.log('用户登出');
    localStorage.removeItem('github_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  };

  /**
   * 清除错误信息
   */
  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    loginWithGitHub,
    logout,
    clearError,
  };
};