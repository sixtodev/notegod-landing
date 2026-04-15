import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const APP_URL = import.meta.env.PUBLIC_APP_URL || 'https://app.notegod.io';

  async function handleOAuth(provider: 'google' | 'github') {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${APP_URL}/auth/callback` },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (err) throw err;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #47474a',
    background: '#333336',
    color: '#f3f0eb',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#242426', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: '#2c2c2e', border: '1px solid #3c3c3f', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#9993;</div>
          <h2 style={{ color: '#f3f0eb', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Check your email</h2>
          <p style={{ color: '#c9c7c4', fontSize: '14px', lineHeight: 1.6 }}>
            We sent a confirmation link to <strong style={{ color: '#edff00' }}>{email}</strong>. Click the link to activate your account.
          </p>
          <a href="/login" style={{ display: 'inline-block', marginTop: '24px', color: '#edff00', fontSize: '14px', textDecoration: 'none' }}>
            Back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#242426', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#2c2c2e', border: '1px solid #3c3c3f', borderRadius: '16px', padding: '40px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
          <img src="/notegod.png" alt="NoteGod" width="36" height="36" />
          <span style={{ color: '#edff00', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em' }}>NoteGod</span>
        </div>
        <p style={{ textAlign: 'center', color: '#aeacab', fontSize: '14px', marginBottom: '32px' }}>Create your account</p>

        {/* Social login */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <button
            type="button"
            data-provider="google"
            onClick={() => handleOAuth('google')}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#fff',
              color: '#1a1a1a',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily: 'inherit',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            data-provider="github"
            onClick={() => handleOAuth('github')}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#333',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily: 'inherit',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: '#3c3c3f' }} />
          <span style={{ color: '#aeacab', fontSize: '12px' }}>or register with email</span>
          <div style={{ flex: 1, height: '1px', background: '#3c3c3f' }} />
        </div>

        {/* Form */}
        <form id="register-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            id="register-name"
            type="text"
            required
            minLength={2}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            id="register-email"
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <div>
            <input
              id="register-password"
              type="password"
              required
              minLength={8}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <p style={{ color: '#aeacab', fontSize: '11px', marginTop: '6px' }}>Password must be at least 8 characters</p>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: '3px', accentColor: '#edff00' }}
            />
            <span style={{ color: '#c9c7c4', fontSize: '12px', lineHeight: 1.5 }}>
              I agree to the{' '}
              <a href="/terms" style={{ color: '#edff00', textDecoration: 'none' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" style={{ color: '#edff00', textDecoration: 'none' }}>Privacy Policy</a>
            </span>
          </label>

          {error && (
            <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #edff00, #b8d900)',
              color: '#000',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              fontFamily: 'inherit',
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#aeacab', fontSize: '13px', marginTop: '24px' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#edff00', textDecoration: 'none', fontWeight: 500 }}>Sign in</a>
        </p>
      </div>
    </div>
  );
}
