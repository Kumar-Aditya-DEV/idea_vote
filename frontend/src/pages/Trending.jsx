import { useState, useContext } from 'react';
import { Zap, Bot, Leaf, Landmark, HeartPulse, Cloud, MessageSquare, Clock, TrendingUp, Trophy, ChevronDown, Plus, ChevronUp as ChevronUpIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IdeasContext } from '../context/IdeasContext';

export default function Trending() {
  const { ideas, upvoteIdea } = useContext(IdeasContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(2);
  const [sortBy, setSortBy] = useState('All');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const leaderboardMembers = [
    { rank: '01', name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1', sparks: 12, votes: '4.2k' },
    { rank: '02', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5', sparks: 10, votes: '3.8k' },
    { rank: '03', name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11', sparks: 9, votes: '3.1k' },
    { rank: '04', name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=47', sparks: 8, votes: '2.9k' },
    { rank: '05', name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/150?img=60', sparks: 7, votes: '2.5k' },
    { rank: '06', name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?img=32', sparks: 7, votes: '2.4k' },
    { rank: '07', name: 'Elena Vance', avatar: 'https://i.pravatar.cc/150?img=45', sparks: 6, votes: '2.1k' },
    { rank: '08', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=12', sparks: 6, votes: '1.9k' },
    { rank: '09', name: 'Lucas Meyer', avatar: 'https://i.pravatar.cc/150?img=15', sparks: 5, votes: '1.8k' },
    { rank: '10', name: 'Sofia Rossi', avatar: 'https://i.pravatar.cc/150?img=22', sparks: 5, votes: '1.7k' },
    { rank: '11', name: 'Liam Wilson', avatar: 'https://i.pravatar.cc/150?img=24', sparks: 4, votes: '1.5k' },
    { rank: '12', name: 'Mia Thompson', avatar: 'https://i.pravatar.cc/150?img=27', sparks: 4, votes: '1.4k' },
    { rank: '13', name: 'Noah Davis', avatar: 'https://i.pravatar.cc/150?img=33', sparks: 4, votes: '1.3k' },
    { rank: '14', name: 'Emma White', avatar: 'https://i.pravatar.cc/150?img=35', sparks: 3, votes: '1.2k' },
    { rank: '15', name: 'Oliver Martin', avatar: 'https://i.pravatar.cc/150?img=38', sparks: 3, votes: '1.1k' },
    { rank: '16', name: 'Ava Garcia', avatar: 'https://i.pravatar.cc/150?img=42', sparks: 3, votes: '1.0k' },
    { rank: '17', name: 'Ethan Moore', avatar: 'https://i.pravatar.cc/150?img=48', sparks: 2, votes: '950' },
    { rank: '18', name: 'Isabella Taylor', avatar: 'https://i.pravatar.cc/150?img=49', sparks: 2, votes: '880' },
    { rank: '19', name: 'Mason Hall', avatar: 'https://i.pravatar.cc/150?img=51', sparks: 2, votes: '820' },
    { rank: '20', name: 'Sophia King', avatar: 'https://i.pravatar.cc/150?img=53', sparks: 2, votes: '750' }
  ];

  const categories = [
    { name: 'All', icon: null },
    { name: 'AI & ML', icon: Bot },
    { name: 'Sustainability', icon: Leaf },
    { name: 'FinTech', icon: Landmark },
    { name: 'HealthTech', icon: HeartPulse },
    { name: 'SaaS', icon: Cloud }
  ];

  const sortOptions = [
    'All',
    'Trending Today',
    'Expensive Sparks',
    'Professional Sparks',
    'High Rated Sparks',
    'Cheap Sparks',
    'Low Rated Sparks'
  ];

  const filteredIdeas = ideas.filter(idea => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || 
      idea.tags.some(tag => tag.toUpperCase() === selectedCategory.toUpperCase());
    
    if (!matchesCategory) return false;

    // Additional filter logic based on sortBy
    if (sortBy === 'Expensive Sparks') return idea.price === 'expensive';
    if (sortBy === 'Cheap Sparks') return idea.price === 'cheap';
    if (sortBy === 'Professional Sparks') return idea.rating === 5;
    
    return true;
  });

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    if (sortBy === 'Trending Today') return b.votes - a.votes;
    if (sortBy === 'High Rated Sparks') return b.rating - a.rating;
    if (sortBy === 'Low Rated Sparks') return a.rating - b.rating;
    return 0; // Default or 'All'
  });

  const displayIdeas = sortedIdeas.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  const topOfWeek = [
    { id: '01', title: 'MicroGrid P2P Power', stats: '2.4k upvotes • +12%' },
    { id: '02', title: 'Language VR Immersion', stats: '1.9k upvotes • +5%' },
    { id: '03', title: 'DeFi Legal Wrapper', stats: '1.2k upvotes • +24%' }
  ];

  const risingCategories = [
    '#Web3Legal', '#AgriTech', '#DeepFakeAuth', '#CleanMining', '#MentalCareAI'
  ];

  const getTagColor = (tag) => {
    const t = tag.toUpperCase();
    if (t === 'AI & ML' || t === 'AI') return 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/10';
    if (t === 'SUSTAINABILITY') return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10';
    if (t === 'FINTECH') return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10';
    if (t === 'HEALTHTECH') return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10';
    if (t === 'SAAS') return 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/10';
    return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-500/10';
  };

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
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <button 
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setVisibleCount(2);
              }}
              className={`${isActive ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'bg-white/80 dark:bg-[#0f172a]/80 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-700 dark:text-gray-300'} font-semibold px-5 py-2.5 rounded-full text-sm flex items-center gap-2 transition-all`}
            >
              {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />} 
              {cat.name === 'All' ? 'All Categories' : cat.name}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {selectedCategory === 'All' ? "Today's Hot Takes" : `${selectedCategory} Sparks`}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setVisibleCount(2);
                }}
                className="bg-transparent border-none text-gray-900 dark:text-white font-bold text-sm focus:ring-0 cursor-pointer p-0 pr-6"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option} className="bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {displayIdeas.length > 0 ? displayIdeas.map((idea) => (
              <div key={idea.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex gap-5 hover:border-gray-300 dark:hover:border-white/10 transition-colors group shadow-sm">
                <button 
                  onClick={() => upvoteIdea(idea.id)}
                  className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#020617]/50 border border-gray-200 dark:border-white/5 rounded-xl min-w-[70px] h-[80px] shrink-0"
                >
                  <ChevronUpIcon className="w-5 h-5 text-gray-400 group-hover:text-[#8b5cf6] transition-colors mb-0.5" />
                  <span className="font-bold text-[15px] text-gray-900 dark:text-white">{idea.votes >= 1000 ? (idea.votes / 1000).toFixed(1) + 'k' : idea.votes}</span>
                  <div className="flex items-center gap-0.5 text-[#10b981] text-[10px] font-bold mt-1">
                    <TrendingUp className="w-3 h-3" /> +{(Math.random() * 20 + 2).toFixed(0)}%
                  </div>
                </button>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <Link to={`/idea/${idea.id}`} className="hover:text-[#8b5cf6] transition-colors">
                      <h3 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">{idea.title}</h3>
                    </Link>
                    <div className="flex gap-2">
                      {idea.tags.map(tag => (
                        <span key={tag} className={`shrink-0 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-[#94a3b8] text-[14px] leading-relaxed mb-4 max-w-3xl line-clamp-2">
                    {idea.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <img src={idea.author.avatar} alt="Avatar" className="w-6 h-6 rounded-full border border-white dark:border-[#0f172a]" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{idea.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                      <Link to={`/idea/${idea.id}`} className="flex items-center gap-1.5 hover:text-[#8b5cf6] transition-colors">
                        <MessageSquare className="w-4 h-4" /> {idea.comments?.length || 0} Comments
                      </Link>
                      <Link to={`/idea/${idea.id}`} className="flex items-center gap-1.5 hover:text-[#8b5cf6] transition-colors">
                        <Clock className="w-4 h-4" /> {idea.time}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400 font-medium">No sparks found in this category yet.</p>
              </div>
            )}
          </div>

          {filteredIdeas.length > visibleCount && (
            <button 
              onClick={handleLoadMore}
              className="w-full bg-transparent border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold py-4 rounded-2xl transition-all text-sm"
            >
              Load More Trending Ideas
            </button>
          )}
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

            <button 
              onClick={() => setShowLeaderboard(true)}
              className="w-full text-center text-[13px] font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors py-2 border-t border-gray-100 dark:border-white/5 pt-4"
            >
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

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLeaderboard(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            <div className="p-8 flex items-center justify-between border-b border-gray-100 dark:border-white/5 shrink-0 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Elite Members</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Top contributors of the week</p>
                </div>
              </div>
              <button 
                onClick={() => setShowLeaderboard(false)}
                className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
              <div className="grid gap-1 px-4 py-4">
                {leaderboardMembers.map((member) => (
                  <div key={member.rank} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                    <span className={`text-lg font-black italic tracking-tighter shrink-0 w-8 ${
                      member.rank === '01' ? 'text-orange-500' : 
                      member.rank === '02' ? 'text-gray-400' : 
                      member.rank === '03' ? 'text-amber-700' : 'text-gray-300 dark:text-gray-600'
                    }`}>
                      {member.rank}
                    </span>
                    <div className="relative shrink-0">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-purple-500/30 transition-all" />
                      {member.rank === '01' && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 rounded-full border-2 border-white dark:border-[#0f172a] flex items-center justify-center">
                          <Zap className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{member.name}</h4>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{member.sparks} Sparks Shared</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{member.votes}</p>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Global Votes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 dark:border-white/5 shrink-0 bg-gray-50/50 dark:bg-black/20">
              <button 
                onClick={() => setShowLeaderboard(false)}
                className="w-full py-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-extrabold rounded-2xl transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
