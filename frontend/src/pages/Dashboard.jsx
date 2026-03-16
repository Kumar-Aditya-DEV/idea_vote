import { useContext, useState } from 'react';
import { Zap, ArrowUp, MessageSquare, Eye, Plus, Search, SlidersHorizontal, ArrowUpRight, MessageCircle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import IdeaCard from '../components/IdeaCard';
import { Link } from 'react-router-dom';
import { IdeasContext } from '../context/IdeasContext';

export default function Dashboard() {
  const { ideas, deleteIdea } = useContext(IdeasContext);
  const [filterText, setFilterText] = useState('');
  
  const myIdeas = ideas.filter(i => (i.isOwned || i.isSaved) && 
    (i.title.toLowerCase().includes(filterText.toLowerCase()) || 
     i.description.toLowerCase().includes(filterText.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-gray-900 dark:text-white">
            My Spark <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Studio</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your submissions and track your idea performance.</p>
        </div>
        <Link to="/submit" className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105">
          <Plus className="w-5 h-5" /> Create New Spark
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatsCard 
          icon={<Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400" />} 
          title="Total Sparks" value={myIdeas.length.toString()} 
          badgeText="+2 this week" badgeColor="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10" iconBgColor="bg-purple-100 dark:bg-purple-500/10" 
        />
        <StatsCard 
          icon={<ArrowUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />} 
          title="Votes Received" value="2,842" 
          badgeText="+12%" badgeColor="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10" iconBgColor="bg-cyan-100 dark:bg-cyan-500/10" 
        />
        <StatsCard 
          icon={<MessageSquare className="w-5 h-5 text-pink-600 dark:text-pink-400" />} 
          title="Comments" value="156" 
          badgeText="Total" badgeColor="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5" iconBgColor="bg-pink-100 dark:bg-pink-500/10" 
        />
        <StatsCard 
          icon={<Eye className="w-5 h-5 text-orange-600 dark:text-orange-400" />} 
          title="Total Views" value="8,924" 
          badgeText="+420" badgeColor="text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10" iconBgColor="bg-orange-100 dark:bg-orange-500/10" 
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Sparks</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Filter my ideas..." 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all font-medium shadow-sm" 
            />
          </div>
          <button className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 p-2.5 rounded-xl transition-all shadow-sm">
            <SlidersHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {myIdeas.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <p className="text-5xl mb-3">💡</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No sparks yet!</h3>
            <p className="text-gray-500 text-sm mb-4">Click "Create New Spark" to publish your first idea.</p>
          </div>
        )}
        {myIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} isDashboard={true} />
        ))}
        
        <Link to="/submit" className="bg-gray-50 dark:bg-[#020617]/50 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-500/50 hover:bg-white dark:hover:bg-white/5 transition-all group min-h-[300px]">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">New Concept</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-[200px]">Got another spark? Click here to share it with the community.</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-full">
                <ArrowUpRight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium"><span className="text-gray-600 dark:text-white">Someone upvoted</span> <span className="text-gray-900 dark:text-white font-bold">Neural-Recruiter</span></p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">2 minutes ago</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm">
              <div className="bg-cyan-100 dark:bg-cyan-500/10 p-3 rounded-full">
                <MessageCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium"><span className="text-gray-900 dark:text-white font-bold">Sarah Chen</span> <span className="text-gray-600 dark:text-gray-300">commented on your spark.</span></p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-gray-100 dark:from-[#0f172a] to-white dark:to-[#020617] border border-gray-200 dark:border-white/10 rounded-2xl p-6 h-full relative overflow-hidden group shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 dark:bg-purple-500/10 blur-[50px] pointer-events-none rounded-full" />
            
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">Builder Tip 💡</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium mb-8">
              Adding a clear technical breakdown to your sparks increases validation rates by up to 45%. Try updating your descriptions!
            </p>
            <Link to="#" className="text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-1 group-hover:gap-2">
              Learn more <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
