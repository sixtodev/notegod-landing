import { useState } from 'react';

const faqs = [
  {
    q: "Is there a free plan?",
    a: "Yes, NoteGod Free includes unlimited notes, rich text editor, encryption, offline mode, and basic tags. No credit card required.",
  },
  {
    q: "How does the free trial work?",
    a: "Every paid plan includes a 7-day free trial with no credit card required. You get full access to all features during the trial. When it ends, you simply go back to the Free plan — no charges, no surprises. You only pay if you choose to subscribe.",
  },
  {
    q: "How does team pricing work?",
    a: "Team is $4.99/user/month (or $3.33/user/month billed yearly). You choose how many seats you need — from 1 to 15. Need to add someone later? You only pay the prorated amount for the days left in your billing cycle. We always show you the exact amount before you confirm. No hidden fees.",
  },
  {
    q: "What happens when my trial ends?",
    a: "Your account goes back to the Free plan. All your notes and data stay safe — nothing is deleted. Premium features are simply locked until you subscribe. You can re-subscribe anytime and everything unlocks again.",
  },
  {
    q: "How does Email to Note work?",
    a: "Each Pro/Team user gets a unique email address. Forward any email to it and it becomes a note automatically with the subject as title and body as content.",
  },
  {
    q: "What is the Web Clipper?",
    a: "A Chrome extension that lets you save any web page as a note. Choose between full page, selected text, or simplified (article only) modes.",
  },
  {
    q: "Is my data encrypted?",
    a: "Yes, all note content is encrypted with AES-256-GCM before storage. We use zero-knowledge architecture, meaning we cannot read your notes.",
  },
  {
    q: "Can I use NoteGod offline?",
    a: "Yes, NoteGod is a PWA that works fully offline. Changes sync automatically when you reconnect.",
  },
  {
    q: "How does team collaboration work?",
    a: "Create a project, invite members as editors or viewers. Editors can create and modify notes, viewers have read-only access. Add comments and track changes with the activity feed.",
  },
  {
    q: "What's the student discount?",
    a: "Students with a valid .edu email get NoteGod Pro for $1.49/mo instead of $2.99/mo. The 7-day free trial applies too.",
  },
  {
    q: "Can I self-host NoteGod?",
    a: "Currently NoteGod is cloud-only, hosted on secure infrastructure. Self-hosting may be available in the future.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: '96px 24px', maxWidth: '768px', margin: '0 auto' }}>
      <h2
        style={{
          fontFamily: "'Morganite', Impact, sans-serif",
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          marginBottom: '48px',
          color: '#f3f0eb',
        }}
      >
        Frequently asked <span style={{ color: '#edff00' }}>questions</span>
      </h2>

      <div>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ borderBottom: '1px solid #3c3c3f' }}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#f3f0eb',
                  fontSize: '15px',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                }}
              >
                {faq.q}
                <span
                  style={{
                    flexShrink: 0,
                    marginLeft: '16px',
                    transition: 'transform 0.3s',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    color: '#aeacab',
                    fontSize: '12px',
                  }}
                >
                  &#9660;
                </span>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-out',
                }}
              >
                <p
                  style={{
                    color: '#c9c7c4',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    paddingBottom: '20px',
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
