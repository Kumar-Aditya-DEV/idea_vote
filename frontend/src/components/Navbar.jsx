import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Zap, Bell, Plus, User, Settings, Star, LogOut, ChevronRight, Heart, MessageSquare, X } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'like',
    icon: Heart,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100 dark:bg-rose-500/10',
    message: 'Sarah Chen liked your spark',
    spark: 'Neural-Recruiter',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    type: 'comment',
    icon: MessageSquare,
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-100 dark:bg-cyan-500/10',
    message: 'Marcus Thorne commented on your spark',
    spark: 'NanoPay APIs',
    time: '15 min ago',
    unread: true,
  },
  {
    id: 3,
    type: 'like',
    icon: Heart,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100 dark:bg-rose-500/10',
    message: 'Alex Rivera liked your spark',
    spark: 'SkillSwap VR',
    time: '1h ago',
    unread: false,
  },
  {
    id: 4,
    type: 'comment',
    icon: MessageSquare,
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-100 dark:bg-cyan-500/10',
    message: 'Jordan Lee commented on your spark',
    spark: 'Neural-Recruiter',
    time: '3h ago',
    unread: false,
  },
];

const PROFILE_MENU = [
  { label: 'Profile', icon: User, path: '/dashboard' },
  { label: 'Settings', icon: Settings, path: '/dashboard' },
  { label: 'More Options', icon: ChevronRight, path: '/dashboard' },
  { label: 'Premium', icon: Star, path: '/premium', badge: 'PRO' },
];

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const isLogin = location.pathname === '/' || location.pathname === '/login';
  const hideSearchBar = ['/discover', '/trending', '/dashboard'].includes(location.pathname);
  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

  const handleLogout = () => {
    if (logout) logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 lg:px-12 backdrop-blur-md border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#020617]/50 transition-colors">
      <Link to="/discover" className="flex items-center gap-2 group">
        <div className="bg-gradient-to-tr from-purple-500 to-cyan-400 p-1.5 rounded-lg group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">IdeaSpark</span>
      </Link>

      {!isLogin && (
        <>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink to="/discover" className={({ isActive }) => `transition-colors hover:text-gray-900 dark:hover:text-white ${isActive && location.pathname === '/discover' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Discover</NavLink>
            <NavLink to="/trending" className={({ isActive }) => `transition-colors hover:text-gray-900 dark:hover:text-white ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Trending</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `transition-colors hover:text-gray-900 dark:hover:text-white ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>My Spark</NavLink>
          </div>

          <div className="flex items-center gap-4">
            {!hideSearchBar && <SearchBar className="hidden md:block w-64" />}

            {location.pathname.startsWith('/idea') && (
              <Link to="/submit" className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white text-sm font-medium rounded-full px-4 py-1.5 transition-all">
                <Plus className="w-4 h-4" /> Spark Idea
              </Link>
            )}

            {/* 🔔 Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setNotifOpen(prev => !prev); setProfileOpen(false); }}
                className="relative text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#020617]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-[360px] bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/5">
                    <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                    <div className="flex items-center gap-3">
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors">
                          Mark all read
                        </button>
                      )}
                      <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Notifications list */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-white/5">
                    {notifications.map(n => {
                      const Icon = n.icon;
                      return (
                        <div key={n.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${n.unread ? 'bg-purple-50/50 dark:bg-purple-500/5' : ''}`}>
                          <div className={`p-2 rounded-full mt-0.5 shrink-0 ${n.iconBg}`}>
                            <Icon className={`w-4 h-4 ${n.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">{n.message}</p>
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5 truncate">{n.spark}</p>
                            <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                          </div>
                          {n.unread && <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-5 py-3 border-t border-gray-100 dark:border-white/5 text-center">
                    <button className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 👤 Profile Dropdown */}
            <div className="relative ml-1" ref={profileRef}>
              <button
                onClick={() => { setProfileOpen(prev => !prev); setNotifOpen(false); }}
                className="flex items-center gap-2 group"
              >
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                  alt="Profile"
                  className={`w-9 h-9 rounded-full border-2 object-cover transition-all ${profileOpen ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'border-gray-200 dark:border-white/10 hover:border-purple-400'}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-3">
                    <img src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10" />
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || ''}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {PROFILE_MENU.map(item => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 dark:border-white/5 py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
