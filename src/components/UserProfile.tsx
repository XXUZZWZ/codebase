import React from 'react';
import type { GitHubUser } from '../types/auth';

/**
 * 用户资料展示组件
 * 显示已登录用户的信息
 */
interface UserProfileProps {
  user: GitHubUser;
  onLogout: () => void;
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onLogout,
  className = ''
}) => {
  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* 用户头像和基本信息 */}
      <div className="text-center mb-6">
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-blue-100"
        />
        <h2 className="text-xl font-semibold text-gray-900">
          {user.name || user.login}
        </h2>
        <p className="text-gray-600">@{user.login}</p>
        <p className="text-gray-500 text-xs mt-1">ID: {user.id}</p>
        {user.email && (
          <p className="text-gray-600 text-sm mt-1">{user.email}</p>
        )}
      </div>

      {/* 用户简介 */}
      {user.bio && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">简介</h3>
          <p className="text-gray-700 text-sm">{user.bio}</p>
        </div>
      )}

      {/* 统计信息 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {user.public_repos}
          </div>
          <div className="text-xs text-gray-600">仓库</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {user.followers}
          </div>
          <div className="text-xs text-gray-600">关注者</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {user.following}
          </div>
          <div className="text-xs text-gray-600">关注中</div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          查看 GitHub 资料
        </a>
        <button
          onClick={onLogout}
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          退出登录
        </button>
      </div>

      {/* 注册时间 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          GitHub 注册时间：{new Date(user.created_at).toLocaleDateString('zh-CN')}
        </p>
      </div>
    </div>
  );
};