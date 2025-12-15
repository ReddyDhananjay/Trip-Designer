'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChatMessage } from '@/types';

type WidgetState = {
  open: boolean;
  messages: ChatMessage[];
};

const STORAGE_KEY = 'kai-chat-widget-v1';

function getInitialMessages(): ChatMessage[] {
  return [
    {
      role: 'assistant',
      content:
        "Hi — I’m KAI, the Voice of Commerce. Tell me what you’re shopping for, or ask me to recommend something from the catalog.",
      timestamp: Date.now(),
    },
  ];
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [state, setState] = useState<WidgetState>({ open: false, messages: getInitialMessages() });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as WidgetState;
      if (Array.isArray(parsed?.messages) && typeof parsed?.open === 'boolean') {
        setState({
          open: parsed.open,
          messages: parsed.messages.length ? parsed.messages : getInitialMessages(),
        });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: Date.now() };
    setState((prev) => ({ ...prev, messages: [...prev.messages, userMsg] }));
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...state.messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Chat request failed');

      const aiMsg: ChatMessage = { role: 'assistant', content: data.message, timestamp: Date.now() };
      setState((prev) => ({ ...prev, messages: [...prev.messages, aiMsg] }));
    } catch {
      const aiMsg: ChatMessage = {
        role: 'assistant',
        content: "I couldn’t respond right now. Please try again.",
        timestamp: Date.now(),
      };
      setState((prev) => ({ ...prev, messages: [...prev.messages, aiMsg] }));
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setState({ open: state.open, messages: getInitialMessages() });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Don’t duplicate UI on the full chat page.
  if (pathname === '/chat') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {state.open && (
        <div className="mb-3 w-[22rem] sm:w-[24rem] rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold">
                K
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-gray-900">KAI</div>
                <div className="text-xs text-gray-500">Conversational retail assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clear}
                className="text-xs font-medium text-gray-600 hover:text-gray-900"
                type="button"
              >
                Clear
              </button>
              <button
                onClick={() => setState((p) => ({ ...p, open: false }))}
                className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
                aria-label="Close chat"
                type="button"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-3 bg-white">
            {state.messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-900 border border-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-3 py-2 text-sm bg-gray-50 text-gray-600 border border-gray-100">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-gray-100 p-3 bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask KAI…"
                className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              <button
                onClick={send}
                type="button"
                disabled={loading || !input.trim()}
                className="rounded-xl bg-gray-900 text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-[11px] text-gray-500">
              Tip: try “show me electronics”, “recommend a smartwatch”, or “create an order for boAt Rockerz 450 qty 2”.
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setState((p) => ({ ...p, open: !p.open }))}
        type="button"
        className="h-14 w-14 rounded-full bg-gray-900 text-white shadow-xl hover:shadow-2xl transition flex items-center justify-center"
        aria-label={state.open ? 'Close chat widget' : 'Open chat widget'}
      >
        {state.open ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

