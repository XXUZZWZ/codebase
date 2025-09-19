import React from 'react';

/**
 * Bytebase Logo 组件
 * 可配置大小和颜色的 SVG 图标
 */
interface BytebaseLogoProps {
  className?: string;
  size?: number;
}

export const BytebaseLogo: React.FC<BytebaseLogoProps> = ({
  className = '',
  size = 40
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Bytebase 图标 - 简化版本 */}
      <div
        className="bg-gray-900 rounded-lg flex items-center justify-center mr-3"
        style={{ width: size, height: size }}
      >
        <div className="text-white font-bold text-lg">B</div>
      </div>

      {/* Bytebase 文字 */}
      <span className="text-2xl font-semibold text-gray-900">
        Bytebase
      </span>
    </div>
  );
};