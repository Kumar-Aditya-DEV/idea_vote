import { Heart, Share2 } from 'lucide-react';
import VotePanel from '../components/VotePanel';
import CommentSection from '../components/CommentSection';

export default function IdeaDetails() {
  const idea = {
    title: 'Neural-Recruiter',
    description: 'An AI-driven platform that conducts technical interviews via voice and rates candidates based on problem-solving speed and logic. Features include real-time sentiment analysis and automated coding challenges.',
    vision: 'The vision is to reduce recruitment overhead by 80% while providing a bias-free evaluation system for technical talent globally.',
    tags: ['AI', 'SAAS'],
    votes: 1240,
    author: {
      name: 'Alex Rivera',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    time: 'Published 2 hours ago'
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-12 pb-24 flex gap-10 relative">
      <div className="hidden md:block">
        <VotePanel votes={idea.votes} />
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
              <p className="text-[13px] text-gray-500 font-medium">{idea.time}</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl font-medium">
            <p>{idea.description}</p>
            <p>{idea.vision}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-12 mb-16 border-b border-gray-200 dark:border-white/5 pb-16">
          <button className="flex items-center gap-2 bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-900 dark:text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm">
            <Heart className="w-5 h-5 text-gray-400" /> Save to My Spark
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-900 dark:text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm">
            <Share2 className="w-5 h-5 text-gray-400" /> Share Idea
          </button>
        </div>

        <CommentSection />
      </div>
    </div>
  );
}
