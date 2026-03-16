import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Seed data shown when DB is empty
const SEED_IDEAS = [
  {
    id: 'seed-1',
    title: 'Neural-Recruiter',
    description: 'An AI-driven platform that conducts technical interviews via voice and rates candidates based on problem-solving speed and logic. Features include real-time sentiment analysis and automated coding challenges.',
    summary: 'AI-powered voice interviews with bias-free scoring.',
    vision: 'Reduce recruitment overhead by 80% with AI.',
    tags: ['AI', 'SAAS'],
    votes: 1240, saves: 45, price: 'expensive', rating: 5,
    thumbnail: null,
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    time: '2 hours ago', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-2',
    title: 'AI Resume Builder',
    description: 'An AI tool that automatically generates professional resumes based on user skills, job descriptions, and experience.',
    summary: 'Auto-generate tailored resumes from your skill set.',
    tags: ['AI'], votes: 120, saves: 12, price: 'cheap', rating: 4,
    thumbnail: null,
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: '5 hours ago', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-3',
    title: 'AI Code Reviewer',
    description: 'A platform that analyzes code using AI and suggests improvements, bug fixes, and optimizations in real time.',
    tags: ['AI'], votes: 95, saves: 8, price: 'expensive', rating: 5,
    thumbnail: null,
    author: { name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11' },
    time: 'Yesterday', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-4',
    title: 'Smart Waste Management',
    description: 'A system that uses IoT and data analytics to optimize waste collection and recycling processes across cities.',
    tags: ['SUSTAINABILITY'], votes: 85, saves: 9, price: 'expensive', rating: 4,
    thumbnail: null,
    author: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=47' },
    time: '1 day ago', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-5',
    title: 'Smart Budget App',
    description: 'An app that automatically tracks expenses and provides AI-based budgeting suggestions personalized to your lifestyle.',
    tags: ['FINTECH'], votes: 110, saves: 12, price: 'cheap', rating: 5,
    thumbnail: null,
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: '4 hours ago', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-6',
    title: 'AI Symptom Checker',
    description: 'An AI tool that analyzes symptoms and suggests possible health conditions, helping patients prepare for doctor visits.',
    tags: ['HEALTHTECH'], votes: 105, saves: 14, price: 'cheap', rating: 4,
    thumbnail: null,
    author: { name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?img=32' },
    time: '1 hour ago', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-7',
    title: 'Team Productivity Tracker',
    description: 'A SaaS platform that tracks team productivity, project progress, and provides actionable insights for managers.',
    tags: ['SAAS'], votes: 90, saves: 11, price: 'cheap', rating: 4,
    thumbnail: null,
    author: { name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11' },
    time: '3 hours ago', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-8',
    title: 'Micro Investment Platform',
    description: 'A platform that allows users to invest small amounts of money into diversified portfolios with zero commission fees.',
    tags: ['FINTECH'], votes: 90, saves: 11, price: 'expensive', rating: 4,
    thumbnail: null,
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    time: 'Yesterday', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-9',
    title: 'Carbon Footprint Tracker',
    description: 'An app that helps individuals and businesses track and reduce their daily carbon footprint with actionable goals.',
    tags: ['SUSTAINABILITY'], votes: 70, saves: 7, price: 'cheap', rating: 3,
    thumbnail: null,
    author: { name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?img=32' },
    time: '2 days ago', isOwned: false, isSaved: false, comments: []
  },
  {
    id: 'seed-10',
    title: 'Telemedicine Platform',
    description: 'A platform where patients can consult doctors via video calls, share medical history and receive prescriptions.',
    tags: ['HEALTHTECH'], votes: 95, saves: 10, price: 'expensive', rating: 5,
    thumbnail: null,
    author: { name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/150?img=60' },
    time: '5 hours ago', isOwned: false, isSaved: false, comments: []
  },
];

export const IdeasContext = createContext();

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIdeas = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/ideas');
      const mappedIdeas = data.ideas.map(idea => ({
        id: idea._id,
        title: idea.title,
        description: idea.description,
        summary: idea.summary || '',
        vision: idea.vision || '',
        tags: idea.tags || [],
        votes: idea.upvotes - idea.downvotes,
        saves: idea.saves || 0,
        price: idea.price || 'cheap',
        rating: idea.averageRating || 3,
        thumbnail: idea.thumbnail ? `http://localhost:5000${idea.thumbnail}` : null,
        author: {
          name: idea.createdBy?.name || 'Anonymous',
          avatar: idea.createdBy?.avatar || 'https://i.pravatar.cc/150?img=1'
        },
        time: new Date(idea.createdAt).toLocaleDateString(),
        isOwned: false,
        isSaved: false,
        comments: []
      }));
      // If DB has real ideas, use them; otherwise fall back to seed data
      setIdeas(mappedIdeas.length > 0 ? mappedIdeas : SEED_IDEAS);
    } catch (err) {
      console.error('Error fetching ideas, using seed data:', err);
      setIdeas(SEED_IDEAS); // always show something even if backend is down
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const addIdea = async (newIdeaFormData) => {
    try {
      const { data } = await api.post('/ideas', newIdeaFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh list
      fetchIdeas();
      return data;
    } catch (err) {
      console.error('Error adding idea:', err);
      throw err;
    }
  };

  const deleteIdea = async (id) => {
    try {
      await api.delete(`/ideas/${id}`);
      setIdeas(prev => prev.filter(idea => idea.id !== id));
    } catch (err) {
      console.error('Error deleting idea:', err);
    }
  };

  const saveIdea = async (id) => {
    // Optimistic local update first (works for both seed & DB ideas)
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) {
        const nowSaved = !idea.isSaved;
        return { ...idea, isSaved: nowSaved, saves: nowSaved ? idea.saves + 1 : idea.saves - 1 };
      }
      return idea;
    }));
    // If it's a real DB id (not a seed), also call the backend
    if (!id.startsWith('seed-')) {
      try { await api.post(`/ideas/${id}/save`); } catch (err) { console.error(err); }
    }
  };

  const upvoteIdea = async (id) => {
    // Optimistic update
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) return { ...idea, votes: idea.votes + 1 };
      return idea;
    }));
    if (!id.startsWith('seed-')) {
      try { await api.post(`/ideas/${id}/upvote`); } catch (err) { console.error(err); }
    }
  };

  const downvoteIdea = async (id) => {
    // Optimistic update
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) return { ...idea, votes: Math.max(0, idea.votes - 1) };
      return idea;
    }));
    if (!id.startsWith('seed-')) {
      try { await api.post(`/ideas/${id}/downvote`); } catch (err) { console.error(err); }
    }
  };

  // Comments are now better handled where they are viewed (CommentSection)
  // But we'll leave stubs if the rest of the app relies on them specifically in context
  const addComment = async (ideaId, commentText) => {
    try {
      await api.post('/comments', { ideaId, text: commentText });
      // Usually you'd fetch comments in the component that renders them
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const likeComment = async (ideaId, commentId) => {
    try {
      await api.post(`/comments/${commentId}/like`);
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  // Reply isn't perfectly mapped in backend yet but acts as a stub
  const addReply = async () => {};

  return (
    <IdeasContext.Provider value={{
      ideas, loading, fetchIdeas, addIdea, deleteIdea, saveIdea,
      upvoteIdea, downvoteIdea, addComment, likeComment, addReply
    }}>
      {children}
    </IdeasContext.Provider>
  );
}



