import { LoginPage } from './components/LoginPage';
import { UserProfile } from './components/UserProfile';
import { useAuth } from './hooks/useAuth';

/**
 * 主应用组件
 * 根据用户登录状态显示不同的页面
 */
function App() {
  const { isAuthenticated, user, logout } = useAuth();

  // 如果用户已登录，显示用户资料页面
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <UserProfile user={user} onLogout={logout} />
      </div>
    );
  }

  // 否则显示登录页面
  return <LoginPage />;
}

export default App;
