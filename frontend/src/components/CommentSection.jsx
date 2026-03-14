import { ImageIcon } from 'lucide-react';

export default function CommentSection() {
  const comments = [
    {
      id: 1,
      author: {
        name: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?img=5',
        role: 'BUILDER'
      },
      time: '45m ago',
      text: "This is incredible. Have you considered how it handles different accents? That's usually the biggest hurdle for voice-based technical assessments.",
      likes: 12
    },
    {
      id: 2,
      author: {
        name: 'Marcus Thorne',
        avatar: 'https://i.pravatar.cc/150?img=11'
      },
      time: '1h ago',
      text: "Love the focus on speed. Technical interviewing today is way too slow. Would love to see a demo of the real-time sentiment analysis!",
      likes: 8
    }
  ];

  return (
    <div className="mt-16 max-w-4xl pt-8 relative">
      <div className="flex items-center gap-3 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Spark some feedback</h2>
      </div>

      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-8 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-colors shadow-sm">
        <textarea
          rows={3}
          placeholder="Add a Spark of Feedback..."
          className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none mb-2 font-medium"
        ></textarea>
        <div className="flex items-center justify-end gap-4 border-t border-gray-100 dark:border-white/5 pt-3">
          <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Add image">
            <ImageIcon className="w-5 h-5" />
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-bold px-6 py-2 rounded-xl transition-all hover:scale-105">
            Post
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white/50 dark:bg-[#0f172a]/50 border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex gap-4 shadow-sm transition-colors">
            <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900 dark:text-white/90">{comment.author.name}</span>
                  {comment.author.role && (
                    <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {comment.author.role}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 font-medium">{comment.time}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {comment.text}
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                <button className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9H3v10h10.28a2 2 0 0 0 1.95-1.57l2.36-10.3A2 2 0 0 0 15.63 7H14v2zm-4 1H7v8h3v-8z"/></svg>
                  {comment.likes}
                </button>
                <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center flex items-center justify-center">
        <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-2">
          Load more feedback <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    </div>
  );
}
