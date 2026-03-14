import { useRef, useState, useContext } from 'react';
import HeroSection from '../components/HeroSection';
import IdeaCard from '../components/IdeaCard';
import { ChevronDown, Plus, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IdeasContext } from '../context/IdeasContext';

const SORT_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Trending Today', value: 'trending' },
  { label: 'Expensive Sparks', value: 'expensive' },
  { label: 'Professional Sparks', value: 'professional' },
  { label: 'High Rated Sparks', value: 'high_rated' },
  { label: 'Cheap Sparks', value: 'cheap' },
  { label: 'Low Rated Sparks', value: 'low_rated' },
];

function applySort(ideas, sort) {
  switch (sort) {
    case 'all': return ideas;
    case 'trending': return [...ideas].sort((a, b) => b.votes - a.votes);
    case 'expensive': return ideas.filter(i => i.price === 'expensive');
    case 'professional': return ideas.filter(i => i.tags.includes('SAAS') || i.tags.includes('FINTECH'));
    case 'high_rated': return ideas.filter(i => i.rating >= 4).sort((a, b) => b.rating - a.rating);
    case 'cheap': return ideas.filter(i => i.price === 'cheap');
    case 'low_rated': return ideas.filter(i => i.rating < 4).sort((a, b) => a.rating - b.rating);
    default: return ideas;
  }
}

export default function Home() {
  const { ideas } = useContext(IdeasContext);
  const featuredRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('all');
  const [sortOpen, setSortOpen] = useState(false);

  const selectedSortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label || 'All';

  const handleExploreClick = () => {
    setSort('all');
    setSearchQuery('');
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filtered = searchQuery.trim()
    ? ideas.filter(idea =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : applySort(ideas, sort);

  return (
    <div className="relative">
      <HeroSection onExploreClick={handleExploreClick} />

      <section ref={featuredRef} className="max-w-7xl mx-auto px-6 lg:px-12 mt-4 pb-24 scroll-mt-24">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search ideas by name, tag, or description..."
            className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all font-medium shadow-sm text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Featured Sparks</h2>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for <span className="font-semibold text-purple-500">"{searchQuery}"</span>
              </p>
            )}
          </div>

          {!searchQuery && (
            <div className="relative">
              <button
                onClick={() => setSortOpen(prev => !prev)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 font-medium transition-all shadow-sm"
              >
                Sort by: <span className="text-purple-600 dark:text-cyan-400 font-semibold">{selectedSortLabel}</span>
                <ChevronDown className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl z-30 overflow-hidden">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSort(option.value); setSortOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5
                        ${sort === option.value ? 'text-purple-600 dark:text-cyan-400 bg-purple-50 dark:bg-purple-500/10' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                      {sort === option.value && <span className="mr-2">✓</span>}
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(idea => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No sparks found</h3>
            <p className="text-gray-500 text-sm">Try a different search term or clear the search.</p>
            <button onClick={() => setSearchQuery('')} className="mt-6 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 underline underline-offset-2">
              Clear search
            </button>
          </div>
        )}
      </section>

      <Link
        to="/submit"
        className="fixed bottom-20 right-6 z-40 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] text-white font-semibold rounded-full px-6 py-4 flex items-center gap-3 transition-all hover:scale-105"
      >
        Spark New Idea <div className="bg-black/20 dark:bg-white/20 rounded-full p-1"><Plus className="w-4 h-4" /></div>
      </Link>
    </div>
  );
}
