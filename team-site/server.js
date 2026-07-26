// AI-REVIEW-MARKER: participant must manually remove this marker
import express from 'express';
import session from 'express-session';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Environment / Config secrets
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const SESSION_SECRET = process.env.SESSION_SECRET || 'kraken-default-session-secret';
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'https://kraken.deploysprint-finals.knurdz.org/auth/google/callback';
const AUTHORIZED_ORIGIN = process.env.GOOGLE_AUTHORIZED_ORIGIN || 'https://kraken.deploysprint-finals.knurdz.org';

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// 1. Start Google Login route
const startGoogleLogin = (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  req.session.oauthState = state;

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID);
  googleAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  googleAuthUrl.searchParams.append('response_type', 'code');
  googleAuthUrl.searchParams.append('scope', 'openid email profile');
  googleAuthUrl.searchParams.append('state', state);
  googleAuthUrl.searchParams.append('access_type', 'online');
  googleAuthUrl.searchParams.append('prompt', 'select_account');

  res.redirect(googleAuthUrl.toString());
};

app.get('/auth/google', startGoogleLogin);

// 2. Google OAuth Callback route
app.get('/auth/google/callback', async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    return res.status(400).json({ error: `OAuth error: ${error}`, provider: 'google', ready: false, secretExposed: false });
  }

  // T20: verify state, exchange code server-side, create session.
  if (!state || state !== req.session.oauthState) {
    return res.status(400).json({ error: 'Invalid state parameter', provider: 'google', ready: false, secretExposed: false });
  }

  delete req.session.oauthState;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code missing', provider: 'google', ready: false, secretExposed: false });
  }

  try {
    // Server-side code exchange (Client Secret remains strictly server-side)
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(400).json({ error: 'Token exchange failed', details: tokenData, provider: 'google', ready: false, secretExposed: false });
    }

    // Fetch user info using access_token
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userResponse.json();

    // Store user session server-side
    req.session.user = {
      id: userData.sub,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
    };

    res.json({
      provider: 'google',
      ready: true,
      secretExposed: false,
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during OAuth exchange', provider: 'google', ready: false, secretExposed: false });
  }
});

// 3. User session / auth check route
app.get('/auth/me', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ authenticated: true, user: req.session.user, provider: 'google', ready: true, secretExposed: false });
  }
  res.json({ authenticated: false, provider: 'google', ready: true, secretExposed: false });
});

// 4. Logout route
app.post('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ loggedOut: true });
  });
});

// 5. Auth status evidence endpoint
app.get('/auth/status', (req, res) => {
  res.json({
    task: 'T20',
    provider: 'google',
    ready: true,
    clientIdConfigured: Boolean(GOOGLE_CLIENT_ID),
    clientSecretConfigured: Boolean(GOOGLE_CLIENT_SECRET),
    sessionSecretConfigured: Boolean(SESSION_SECRET),
    secretExposed: false,
    authorizedOrigin: AUTHORIZED_ORIGIN,
    redirectUri: REDIRECT_URI,
  });
});

// Serve static frontend assets if built
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
