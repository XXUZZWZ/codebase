import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// GitHub OAuth 配置
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * 健康检查接口
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Bytebase Auth Server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * GitHub OAuth 回调处理接口
 * 接收 GitHub 重定向回来的授权码，换取 access_token，然后获取用户信息
 */
app.get('/api/auth/github/callback', async (req, res) => {
  const { code, state } = req.query;

  console.log('收到 GitHub OAuth 回调:', { code: code ? '***' : 'missing', state });

  if (!code) {
    console.error('缺少授权码');
    return res.redirect(`${FRONTEND_URL}?error=missing_code`);
  }

  try {
    // 1. 使用授权码换取 access_token
    console.log('正在获取 access_token...');
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const { access_token, token_type, scope } = tokenResponse.data;

    if (!access_token) {
      console.error('获取 access_token 失败:', tokenResponse.data);
      return res.redirect(`${FRONTEND_URL}?error=token_exchange_failed`);
    }

    console.log('成功获取 access_token，作用域:', scope);

    // 2. 使用 access_token 获取用户信息
    console.log('正在获取用户信息...');
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `${token_type} ${access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const userData = userResponse.data;
    console.log('成功获取用户信息:', userData.login);

    // 3. 获取用户邮箱（如果有权限）
    let userEmail = userData.email;
    if (!userEmail) {
      try {
        const emailResponse = await axios.get('https://api.github.com/user/emails', {
          headers: {
            'Authorization': `${token_type} ${access_token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        const primaryEmail = emailResponse.data.find(email => email.primary);
        userEmail = primaryEmail ? primaryEmail.email : null;
      } catch (emailError) {
        console.warn('无法获取用户邮箱:', emailError.message);
      }
    }

    // 4. 构造用户信息对象
    const userInfo = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      email: userEmail,
      avatar_url: userData.avatar_url,
      html_url: userData.html_url,
      bio: userData.bio,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
    };

    console.log('准备重定向到前端，用户:', userInfo.login);

    // 5. 将用户信息编码并重定向回前端
    const userInfoEncoded = encodeURIComponent(JSON.stringify(userInfo));
    const redirectUrl = `${FRONTEND_URL}?auth_success=true&user=${userInfoEncoded}`;

    res.redirect(redirectUrl);

  } catch (error) {
    console.error('GitHub OAuth 处理失败:', error.message);

    if (error.response) {
      console.error('GitHub API 错误响应:', error.response.status, error.response.data);
    }

    res.redirect(`${FRONTEND_URL}?error=oauth_failed&message=${encodeURIComponent(error.message)}`);
  }
});

/**
 * 获取用户信息接口（备用）
 * 可以用于前端直接调用获取用户信息
 */
app.post('/api/auth/github/user', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    // 获取 access_token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const { access_token, token_type } = tokenResponse.data;

    if (!access_token) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    // 获取用户信息
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `${token_type} ${access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const userData = userResponse.data;

    // 获取用户邮箱
    let userEmail = userData.email;
    if (!userEmail) {
      try {
        const emailResponse = await axios.get('https://api.github.com/user/emails', {
          headers: {
            'Authorization': `${token_type} ${access_token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        const primaryEmail = emailResponse.data.find(email => email.primary);
        userEmail = primaryEmail ? primaryEmail.email : null;
      } catch (emailError) {
        console.warn('无法获取用户邮箱:', emailError.message);
      }
    }

    const userInfo = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      email: userEmail,
      avatar_url: userData.avatar_url,
      html_url: userData.html_url,
      bio: userData.bio,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
    };

    res.json({ success: true, user: userInfo });

  } catch (error) {
    console.error('获取用户信息失败:', error.message);
    res.status(500).json({
      error: 'Failed to get user info',
      message: error.message
    });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Bytebase Auth Server 正在运行在端口 ${PORT}`);
  console.log(`📍 健康检查: http://localhost:${PORT}/health`);
  console.log(`🔗 GitHub 回调: http://localhost:${PORT}/api/auth/github/callback`);
  console.log(`🌐 前端地址: ${FRONTEND_URL}`);

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    console.warn('⚠️  警告: 缺少 GitHub OAuth 配置，请检查 .env 文件');
  }
});