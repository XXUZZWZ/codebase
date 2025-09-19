import React from 'react';
import { BytebaseLogo } from './BytebaseLogo';
import { SocialLoginButton } from './SocialLoginButton';
import { EmailLoginForm } from './EmailLoginForm';
import { useAuth } from '../hooks/useAuth';

/**
 * Bytebase 登录页面组件
 * 包含社交登录和邮箱登录功能
 */
export const LoginPage: React.FC = () => {
  const { loginWithGitHub, isLoading, error, clearError } = useAuth();

  // 处理邮箱登录（演示用）
  const handleEmailLogin = (email: string) => {
    alert(`邮箱登录功能待实现: ${email}`);
  };

  // 处理 Google 登录（演示用）
  const handleGoogleLogin = () => {
    alert('Google 登录功能待实现');
  };

  // 处理 Microsoft 登录（演示用）
  const handleMicrosoftLogin = () => {
    alert('Microsoft 登录功能待实现');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 左侧区域 - 仅在桌面端显示 */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center">
        <div className="max-w-md text-center">
          <BytebaseLogo className="justify-center mb-8" size={60} />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            欢迎使用 Bytebase
          </h1>
          <p className="text-gray-600 text-lg">
            现代化的数据库开发工具平台
          </p>
        </div>
      </div>

      {/* 右侧登录区域 */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* 移动端 Logo */}
          <div className="lg:hidden text-center">
            <BytebaseLogo className="justify-center mb-4" size={50} />
          </div>

          {/* 页面标题 */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 lg:hidden">
              欢迎
            </h2>
            <p className="mt-2 text-gray-600">
              登录 Bytebase 以继续使用 Bytebase Hub。
            </p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={clearError}
                    className="text-red-400 hover:text-red-600"
                  >
                    <span className="sr-only">关闭</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 加载状态 */}
          {isLoading && (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 text-sm text-blue-600">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在登录...
              </div>
            </div>
          )}

          {/* 社交登录按钮 */}
          <div className="space-y-3">
            <SocialLoginButton
              provider="google"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            />
            <SocialLoginButton
              provider="github"
              onClick={loginWithGitHub}
              disabled={isLoading}
            />
            <SocialLoginButton
              provider="microsoft"
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
            />
          </div>

          {/* 分隔线 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">或</span>
            </div>
          </div>

          {/* 邮箱登录表单 */}
          <EmailLoginForm onSubmit={handleEmailLogin} />

          {/* 注册链接 */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              没有账户？{' '}
              <button className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                注册
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};