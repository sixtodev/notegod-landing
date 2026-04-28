import { useState } from 'react';

const plans = [
  {
    name: 'NoteGod Free',
    priceMonthly: 0,
    priceYearly: 0,
    badge: null,
    features: [
      'Unlimited notes',
      'Rich text editor',
      'AES-256 encryption',
      'Offline mode & sync',
      'Basic tags',
      'Pre-built shortcuts (Recent, Pinned, Untagged)',
      '3 projects',
      '3 public links',
      '50 MB storage',
      'Export to Markdown',
    ],
    cta: 'Get Started Free',
    highlight: false,
    perUser: false,
  },
  {
    name: 'NoteGod Pro',
    priceMonthly: 2.99,
    priceYearly: 24.00,
    badge: 'Most Popular',
    features: [
      'Everything in Free, plus:',
      'Unlimited projects',
      'Custom shortcuts (curated note lists)',
      'Advanced tags & colors',
      'Nested folders',
      'Custom templates',
      'Google Drive integration',
      'Web Clipper',
      'Custom branding',
      'Audio, video & office files',
      'Project sharing (up to 2 invited collaborators)',
      'Unlimited public links',
      '1 GB storage',
      'Priority support',
    ],
    cta: 'Start 7-Day Free Trial',
    highlight: true,
    perUser: false,
    studentPrice: '$1.49/mo with .edu email',
  },
  {
    name: 'NoteGod Team',
    priceMonthly: 3.99,
    priceYearly: 36.00,
    badge: 'Transparent Pricing',
    features: [
      'Everything in Pro, plus:',
      'Viewer role (read-only)',
      'Note comments',
      'Activity feed',
      'Password-protected links',
      'Admin panel',
      '1–15 team members per project',
      '5 GB shared storage',
      'Add seats anytime (prorated)',
    ],
    cta: 'Start 7-Day Free Trial',
    highlight: false,
    perUser: true,
    minUsers: 1,
    maxUsers: 15,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(true);
  const [teamUsers, setTeamUsers] = useState(3);

  return (
    <section id="pricing" style={{ padding: '96px 24px', maxWidth: '1152px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          style={{
            fontFamily: "'Morganite', Impact, sans-serif",
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: '#f3f0eb',
          }}
        >
          Simple, <span style={{ color: '#edff00' }}>transparent</span> pricing
        </h2>
        <p style={{ color: '#c9c7c4', fontSize: '18px' }}>No hidden fees. No surprises. Cancel anytime.</p>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
        <span
          onClick={() => setYearly(false)}
          style={{
            fontSize: '14px',
            cursor: 'pointer',
            color: !yearly ? '#f3f0eb' : '#aeacab',
            fontWeight: !yearly ? 600 : 400,
            transition: 'color 0.2s',
          }}
        >
          Monthly
        </span>
        <button
          type="button"
          onClick={() => setYearly((v) => !v)}
          style={{
            position: 'relative',
            width: '44px',
            height: '24px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            background: yearly ? '#edff00' : '#47474a',
            transition: 'background 0.2s',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '2px',
              left: yearly ? '22px' : '2px',
              width: '20px',
              height: '20px',
              borderRadius: '10px',
              background: '#000',
              transition: 'left 0.2s',
            }}
          />
        </button>
        <span
          onClick={() => setYearly(true)}
          style={{
            fontSize: '14px',
            cursor: 'pointer',
            color: yearly ? '#f3f0eb' : '#aeacab',
            fontWeight: yearly ? 600 : 400,
            transition: 'color 0.2s',
          }}
        >
          Yearly
        </span>
        {yearly && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#edff00',
              background: 'rgba(237,255,0,0.1)',
              padding: '2px 10px',
              borderRadius: '999px',
            }}
          >
            Save up to 33%
          </span>
        )}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {plans.map((plan) => {
          const price = yearly ? plan.priceYearly : plan.priceMonthly;
          const monthlyEquiv = yearly && price > 0 ? (plan.priceYearly / 12).toFixed(2) : null;
          const isTeam = plan.perUser;
          const teamPlan = plan as typeof plan & { minUsers: number; maxUsers: number };

          return (
            <div
              key={plan.name}
              style={{
                background: '#2c2c2e',
                border: plan.highlight ? '2px solid #edff00' : isTeam ? '1px solid rgba(176,143,216,0.3)' : '1px solid #3c3c3f',
                borderRadius: '16px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: plan.highlight ? '0 0 30px rgba(237,255,0,0.08)' : 'none',
              }}
            >
              {plan.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: isTeam ? '#b08fd8' : '#edff00',
                    color: isTeam ? '#fff' : '#000',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 16px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {plan.badge}
                </span>
              )}

              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f3f0eb', marginBottom: '4px' }}>{plan.name}</h3>

              <div style={{ marginBottom: '24px', marginTop: '8px' }}>
                {price === 0 ? (
                  <span style={{ fontSize: '36px', fontWeight: 700, color: '#f3f0eb' }}>Free</span>
                ) : (
                  <div>
                    <span style={{ fontSize: '36px', fontWeight: 700, color: '#f3f0eb' }}>
                      ${yearly ? monthlyEquiv : price.toFixed(2)}
                    </span>
                    <span style={{ fontSize: '14px', color: '#aeacab' }}>/mo{plan.perUser ? '/user' : ''}</span>
                    {yearly && (
                      <p style={{ fontSize: '12px', color: '#aeacab', marginTop: '4px' }}>
                        Billed ${price.toFixed(2)}/yr{plan.perUser ? ' per user' : ''}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {(plan as any).studentPrice && (
                <div
                  style={{
                    background: 'rgba(237,255,0,0.05)',
                    border: '1px solid rgba(237,255,0,0.2)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    color: '#c9c7c4',
                  }}
                >
                  <span style={{ color: '#edff00', fontWeight: 600 }}>Students:</span> {(plan as any).studentPrice}
                </div>
              )}

              {/* Team seat calculator */}
              {isTeam && (
                <div
                  style={{
                    background: 'rgba(176,143,216,0.06)',
                    border: '1px solid rgba(176,143,216,0.2)',
                    borderRadius: '10px',
                    padding: '16px',
                    marginBottom: '20px',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#c9c7c4', fontWeight: 600 }}>Calculate your cost</span>
                    <span style={{ fontSize: '13px', color: '#b08fd8', fontWeight: 700 }}>
                      {teamUsers} {teamUsers === 1 ? 'user' : 'users'}
                    </span>
                  </div>

                  {/* Slider */}
                  <div style={{ marginBottom: '14px' }}>
                    <input
                      type="range"
                      min={teamPlan.minUsers}
                      max={teamPlan.maxUsers}
                      value={teamUsers}
                      onChange={(e) => setTeamUsers(Number(e.target.value))}
                      style={{
                        width: '100%',
                        height: '6px',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        background: `linear-gradient(to right, #b08fd8 0%, #b08fd8 ${((teamUsers - teamPlan.minUsers) / (teamPlan.maxUsers - teamPlan.minUsers)) * 100}%, #3c3c3f ${((teamUsers - teamPlan.minUsers) / (teamPlan.maxUsers - teamPlan.minUsers)) * 100}%, #3c3c3f 100%)`,
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#aeacab' }}>1 user</span>
                      <span style={{ fontSize: '10px', color: '#aeacab' }}>15 users</span>
                    </div>
                  </div>

                  {/* Breakdown — shows the math clearly */}
                  <div
                    style={{
                      padding: '12px',
                      background: 'rgba(176,143,216,0.08)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {/* Formula line */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#aeacab' }}>
                        {teamUsers} {teamUsers === 1 ? 'user' : 'users'} × ${yearly ? (plan.priceYearly / 12).toFixed(2) : plan.priceMonthly.toFixed(2)}/mo
                      </span>
                      <span style={{ fontSize: '11px', color: '#b08fd8', fontWeight: 600 }}>=</span>
                    </div>

                    {/* Monthly total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#c9c7c4', fontWeight: 500 }}>
                        {yearly ? 'Per month' : 'You pay monthly'}
                      </span>
                      <span style={{ fontSize: '20px', fontWeight: 700, color: '#f3f0eb' }}>
                        ${yearly
                          ? ((plan.priceYearly / 12) * teamUsers).toFixed(2)
                          : (plan.priceMonthly * teamUsers).toFixed(2)
                        }<span style={{ fontSize: '13px', fontWeight: 400, color: '#aeacab' }}>/mo</span>
                      </span>
                    </div>

                    {/* Annual total */}
                    {yearly && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px solid rgba(176,143,216,0.15)' }}>
                        <span style={{ fontSize: '12px', color: '#aeacab' }}>Billed annually</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#b08fd8' }}>
                          ${(plan.priceYearly * teamUsers).toFixed(2)}/yr
                        </span>
                      </div>
                    )}

                    {/* Save hint on monthly */}
                    {!yearly && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '6px',
                          borderTop: '1px solid rgba(176,143,216,0.15)',
                        }}
                      >
                        <span style={{ fontSize: '11px', color: '#aeacab' }}>
                          Yearly: ${((plan.priceYearly / 12) * teamUsers).toFixed(2)}/mo
                        </span>
                        <span
                          style={{ fontSize: '11px', color: '#edff00', cursor: 'pointer', fontWeight: 600 }}
                          onClick={() => setYearly(true)}
                        >
                          Save up to 33% →
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Transparency note */}
                  <p style={{ fontSize: '11px', color: '#aeacab', marginTop: '10px', lineHeight: 1.5 }}>
                    Need more seats later? Add them anytime — you only pay the prorated amount for the remaining billing period. No hidden charges.
                  </p>
                </div>
              )}

              <a
                href="/register"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  marginBottom: '24px',
                  transition: 'all 0.2s',
                  ...(plan.highlight
                    ? { background: 'linear-gradient(135deg, #edff00, #b8d900)', color: '#000' }
                    : isTeam
                      ? { background: '#b08fd8', color: '#fff' }
                      : price === 0
                        ? { background: 'transparent', border: '1px solid #47474a', color: '#f3f0eb' }
                        : { background: '#47474a', color: '#f3f0eb' }),
                }}
              >
                {plan.cta}
              </a>

              {/* Trial info for paid plans */}
              {price > 0 && (
                <div style={{ textAlign: 'center', marginTop: '-16px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '12px', color: '#81b29a', fontWeight: 500, marginBottom: '2px' }}>
                    No credit card required
                  </p>
                  <p style={{ fontSize: '11px', color: '#aeacab', lineHeight: 1.4 }}>
                    Try all features free for 7 days. After the trial, you'll return to the Free plan unless you subscribe. No charges, ever, without your consent.
                  </p>
                </div>
              )}

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px' }}>
                    <span style={{ color: '#81b29a', flexShrink: 0, marginTop: '1px' }}>&#10003;</span>
                    <span style={{ color: feat.includes('Everything') ? '#c9c7c4' : '#f3f0eb' }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Slider thumb styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #b08fd8;
          cursor: pointer;
          border: 2px solid #2c2c2e;
          box-shadow: 0 0 6px rgba(176,143,216,0.4);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #b08fd8;
          cursor: pointer;
          border: 2px solid #2c2c2e;
          box-shadow: 0 0 6px rgba(176,143,216,0.4);
        }
      `}</style>
    </section>
  );
}
