import { Search } from 'lucide-react';

export default function SearchBar({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
      <input 
        type="text" 
        placeholder="Search ideas..." 
        className="bg-gray-100 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 rounded-full pl-10 pr-4 py-2 w-full focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
      />
    </div>
  );
}
