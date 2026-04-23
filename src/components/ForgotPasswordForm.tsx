import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Could not send reset email');
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

  return (
    <div style={{ minHeight: '100vh', background: '#242426', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#2c2c2e', border: '1px solid #3c3c3f', borderRadius: '16px', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
          <img src="/notegod.png" alt="NoteGod" width="36" height="36" />
          <span style={{ color: '#edff00', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em' }}>NoteGod</span>
        </div>
        <p style={{ textAlign: 'center', color: '#aeacab', fontSize: '14px', marginBottom: '32px' }}>Reset your password</p>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
            <p style={{ color: '#f3f0eb', fontSize: '15px', fontWeight: 500, marginBottom: '12px' }}>
              Check your inbox
            </p>
            <p style={{ color: '#aeacab', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              If an account exists for <strong style={{ color: '#f3f0eb' }}>{email}</strong>, we&apos;ve sent a link to reset your password. The link expires in 1 hour.
            </p>
            <a
              href="/login"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'transparent',
                border: '1px solid #47474a',
                color: '#f3f0eb',
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              Back to sign in
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: '#aeacab', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
              Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
            </p>
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

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
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', color: '#aeacab', fontSize: '13px', marginTop: '24px' }}>
          Remembered it?{' '}
          <a href="/login" style={{ color: '#edff00', textDecoration: 'none', fontWeight: 500 }}>Sign in</a>
        </p>
      </div>
    </div>
  );
}
