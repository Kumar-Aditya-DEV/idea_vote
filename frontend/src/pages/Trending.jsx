import { Zap, Bot, Leaf, Landmark, HeartPulse, Cloud, MessageSquare, Clock, TrendingUp, Trophy, ChevronDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Trending() {
  const trendingIdeas = [
    {
      id: 1,
      title: 'CarbonFlow: Real-time supply chain emission tracking for SMEs',
      description: 'A dashboard that integrates with existing ERP systems to automate Scope 3 emissions reporting using AI-driven classification...',
      tag: 'SUSTAINABILITY',
      tagColor: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10',
      votes: '1.2k',
      growth: '+32%',
      comments: 142,
      time: '2h ago',
      avatars: [
        'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        'https://i.pravatar.cc/150?u=a042581f4e29026024e'
      ]
    },
    {
      id: 2,
      title: 'NexusUI: Generative component library for React',
      description: 'Describe your UI in natural language and get production-ready, accessible Tailwind components that match your brand\'s unique design system.',
      tag: 'AI & ML',
      tagColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/10',
      votes: '843',
      growth: '+18%',
      comments: 89,
      time: '5h ago',
      avatars: [
        'https://i.pravatar.cc/150?u=2'
      ]
    },
    {
      id: 3,
      title: 'SleepSync: Audio biofeedback for insomnia relief',
      description: 'Mobile app using the phone\'s accelerometer to monitor breathing and play adaptive soundscapes that guide the user into deep sleep...',
      tag: 'HEALTHTECH',
      tagColor: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10',
      votes: '612',
      growth: '+2%',
      comments: 56,
      time: '8h ago',
      avatars: [
         'https://i.pravatar.cc/150?u=3'
      ]
    }
  ];

  const topOfWeek = [
    { id: '01', title: 'MicroGrid P2P Power', stats: '2.4k upvotes • +12%' },
    { id: '02', title: 'Language VR Immersion', stats: '1.9k upvotes • +5%' },
    { id: '03', title: 'DeFi Legal Wrapper', stats: '1.2k upvotes • +24%' }
  ];

  const risingCategories = [
    '#Web3Legal', '#AgriTech', '#DeepFakeAuth', '#CleanMining', '#MentalCareAI'
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-24">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-purple-600 dark:text-purple-500 uppercase mb-4">
            <Zap className="w-3.5 h-3.5 fill-purple-600 dark:fill-purple-500" /> Live Activity
          </div>
          <h1 className="text-4xl md:text-[44px] font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
            Trending Sparks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed font-medium">
            The hottest ideas sparking global conversations this week. Support the next<br className="hidden md:block"/> big thing with your upvotes.
          </p>
        </div>
        
        <Link to="/submit" className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
          <Plus className="w-5 h-5" /> Submit Spark
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-12">
        <button className="bg-[#8b5cf6] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)]">
          All Categories
        </button>
        <button className="bg-white/80 dark:bg-[#0f172a]/80 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-medium px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all">
          <Bot className="w-4 h-4 text-gray-500 dark:text-gray-400" /> AI & ML
        </button>
        <button className="bg-white/80 dark:bg-[#0f172a]/80 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-medium px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all">
          <Leaf className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Sustainability
        </button>
        <button className="bg-white/80 dark:bg-[#0f172a]/80 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-medium px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all">
          <Landmark className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Fintech
        </button>
        <button className="bg-white/80 dark:bg-[#0f172a]/80 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-medium px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all">
          <HeartPulse className="w-4 h-4 text-gray-500 dark:text-gray-400" /> HealthTech
        </button>
        <button className="bg-white/80 dark:bg-[#0f172a]/80 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-medium px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all">
          <Cloud className="w-4 h-4 text-gray-500 dark:text-gray-400" /> SaaS
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Today's Hot Takes</h2>
            <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
              Sort by: <span className="text-gray-900 dark:text-white font-bold ml-1">Popularity</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {trendingIdeas.map((idea) => (
              <div key={idea.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex gap-5 hover:border-gray-300 dark:hover:border-white/10 transition-colors group shadow-sm">
                <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#020617]/50 border border-gray-200 dark:border-white/5 rounded-xl min-w-[70px] h-[80px] shrink-0">
                  <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mb-0.5" />
                  <span className="font-bold text-[15px] text-gray-900 dark:text-white">{idea.votes}</span>
                  <div className="flex items-center gap-0.5 text-[#10b981] text-[10px] font-bold mt-1">
                    <TrendingUp className="w-3 h-3" /> {idea.growth}
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">{idea.title}</h3>
                    <span className={`shrink-0 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase ${idea.tagColor}`}>
                      {idea.tag}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-[#94a3b8] text-[14px] leading-relaxed mb-4 max-w-3xl">
                    {idea.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-2">
                      {idea.avatars.map((avatar, i) => (
                        <img key={i} src={avatar} alt="Avatar" className="w-6 h-6 rounded-full border border-white dark:border-[#0f172a]" />
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {idea.comments} Comments</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {idea.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-transparent border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold py-4 rounded-2xl transition-all text-sm">
            Load More Trending Ideas
          </button>
        </div>

        <div className="w-full lg:w-[340px] shrink-0 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Top of the Week
              </h3>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Global</span>
            </div>

            <div className="space-y-5 mb-6">
              {topOfWeek.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xl font-bold tracking-tighter text-gray-400 dark:text-gray-600 italic opacity-50">{item.id}</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500/10 dark:from-orange-500/20 to-blue-500/10 dark:to-blue-500/20 border border-gray-200 dark:border-white/5 flex items-center justify-center relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-white/50 dark:bg-white/5 blur-sm mix-blend-overlay"></div>
                    <div className="w-4 h-4 rounded-full bg-orange-400 blur-[2px]"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] mb-0.5 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-[11px] font-semibold text-gray-500 tracking-wide">{item.stats}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full text-center text-[13px] font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors py-2 border-t border-gray-100 dark:border-white/5 pt-4">
              View Full Leaderboard
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[50px] rounded-full pointer-events-none"></div>
            
            <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Community Pulse</h3>
            <p className="text-white/80 text-sm font-medium mb-6 relative z-10">IdeaSpark is growing fast! Join the fire.</p>

            <div className="flex gap-3 mb-6 relative z-10">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex-1 border border-white/10">
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">New Sparks</p>
                <p className="text-2xl font-extrabold text-white">2.4k</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex-1 border border-white/10">
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">Upvotes</p>
                <p className="text-2xl font-extrabold text-white">48k</p>
              </div>
            </div>

            <button className="w-full bg-white hover:bg-gray-50 rounded-xl py-3.5 text-sm font-bold transition-all relative z-10 shadow-md hover:shadow-xl hover:-translate-y-0.5">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Start Your Spark
              </span>
            </button>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-4 px-1">Rising Categories</h4>
            <div className="flex flex-wrap gap-2">
              {risingCategories.map((category, i) => (
                <button key={i} className="bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-[#1e293b] border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm block">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronUp(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
