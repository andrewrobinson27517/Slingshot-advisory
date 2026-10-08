'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { faqs } from '@/data/faq';
import { cn } from '@/lib/cn';

type Msg = { role: 'user' | 'bot'; text: string; cta?: boolean };

const GREETING =
  'Hi! I can help you understand our services, find starting prices, or point you to the right page. What would you like to know?';

const SUGGESTIONS = [
  'What do you do?',
  'How much does a CAM review cost?',
  'How much does a website cost?',
  'How do I get started?',
];

const STOP = new Set(['the', 'a', 'an', 'is', 'do', 'you', 'i', 'to', 'of', 'for', 'and', 'how', 'much', 'does', 'what', 'my', 'me', 'can', 'your']);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function answer(query: string): string {
  const q = tokens(query);
  if (q.length === 0) {
    return 'Could you rephrase that? You can ask about our services, pricing, or how to get started — or use the button below to request a consultation.';
  }
  let best = -1;
  let bestScore = 0;
  faqs.forEach((f, i) => {
    const hay = tokens(f.q + ' ' + f.a);
    const score = q.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  });
  if (best >= 0 && bestScore > 0) return faqs[best].a;
  return 'I’m not sure about that one, but a person can help. Use “Request a consultation” below, or email us — we’ll follow up.';
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: GREETING }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: 'user', text: q }, { role: 'bot', text: answer(q), cta: true }]);
    setInput('');
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        aria-expanded={open}
        className={cn(
          'fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-on-dark shadow-[var(--shadow-hero)] transition-transform hover:scale-105',
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open ? (
        <div className="fixed bottom-24 right-5 z-50 flex h-[32rem] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-hero)]">
          <div className="flex items-center gap-2 border-b border-border bg-navy px-4 py-3 text-on-dark">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
              <Sparkles className="h-4 w-4 text-accent" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Slingshot Assistant</p>
              <p className="text-xs text-on-dark-muted">Answers from our services &amp; FAQs</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'bg-navy text-on-dark'
                      : 'bg-surface-muted text-ink',
                  )}
                >
                  {m.text}
                  {m.cta ? (
                    <Link
                      href="/contact"
                      className="mt-2 block font-semibold text-accent-strong underline"
                    >
                      Request a consultation →
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}

            {msgs.length <= 1 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-accent/50 hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask the assistant"
              className="h-10 flex-1 rounded-full border border-border bg-surface px-4 text-sm text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-on-dark hover:bg-navy-soft"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
