import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Check, User } from 'lucide-react';

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showSignupMessage, setShowSignupMessage] = useState(false);
  const [errors, setErrors] = useState({});

  // Generate a deterministic avatar based on the email so it's consistent
  const getAvatar = (email) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email || 'User')}&backgroundColor=6d28d9,0e7490&scale=80`;

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    if (!password.trim()) errs.password = 'Password is required';
    return errs;
  };

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [provider, setProvider] = useState('');

  const handleLogin = (e, override = null) => {
    if (e) e.preventDefault();

    // When using Google/GitHub we simulate a redirect
    if (override) {
      setIsRedirecting(true);
      setProvider(override.name.split(' ')[0]);
      
      // Simulate external redirect delay
      setTimeout(() => {
        setUser(override);
        navigate('/discover');
      }, 1500);
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setUser({
      name: name.trim(),
      email: email.trim(),
      avatar: getAvatar(email.trim()),
    });
    navigate('/discover');
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    setShowSignupMessage(true);
  };

  const inputClass = (field) =>
    `w-full bg-gray-50 dark:bg-[#020617] border rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all font-medium ${errors[field] ? 'border-red-400 dark:border-red-400' : 'border-gray-200 dark:border-white/10 focus:border-purple-500/50'}`;

  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-white dark:bg-[#020617] text-gray-900 dark:text-white transition-colors duration-500">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-purple-500">
            {provider[0]}
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold animate-pulse">Redirecting to {provider}...</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">Securing your session with IdeaSpark</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-10 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative z-10 transition-colors">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[260px] mx-auto">
            Enter your details to access your sparks
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {showSignupMessage && (
            <p className="text-red-500 text-sm font-semibold text-center bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl py-2.5">
              Create your account here.
            </p>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-white/90">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); }}
                placeholder="e.g. Alex Rivera"
                className={`${inputClass('name')} pl-11`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-white/90">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
              placeholder="name@example.com"
              className={inputClass('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-800 dark:text-white/90">Password</label>
              <a href="#" className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
              placeholder="••••••••"
              className={`${inputClass('password')} tracking-widest`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
          </div>

          {/* Keep me logged in */}
          <div
            className="flex items-center gap-3 cursor-pointer w-max pt-1"
            onClick={() => setKeepLoggedIn(!keepLoggedIn)}
          >
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${keepLoggedIn ? 'bg-purple-500 border-purple-500' : 'border-gray-300 dark:border-white/20 bg-transparent'}`}>
              {keepLoggedIn && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 select-none">Keep me logged in</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02]"
          >
            Login to Spark
          </button>
        </form>

        <div className="relative flex items-center justify-center my-7">
          <div className="absolute inset-x-0 h-px bg-gray-200 dark:bg-white/10" />
          <span className="relative bg-white dark:bg-[#0f172a] px-4 text-xs font-semibold tracking-wide text-gray-500 transition-colors">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-7">
          <button
            type="button"
            onClick={() => handleLogin(null, {
              name: 'Google User',
              email: 'user@gmail.com',
              avatar: 'https://i.pravatar.cc/150?u=google',
            })}
            className="flex items-center justify-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl py-3 transition-all text-sm font-bold text-gray-800 dark:text-white"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
            Google
          </button>
          <button
            type="button"
            onClick={() => handleLogin(null, {
              name: 'GitHub User',
              email: 'user@github.com',
              avatar: 'https://i.pravatar.cc/150?u=github',
            })}
            className="flex items-center justify-center gap-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl py-3 transition-all text-sm font-bold text-gray-800 dark:text-white group"
          >
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-4 h-4 dark:invert rounded-full group-hover:opacity-80 transition-opacity" />
            GitHub
          </button>
        </div>

        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={handleSignupClick}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-bold transition-colors"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
