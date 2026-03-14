import { ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IdeaCard({ idea, isDashboard = false }) {
  const { id, title, description, tags, author, time, votes } = idea;

  return (
    <Link to={`/idea/${id}`} className="block group">
      <div className="glass-card p-6 hover:border-gray-300 dark:hover:border-white/10 transition-all h-full flex flex-col relative overflow-hidden hover:-translate-y-1">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex gap-2">
            {tags.map((tag, idx) => {
              let colorClass = 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-400/10';
              if (tag === 'FINTECH') colorClass = 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10';
              else if (tag === 'EDTECH') colorClass = 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-400/10';
              
              return (
                <span key={idx} className={`${colorClass} text-[10px] font-bold tracking-wider px-2 py-1 rounded shadow-sm`}>
                  {tag}
                </span>
              );
            })}
          </div>
          
          <div className="flex flex-col items-center gap-1 group/vote">
            <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-1" aria-label="Upvote">
              <ChevronUp className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm tracking-wide text-gray-900 dark:text-white">{votes.toLocaleString()}</span>
            <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-1" aria-label="Downvote">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 flex-grow">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">{description}</p>
        </div>

        <div className="mt-8 flex items-center justify-between relative z-10 border-t border-gray-100 dark:border-white/5 pt-4">
          <div className="flex items-center gap-2">
            {!isDashboard ? (
              <>
                <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{author.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                </div>
              </>
            ) : (
              <div className="flex items-center">
                <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 relative z-10 bg-white dark:bg-[#0f172a]" />
                <div className="w-8 h-8 rounded-full border border-white dark:border-[#0f172a] bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-700 dark:text-white relative -ml-2 z-0">
                  +5
                </div>
              </div>
            )}
          </div>
          
          {isDashboard && (
             <div className="flex items-center gap-4 text-gray-400">
               <button className="hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Edit">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
               </button>
               <button className="hover:text-red-500 dark:hover:text-red-400 transition-colors" aria-label="Delete">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
               </button>
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}
