import React, { createContext, useState, useEffect } from 'react';

const defaultIdeas = [
  {
    id: '1',
    title: 'Neural-Recruiter',
    description: 'An AI-driven platform that conducts technical interviews via voice and rates candidates based on problem-solving speed and logic. Features include real-time sentiment analysis and automated coding challenges.',
    vision: 'The vision is to reduce recruitment overhead by 80% while providing a bias-free evaluation system for technical talent globally.',
    tags: ['AI & ML', 'SAAS'],
    votes: 1240,
    saves: 45,
    price: 'expensive',
    rating: 5,
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    time: '2 hours ago',
    isOwned: false,
    isSaved: false,
    comments: [
      { id: 1, author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5', role: 'BUILDER' }, time: '45m ago', text: "This is incredible. Have you considered how it handles different accents?", likes: 12 },
      { id: 2, author: { name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11' }, time: '1h ago', text: "Love the focus on speed. Technical interviewing today is way too slow.", likes: 8 }
    ]
  },
  {
    id: 'trending-1',
    title: 'AI Resume Builder',
    description: 'An AI tool that automatically generates professional resumes based on user skills and experience.',
    tags: ['AI & ML'],
    votes: 120,
    saves: 12,
    price: 'cheap',
    rating: 4,
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: '5 hours ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-2',
    title: 'AI Code Reviewer',
    description: 'A platform that analyzes code using AI and suggests improvements, bug fixes, and optimizations.',
    tags: ['AI & ML'],
    votes: 95,
    saves: 8,
    price: 'expensive',
    rating: 5,
    author: { name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11' },
    time: 'Yesterday',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-3',
    title: 'AI Study Assistant',
    description: 'An AI powered assistant that helps students understand concepts, generate notes, and solve problems.',
    tags: ['AI & ML'],
    votes: 80,
    saves: 15,
    price: 'cheap',
    rating: 3,
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    time: '2 days ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-4',
    title: 'Smart Waste Management',
    description: 'A system that uses IoT and data analytics to optimize waste collection and recycling processes.',
    tags: ['SUSTAINABILITY'],
    votes: 85,
    saves: 9,
    price: 'expensive',
    rating: 4,
    author: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=47' },
    time: '1 day ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-5',
    title: 'Carbon Footprint Tracker',
    description: 'An app that helps individuals track and reduce their daily carbon footprint.',
    tags: ['SUSTAINABILITY'],
    votes: 70,
    saves: 7,
    price: 'cheap',
    rating: 3,
    author: { name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?img=32' },
    time: '2 days ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-6',
    title: 'Eco Delivery Network',
    description: 'A delivery service that uses electric vehicles and optimized routes to reduce pollution.',
    tags: ['SUSTAINABILITY'],
    votes: 60,
    saves: 6,
    price: 'expensive',
    rating: 2,
    author: { name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/150?img=60' },
    time: '3 days ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-7',
    title: 'Smart Budget App',
    description: 'An app that automatically tracks expenses and provides AI based budgeting suggestions.',
    tags: ['FINTECH'],
    votes: 110,
    saves: 12,
    price: 'cheap',
    rating: 5,
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: '4 hours ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-8',
    title: 'Micro Investment Platform',
    description: 'A platform that allows users to invest small amounts of money into diversified portfolios.',
    tags: ['FINTECH'],
    votes: 90,
    saves: 11,
    price: 'expensive',
    rating: 4,
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    time: 'Yesterday',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-9',
    title: 'AI Fraud Detection',
    description: 'A financial security system that uses AI to detect suspicious transactions in real time.',
    tags: ['FINTECH'],
    votes: 100,
    saves: 13,
    price: 'expensive',
    rating: 5,
    author: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=47' },
    time: '2 hours ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-10',
    title: 'AI Symptom Checker',
    description: 'An AI tool that analyzes symptoms and suggests possible health conditions.',
    tags: ['HEALTHTECH'],
    votes: 105,
    saves: 14,
    price: 'cheap',
    rating: 4,
    author: { name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?img=32' },
    time: '1 hour ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-11',
    title: 'Telemedicine Platform',
    description: 'A platform where patients can consult doctors online through video calls.',
    tags: ['HEALTHTECH'],
    votes: 95,
    saves: 10,
    price: 'expensive',
    rating: 5,
    author: { name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/150?img=60' },
    time: '5 hours ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-12',
    title: 'Smart Medicine Reminder',
    description: 'An app that reminds patients to take medicines and track their health routine.',
    tags: ['HEALTHTECH'],
    votes: 75,
    saves: 8,
    price: 'cheap',
    rating: 3,
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: 'Yesterday',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-13',
    title: 'Team Productivity Tracker',
    description: 'A SaaS platform that tracks team productivity and project progress.',
    tags: ['SAAS'],
    votes: 90,
    saves: 11,
    price: 'cheap',
    rating: 4,
    author: { name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11' },
    time: '3 hours ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-14',
    title: 'Automated Invoice Generator',
    description: 'A tool that helps businesses automatically create and manage invoices.',
    tags: ['SAAS'],
    votes: 85,
    saves: 9,
    price: 'expensive',
    rating: 3,
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    time: '10 hours ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: 'trending-15',
    title: 'Customer Feedback Analyzer',
    description: 'A SaaS platform that analyzes customer feedback using AI to improve products.',
    tags: ['SAAS'],
    votes: 80,
    saves: 7,
    price: 'expensive',
    rating: 5,
    author: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=47' },
    time: '1 day ago',
    isOwned: false,
    isSaved: false,
    comments: []
  }

];


export const IdeasContext = createContext();

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState(defaultIdeas);

  const addIdea = (newIdea) => {
    const formattedIdea = {
      ...newIdea,
      id: Date.now().toString(),
      votes: 0,
      saves: 0,
      isSaved: false,
      isOwned: true,
      comments: []
    };
    setIdeas(prev => [formattedIdea, ...prev]);
  };

  const deleteIdea = (id) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  const saveIdea = (id) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) {
        const newIsSaved = !idea.isSaved;
        return { 
          ...idea, 
          isSaved: newIsSaved,
          saves: newIsSaved ? idea.saves + 1 : idea.saves - 1
        };
      }
      return idea;
    }));
  };

  const addComment = (ideaId, commentText, image = null) => {
    const newComment = {
      id: Date.now(),
      author: {
        name: 'Guest User',
        avatar: 'https://i.pravatar.cc/150?u=guest',
        role: 'GUEST'
      },
      time: 'Just now',
      text: commentText,
      image,
      likes: 0
    };

    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          comments: [newComment, ...idea.comments]
        };
      }
      return idea;
    }));
  };

  const likeComment = (ideaId, commentId) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          comments: idea.comments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, likes: comment.likes + 1 };
            }
            return comment;
          })
        };
      }
      return idea;
    }));
  };

  const addReply = (ideaId, commentId, replyText) => {
    const newReply = {
      id: Date.now(),
      author: {
        name: 'Guest User',
        avatar: 'https://i.pravatar.cc/150?u=guest',
        role: 'GUEST'
      },
      time: 'Just now',
      text: replyText
    };

    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          comments: idea.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
              };
            }
            return comment;
          })
        };
      }
      return idea;
    }));
  };

  const upvoteIdea = (id) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) return { ...idea, votes: idea.votes + 1 };
      return idea;
    }));
  };

  const downvoteIdea = (id) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) return { ...idea, votes: Math.max(0, idea.votes - 1) };
      return idea;
    }));
  };

  return (
    <IdeasContext.Provider value={{ 
      ideas, addIdea, deleteIdea, saveIdea, addComment, 
      upvoteIdea, downvoteIdea, likeComment, addReply 
    }}>
      {children}
    </IdeasContext.Provider>
  );
}



