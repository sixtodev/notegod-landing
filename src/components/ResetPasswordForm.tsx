import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PasswordInput from './PasswordInput';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setDone(true);
      await supabase.auth.signOut();
      setTimeout(() => { window.location.href = '/login'; }, 2500);
    } catch (err: any) {
      setError(err.message || 'Could not update password');
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#242426', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#2c2c2e', border: '1px solid #3c3c3f', borderRadius: '16px', padding: '40px' }}>
        <a
          href="/"
          aria-label="Back to home"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px', textDecoration: 'none' }}
        >
          <img src="/notegod.png" alt="NoteGod" width="36" height="36" />
          <span style={{ color: '#edff00', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.02em' }}>NoteGod</span>
        </a>
        <p style={{ textAlign: 'center', color: '#aeacab', fontSize: '14px', marginBottom: '32px' }}>Choose a new password</p>

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <p style={{ color: '#f3f0eb', fontSize: '15px', fontWeight: 500, marginBottom: '12px' }}>
              Password updated
            </p>
            <p style={{ color: '#aeacab', fontSize: '13px', lineHeight: 1.6 }}>
              Redirecting you to sign in…
            </p>
          </div>
        ) : !ready ? (
          <p style={{ color: '#aeacab', fontSize: '13px', lineHeight: 1.6, textAlign: 'center' }}>
            Verifying reset link…
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <PasswordInput
              required
              placeholder="New password (min 8 characters)"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
            />
            <PasswordInput
              required
              placeholder="Confirm new password"
              value={confirm}
              onChange={setConfirm}
              autoComplete="new-password"
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
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
