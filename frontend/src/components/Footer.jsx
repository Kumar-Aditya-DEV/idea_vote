import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center py-12 mt-20 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#020617]/50 transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-gradient-to-tr from-purple-500 to-cyan-400 p-1 rounded-md">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">IdeaSpark</span>
      </div>
      
      <p className="text-gray-500 text-sm mb-6">
        © 2023 IdeaSpark Inc. Built for the dreamers and the builders.
      </p>
      
      <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</Link>
        <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Discord</Link>
        <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
        <Link to="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
      </div>
    </footer>
  );
}
