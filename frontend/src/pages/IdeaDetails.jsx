import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, ArrowLeft } from 'lucide-react';
import VotePanel from '../components/VotePanel';
import CommentSection from '../components/CommentSection';
import { IdeasContext } from '../context/IdeasContext';

export default function IdeaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ideas, saveIdea } = useContext(IdeasContext);
  const idea = ideas.find(i => i.id === id);

  if (!idea) {
    return (
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Idea not found</h2>
        <button onClick={() => navigate('/discover')} className="text-purple-600 font-bold hover:underline">
          Go back to Discover
        </button>
      </div>
    );
  }

  const handleSave = () => {
    saveIdea(idea.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: idea.title,
        text: idea.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Share this idea: ${window.location.href}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-12 pb-24 flex flex-col md:flex-row gap-10 relative">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute -top-4 left-6 lg:left-12 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="hidden md:block">
        <VotePanel votes={idea.votes} ideaId={idea.id} />
      </div>

      <div className="flex-1">
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {idea.tags.map((tag, idx) => {
              let colorClass = 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-400/10';
              if (tag === 'FINTECH') colorClass = 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10';
              else if (tag === 'EDTECH') colorClass = 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-400/10';
              
              return (
                <span key={idx} className={`${colorClass} text-xs font-bold tracking-wider px-2.5 py-1 rounded shadow-sm`}>
                  {tag}
                </span>
              );
            })}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
            {idea.title}
          </h1>

          <div className="flex items-center gap-4 mb-10">
            <img src={idea.author.avatar} alt={idea.author.name} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white/90">{idea.author.name}</p>
              <p className="text-[13px] text-gray-500 font-medium">Published {idea.time}</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl font-medium">
            <p>{idea.description}</p>
            {idea.vision && <p>{idea.vision}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-12 mb-16 border-b border-gray-200 dark:border-white/5 pb-16">
          <button 
            onClick={handleSave}
            className={`flex items-center gap-2 bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm ${idea.isSaved ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'}`}
          >
            <Heart className={`w-5 h-5 ${idea.isSaved ? 'fill-current' : 'text-gray-400'}`} /> 
            {idea.isSaved ? 'Saved to My Spark' : 'Save to My Spark'}
            <span className="ml-2 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md text-sm">{idea.saves}</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-900 dark:text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm"
          >
            <Share2 className="w-5 h-5 text-gray-400" /> Share Idea
          </button>
        </div>

        <CommentSection ideaId={idea.id} />
      </div>
    </div>
  );
}

