import { UploadCloud } from 'lucide-react';

export default function UploadDropZone() {
  return (
    <div className="border border-dashed border-gray-300 dark:border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-purple-500/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all cursor-pointer">
      <div className="bg-gray-100 dark:bg-white/5 p-3 rounded-full mb-4">
        <UploadCloud className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </div>
      <p className="text-sm font-medium mb-1">
        <span className="text-gray-900 dark:text-white">Click to upload or drag </span>
        <span className="text-gray-500 dark:text-gray-400">and drop</span>
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, or SVG (Max 2MB)</p>
    </div>
  );
}
