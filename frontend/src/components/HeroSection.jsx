export default function HeroSection({ onExploreClick }) {
  return (
    <div className="flex flex-col items-center text-center pt-24 pb-20 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-full px-4 py-1.5 mb-8 shadow-lg transition-colors">
        <span className="text-sm font-medium tracking-wide">🚀 BETA ACCESS NOW LIVE</span>
      </div>
      
      <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
        The <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500">Launchpad</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">for Your</span><br />
        Next Big Idea
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed font-medium">
        Post, vote, and validate startup concepts with a community of<br className="hidden md:block"/> builders. Turn sparks into ventures.
      </p>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onExploreClick}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white text-lg font-medium px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-1"
        >
          Explore Ideas
        </button>
        <button className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-900 dark:text-white text-lg font-medium px-8 py-3.5 rounded-2xl transition-all hover:-translate-y-1 shadow-sm">
          How it Works
        </button>
      </div>
    </div>
  );
}
