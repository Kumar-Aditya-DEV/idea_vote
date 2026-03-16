import { useNavigate } from 'react-router-dom';
import { Rocket, ThumbsUp, MessageSquare, TrendingUp, ArrowRight, ChevronLeft } from 'lucide-react';

const steps = [
  {
    number: '01',
    emoji: '1️⃣',
    icon: Rocket,
    title: 'Submit Your Idea',
    color: 'from-purple-500 to-violet-600',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20',
    badgeColor: 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    description:
      'Users can share their startup ideas on the platform. To submit an idea, provide basic details so the community can understand and evaluate it.',
    fields: ['Idea Title', 'Short Description', 'Category (AI, Fintech, SaaS, etc.)'],
    example: {
      label: 'Example',
      lines: [
        { key: 'Idea Title', value: 'AI Resume Builder' },
        { key: 'Description', value: 'A tool that creates professional resumes using AI.' },
      ],
      footer: 'Once submitted, the idea becomes visible to the IdeaSpark community.',
    },
  },
  {
    number: '02',
    emoji: '2️⃣',
    icon: ThumbsUp,
    title: 'Community Voting',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-cyan-500/20',
    badgeColor: 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    description:
      'Other users on the platform can vote on the idea. Voting helps measure how popular or useful an idea is within the community.',
    fields: ['👍 Upvote if they like the idea', '👎 Downvote if they think the idea needs improvement'],
    example: {
      label: 'Example',
      lines: [
        { key: 'Idea', value: 'AI Resume Builder' },
        { key: '👍 Upvotes', value: '120' },
        { key: '👎 Downvotes', value: '10' },
      ],
      footer: null,
    },
  },
  {
    number: '03',
    emoji: '3️⃣',
    icon: MessageSquare,
    title: 'Feedback Through Comments',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    glowColor: 'shadow-emerald-500/20',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    description:
      'Users can also provide feedback by commenting on ideas. This helps the creator improve the idea based on real community input.',
    fields: ['Suggest improvements', 'Share opinions', 'Discuss the idea'],
    example: {
      label: 'Example',
      comments: [
        { user: 'User1', text: 'This idea is great for students.' },
        { user: 'User2', text: 'Many tools exist, but this could be better with a simple UI.' },
      ],
      footer: null,
    },
  },
  {
    number: '04',
    emoji: '4️⃣',
    icon: TrendingUp,
    title: 'Popular Ideas Rise to the Top',
    color: 'from-orange-500 to-pink-600',
    borderColor: 'border-orange-500/30',
    glowColor: 'shadow-orange-500/20',
    badgeColor: 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
    description:
      'Ideas are automatically ranked based on their popularity. Ideas with more votes appear higher on the platform.',
    fields: ['Trending ideas', 'Most liked ideas', 'Recently submitted ideas'],
    example: null,
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617]">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-white dark:bg-[#0a0f1e] border-b border-gray-200 dark:border-white/5">
        {/* Background glow blobs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12 pt-14 pb-16 text-center">
          {/* Back button */}
          <button
            onClick={() => navigate('/discover')}
            className="absolute left-6 lg:left-12 top-14 flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6">
            <Rocket className="w-3.5 h-3.5" /> Platform Guide
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5 text-gray-900 dark:text-white">
            How{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              IdeaSpark
            </span>{' '}
            Works
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            IdeaSpark is a platform where users can share startup ideas, receive feedback, and see how people react
            through voting and comments — in{' '}
            <span className="font-bold text-gray-900 dark:text-white">four simple steps</span>.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 space-y-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`relative bg-white dark:bg-[#0f172a] border ${step.borderColor} rounded-3xl p-8 md:p-10 shadow-xl ${step.glowColor} shadow-lg transition-all hover:shadow-2xl hover:-translate-y-0.5 duration-300`}
            >
              {/* Step number watermark */}
              <span className="absolute top-6 right-8 text-[80px] font-black text-gray-100 dark:text-white/5 leading-none select-none pointer-events-none">
                {step.number}
              </span>

              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Icon circle */}
                <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Step label */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{step.emoji}</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                      {step.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-[16px] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Fields / bullets */}
                  <ul className="space-y-2 mb-6">
                    {step.fields.map((field, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[15px] font-medium text-gray-700 dark:text-gray-300">
                        <span className={`mt-0.5 shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${step.badgeColor}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {field}
                      </li>
                    ))}
                  </ul>

                  {/* Example block */}
                  {step.example && (
                    <div className="bg-gray-50 dark:bg-[#020617]/60 border border-gray-200 dark:border-white/5 rounded-2xl p-5">
                      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">
                        {step.example.label}
                      </p>

                      {/* Key-value lines */}
                      {step.example.lines && (
                        <div className="space-y-2 mb-3">
                          {step.example.lines.map((line, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <span className="font-bold text-gray-500 dark:text-gray-400 shrink-0 min-w-[110px]">
                                {line.key}:
                              </span>
                              <span className="text-gray-900 dark:text-white font-semibold">{line.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comments */}
                      {step.example.comments && (
                        <div className="space-y-2.5 mb-3">
                          {step.example.comments.map((c, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold">
                                {c.user.slice(-1)}
                              </div>
                              <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-2.5 flex-1">
                                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block mb-0.5">
                                  {c.user}
                                </span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{c.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.example.footer && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 italic mt-2">
                          {step.example.footer}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Final Result Card */}
        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 rounded-3xl p-10 text-center overflow-hidden shadow-2xl shadow-purple-500/30">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="text-5xl mb-4">🌟</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Final Result</h2>
            <p className="text-white/85 text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
              IdeaSpark helps entrepreneurs{' '}
              <span className="text-white font-bold">validate their startup ideas</span> before building them.
              By receiving votes and feedback from the community, users can understand whether their idea has
              potential and how it can be improved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/submit')}
                className="bg-white hover:bg-gray-50 text-purple-600 font-bold px-8 py-3.5 rounded-2xl flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl shadow-lg text-sm"
              >
                Submit Your Spark <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/trending')}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 font-semibold px-8 py-3.5 rounded-2xl flex items-center gap-2 transition-all hover:-translate-y-0.5 text-sm"
              >
                Explore Trending <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
