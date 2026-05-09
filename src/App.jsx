import React, { useState } from 'react';
import { Check, X, Sparkles, ArrowRight, Mail } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // 真實部署時這裡接 Formspree / ConvertKit / Supabase
    }
  };

  const examples = [
    {
      english: 'Olivia',
      bad: '欧丽维亚',
      badLabel: 'Transliteration',
      good: '沈知夏',
      goodLabel: 'Natural',
    },
    {
      english: 'Michael',
      bad: '迈克尔',
      badLabel: 'Sounds foreign',
      good: '陆明哲',
      goodLabel: 'Sounds native',
    },
    {
      english: 'Sophia',
      bad: '索菲亚',
      badLabel: 'Literal',
      good: '林思雅',
      goodLabel: 'Elegant',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white text-stone-900">
      <nav className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">名</span>
            <span className="text-base font-medium">Mandarin Name Check</span>
          </div>
          <a href="#signup" className="text-sm font-medium text-stone-600 hover:text-stone-900">
            Get early access
          </a>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium mb-6">
          <Sparkles className="w-3 h-3" />
          Launching soon — join the waitlist
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
          Is your Chinese name <span className="italic text-red-700">actually</span> good?
        </h1>
        <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Check if your Chinese name sounds natural and culturally appropriate — or get a better one in 60 seconds.
        </p>
        <a
          href="#signup"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition"
        >
          Get early access
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-xs text-stone-500 mt-3">Free name check at launch · No spam</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-center text-sm font-medium text-stone-500 uppercase tracking-wider mb-8">
          Most foreign Chinese names fall into this trap
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {examples.map((ex, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-6">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
                {ex.english}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xl font-medium text-stone-900">{ex.bad}</p>
                    <p className="text-xs text-red-700 mt-1">{ex.badLabel}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xl font-medium text-stone-900">{ex.good}</p>
                    <p className="text-xs text-emerald-700 mt-1">{ex.goodLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How it works
        </h2>
        <div className="space-y-6">
          {[
            {
              num: '01',
              title: 'Tell us your situation',
              desc: 'Your English name, your current Chinese name (if any), and where you plan to use it — class, business, social media, travel.',
            },
            {
              num: '02',
              title: 'Get an honest naturalness score',
              desc: 'We analyze if your name sounds like a real modern Chinese name or a rough transliteration, and explain exactly what feels off.',
            },
            {
              num: '03',
              title: 'Receive a name that actually fits',
              desc: 'A natural, meaningful Chinese name with pinyin, character meanings, and cultural context — not a random generator output.',
            },
          ].map((step) => (
            <div key={step.num} className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-sm font-bold text-stone-700">
                {step.num}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                <p className="text-stone-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="signup" className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-stone-900 text-white rounded-2xl p-8 md:p-10">
          {!submitted ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Join the waitlist
              </h2>
              <p className="text-stone-300 mb-6 leading-relaxed">
                We're building this now. Leave your email and we'll send you a free name check when it launches.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-stone-500"
                  />
                </div>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Optional: what's your Chinese name situation right now? (helps us build it better)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-stone-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-stone-900 rounded-lg font-semibold hover:bg-stone-100 transition"
                >
                  Get early access
                </button>
              </form>
              <p className="text-xs text-stone-500 mt-4 text-center">
                We'll only email you when it's ready. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500 mx-auto mb-4 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">You're on the list</h2>
              <p className="text-stone-300">
                We'll email you the moment it's ready. Thank you for being early.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <div className="border-l-2 border-stone-300 pl-5">
          <p className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">
            Why this exists
          </p>
          <p className="text-stone-700 leading-relaxed">
            Most foreigners get their Chinese name from a language teacher, a friend, or a random generator. These names are often fine — but many feel outdated, overly literal, or subtly off in ways native speakers notice immediately. This tool gives you an honest read, and if your name could be better, shows you exactly how.
          </p>
        </div>
      </section>

      <footer className="border-t border-stone-200 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-stone-500">
          Mandarin Name Check · Coming 2026
        </div>
      </footer>
    </div>
  );
}
