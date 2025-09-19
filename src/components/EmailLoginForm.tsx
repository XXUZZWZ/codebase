import React, { useState } from 'react';

/**
 * 邮箱登录表单组件
 * 包含邮箱输入和继续按钮
 */
interface EmailLoginFormProps {
  onSubmit?: (email: string) => void;
  className?: string;
}

export const EmailLoginForm: React.FC<EmailLoginFormProps> = ({
  onSubmit,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  // 验证邮箱格式
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 处理邮箱输入变化
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        {/* 邮箱输入框 */}
        <div>
          <label htmlFor="email" className="sr-only">
            电子邮件地址
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="电子邮件地址 *"
            required
            className={`
              w-full px-4 py-3 border rounded-lg
              placeholder-gray-500 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-colors duration-200
              ${!isValid && email ? 'border-red-300' : 'border-gray-300'}
            `}
          />
          {!isValid && email && (
            <p className="mt-1 text-sm text-red-600">
              请输入有效的邮箱地址
            </p>
          )}
        </div>

        {/* 继续按钮 */}
        <button
          type="submit"
          disabled={!isValid}
          className={`
            w-full py-3 px-4 rounded-lg font-medium
            transition-colors duration-200
            ${isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          继续
        </button>
      </div>
    </form>
  );
};