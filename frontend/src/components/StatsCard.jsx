export default function StatsCard({ icon, title, value, badgeText, badgeColor, iconBgColor, iconColor }) {
  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 relative flex flex-col hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl ${iconBgColor}`}>
          {icon}
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-md ${badgeColor}`}>
          {badgeText}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
