import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, Zap, BarChart2, Infinity, Shield, Headphones,
  Rocket, ChevronRight, Check, Crown
} from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    color: 'from-purple-500 to-violet-600',
    glow: 'rgba(139,92,246,0.35)',
    title: 'Priority Idea Visibility',
    desc: 'Your ideas appear at the top of trending sections, maximising discovery and earning more upvotes from the community.',
  },
  {
    icon: BarChart2,
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.35)',
    title: 'Advanced Analytics',
    desc: 'Unlock detailed stats — total views, upvotes, engagement rate and user interactions — to understand your audience.',
  },
  {
    icon: Infinity,
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.35)',
    title: 'Unlimited Submissions',
    desc: 'Free users face limits. Premium members can submit as many startup ideas as they want, any time.',
  },
  {
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.35)',
    title: 'Premium Badge on Ideas',
    desc: 'Every idea you publish gets a ⭐ Premium badge, helping it stand out beautifully among thousands of sparks.',
  },
  {
    icon: Rocket,
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.35)',
    title: 'Early Access to Features',
    desc: 'Be first to try new platform tools and capabilities before they\'re rolled out to all users.',
  },
  {
    icon: Headphones,
    color: 'from-indigo-500 to-purple-600',
    glow: 'rgba(99,102,241,0.35)',
    title: 'Priority Support',
    desc: 'Jump the queue. Get faster responses and dedicated assistance from the IdeaSpark team whenever you need help.',
  },
];

const FREE_FEATURES = [
  'Submit ideas (limited)',
  'Vote on ideas',
  'Comment on ideas',
  'Browse all sparks',
];

const PRO_FEATURES = [
  'Priority idea visibility',
  'Unlimited idea submissions',
  'Advanced analytics dashboard',
  'Premium ⭐ badge on ideas',
  'Early access to new features',
  'Priority support',
  'Everything in Free',
];

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes! Premium is billed monthly and you can cancel at any time. You\'ll retain access until the end of your billing period.',
  },
  {
    q: 'What happens to my ideas if I cancel?',
    a: 'All your submitted ideas remain on the platform. However, the Premium badge and priority visibility will be removed after your subscription ends.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We\'re working on it! Sign up to get notified when a free trial becomes available for Premium.',
  },
  {
    q: 'Can I upgrade mid-month?',
    a: 'Absolutely. Upgrading takes effect immediately and you\'ll be charged a prorated amount for the remainder of the month.',
  },
];

export default function Premium() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-gray-900 dark:text-white overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden text-center">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-500/20 via-cyan-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-20 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-8">
            <Star className="w-3.5 h-3.5 fill-current" />
            IdeaSpark Premium
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none">
            Supercharge Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500">
              Startup Ideas
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Designed for founders, innovators, and creators who want greater visibility, smarter analytics, and powerful tools to validate their ideas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-bold px-10 py-4 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all hover:scale-105 text-base"
            >
              Get Premium — $9/mo
            </button>
            <button
              onClick={() => navigate('/discover')}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors text-base"
            >
              Continue Free <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating premium badge demo */}
        <div className="relative z-10 mt-16 flex justify-center">
          <div className="bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 shadow-[0_0_80px_rgba(168,85,247,0.15)] max-w-xs w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                <Star className="w-3 h-3 fill-current" /> PREMIUM IDEA
              </span>
              <span className="text-xs text-gray-400 font-medium">2 hours ago</span>
            </div>
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">AI Resume Builder</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Auto-generate tailored resumes from your skill set using GPT-4.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="https://i.pravatar.cc/150?img=5" className="w-7 h-7 rounded-full border border-white dark:border-white/10" alt="avatar" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Sarah Chen</span>
              </div>
              <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold text-sm">
                <Zap className="w-4 h-4 fill-current" /> 1,240
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3">What You Get</p>
          <h2 className="text-4xl font-extrabold tracking-tight">Everything Premium Unlocks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-3xl p-8 transition-all duration-300 overflow-hidden group"
                style={hoveredCard === i ? { boxShadow: `0 0 60px ${f.glow}`, borderColor: 'rgba(168,85,247,0.3)' } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${f.color} mb-5 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Pricing ───────────────────────────────────────────── */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3">Simple Pricing</p>
          <h2 className="text-4xl font-extrabold tracking-tight">Choose Your Plan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-2">Basic Plan</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white">Free</p>
              <p className="text-gray-400 text-sm mt-1">Forever. No credit card needed.</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/discover')}
              className="w-full py-4 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              Continue Free
            </button>
          </div>

          {/* Premium */}
          <div className="relative bg-gradient-to-br from-[#0f0a1e] to-[#0a1628] border border-purple-500/30 rounded-3xl p-8 flex flex-col overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.2)]">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/15 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-purple-400 mb-2">Premium Plan</p>
                  <div className="flex items-end gap-2">
                    <p className="text-5xl font-extrabold text-white leading-none">$9</p>
                    <p className="text-gray-400 text-sm mb-1.5">/ month</p>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Cancel any time.</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 p-3 rounded-2xl">
                  <Crown className="w-6 h-6 text-amber-400" />
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {PRO_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-gray-200">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl font-extrabold text-white hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.02] text-base">
                Upgrade to Premium
              </button>
              <p className="text-center text-gray-600 text-xs mt-4">Secure payment · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Who Should Use ────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-white/5 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3">Perfect For</p>
          <h2 className="text-4xl font-extrabold tracking-tight mb-12">Who Should Go Premium?</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Startup Founders', 'Entrepreneurs', 'Innovators', 'Creators'].map((label, i) => {
              const emojis = ['🚀', '💡', '⚡', '🎨'];
              return (
                <div key={label} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 text-center hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all">
                  <div className="text-3xl mb-3">{emojis[i]}</div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pb-32">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3">FAQ</p>
          <h2 className="text-4xl font-extrabold tracking-tight">Common Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="border-t border-gray-100 dark:border-white/5 py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.4)] mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Ready to Ignite?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg font-medium">
            Join hundreds of founders already using Premium to get their ideas seen, validated, and funded.
          </p>
          <button
            onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-extrabold px-12 py-5 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all hover:scale-105 text-lg"
          >
            Get Started for $9/month
          </button>
        </div>
      </section>
    </div>
  );
}
