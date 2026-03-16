import { useContext } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { IdeasContext } from '../context/IdeasContext';

export default function VotePanel({ votes, ideaId }) {
  const { upvoteIdea, downvoteIdea } = useContext(IdeasContext);

  return (
    <div className="flex flex-col items-center gap-2 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-xl p-3 w-16 sticky top-28 h-fit shadow-lg z-10 transition-colors">
      <button 
        onClick={() => upvoteIdea(ideaId)}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" 
        aria-label="Upvote"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
      <span className="font-extrabold text-lg tracking-wide my-1 text-gray-900 dark:text-white">{votes.toLocaleString()}</span>
      <button 
        onClick={() => downvoteIdea(ideaId)}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" 
        aria-label="Downvote"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
}

