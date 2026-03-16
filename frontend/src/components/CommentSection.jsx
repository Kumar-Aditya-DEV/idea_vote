import { useState, useEffect, useRef, useContext } from 'react';
import { ImageIcon, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function CommentSection({ ideaId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get(`/comments/${ideaId}`);
        const mapped = data.map(c => ({
          id: c._id,
          text: c.text,
          likes: c.likes || 0,
          time: new Date(c.createdAt).toLocaleDateString(),
          author: {
            name: c.userId?.name || 'Anonymous',
            avatar: c.userId?.avatar || 'https://i.pravatar.cc/150?img=1'
          },
          replies: c.replies || []
        }));
        setComments(mapped);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [ideaId]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLike = async (commentId) => {
    try {
      await api.post(`/comments/${commentId}/like`);
      setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplyPost = (commentId) => {
    // Reply logic would go here connecting to real API
    setReplyText('');
    setReplyingTo(null);
  };

  const handlePost = async () => {
    if (!commentText.trim()) return;
    try {
      const { data } = await api.post('/comments', { ideaId, text: commentText });
      
      const newComment = {
        id: data._id,
        text: data.text,
        likes: 0,
        time: 'Just now',
        author: {
          name: data.userId?.name || user?.name || 'Anonymous',
          avatar: data.userId?.avatar || user?.avatar || 'https://i.pravatar.cc/150?img=1'
        },
        replies: []
      };

      setComments(prev => [newComment, ...prev]);
      setCommentText('');
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const visibleComments = comments.slice(0, visibleCount);

  if (loading) return <div className="mt-8 text-center text-gray-500">Loading comments...</div>;

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
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a Spark of Feedback..."
          className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none mb-2 font-medium"
        ></textarea>

        {selectedImage && (
          <div className="relative inline-block mb-4">
            <img src={selectedImage} alt="Selected" className="max-h-48 rounded-xl border border-gray-200 dark:border-white/10" />
            <button 
              onClick={removeSelectedImage}
              className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full p-1 shadow-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-end gap-4 border-t border-gray-100 dark:border-white/5 pt-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          <button 
            onClick={handleImageClick}
            className={`text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ${selectedImage ? 'text-purple-500' : ''}`} 
            aria-label="Add image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={handlePost}
            className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-bold px-6 py-2 rounded-xl transition-all hover:scale-105"
          >
            Post
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {visibleComments.length > 0 ? (
          visibleComments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="bg-white/50 dark:bg-[#0f172a]/50 border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex gap-4 shadow-sm transition-colors">
                <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900 dark:text-white/90">{comment.author.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{comment.time}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9H3v10h10.28a2 2 0 0 0 1.95-1.57l2.36-10.3A2 2 0 0 0 15.63 7H14v2zm-4 1H7v8h3v-8z"/></svg>
                      {comment.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No feedback yet. Be the first to spark one!</p>
        )}
      </div>

      {comments.length > visibleCount && (
        <div className="mt-8 text-center flex items-center justify-center">
          <button 
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-2"
          >
            Load more feedback <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}

