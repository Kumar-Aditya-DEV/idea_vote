import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SubmitIdea from './pages/SubmitIdea';
import Login from './pages/Login';
import IdeaDetails from './pages/IdeaDetails';
import Dashboard from './pages/Dashboard';
import Trending from './pages/Trending';
import HowItWorks from './pages/HowItWorks';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { IdeasProvider } from './context/IdeasContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <IdeasProvider>
          <Router>
            <div className="min-h-screen text-gray-900 dark:text-white flex flex-col transition-colors duration-300">
              <Navbar />
              <main className="flex-grow pt-[80px]">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/discover" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/submit" element={<ProtectedRoute><SubmitIdea /></ProtectedRoute>} />
                  <Route path="/trending" element={<ProtectedRoute><Trending /></ProtectedRoute>} />
                  <Route path="/how-it-works" element={<ProtectedRoute><HowItWorks /></ProtectedRoute>} />
                  <Route path="/idea/:id" element={<ProtectedRoute><IdeaDetails /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <ThemeToggle />
            </div>
          </Router>
        </IdeasProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
