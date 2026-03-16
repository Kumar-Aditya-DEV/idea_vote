import React, { createContext, useState, useEffect } from 'react';

const defaultIdeas = [
  {
    id: '1',
    title: 'Neural-Recruiter',
    description: 'An AI-driven platform that conducts technical interviews via voice and rates candidates based on problem-solving speed and logic. Features include real-time sentiment analysis and automated coding challenges.',
    vision: 'The vision is to reduce recruitment overhead by 80% while providing a bias-free evaluation system for technical talent globally.',
    tags: ['AI', 'SAAS'],
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
    id: '2',
    title: 'NanoPay APIs',
    description: 'Micro-transaction infrastructure for IoT devices to pay each other for data usage without high gas fees or network lag.',
    tags: ['FINTECH'],
    votes: 856,
    saves: 22,
    price: 'cheap',
    rating: 4,
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: '5 hours ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: '3',
    title: 'SkillSwap VR',
    description: 'A VR environment where experts can guide novices through physical tasks like engine repair in real-time holographic sync.',
    tags: ['EDTECH'],
    votes: 432,
    saves: 15,
    price: 'cheap',
    rating: 3,
    author: { name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11' },
    time: 'Yesterday',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: '4',
    title: 'CarbonFlow',
    description: 'Real-time supply chain emission tracking for SMEs with AI-driven Scope 3 reporting and automatic ERP integration.',
    tags: ['AI', 'SAAS'],
    votes: 1100,
    saves: 68,
    price: 'expensive',
    rating: 5,
    author: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=47' },
    time: '1 day ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: '5',
    title: 'SleepSync',
    description: "Mobile app using the phone's accelerometer to monitor breathing and play adaptive soundscapes that guide users into deep sleep.",
    tags: ['AI'],
    votes: 612,
    saves: 34,
    price: 'cheap',
    rating: 4,
    author: { name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?img=32' },
    time: '2 days ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
  {
    id: '6',
    title: 'LegalWrap',
    description: 'Professional-grade legal document generator for startups and freelancers. NDA, ToS, and privacy policy in seconds.',
    tags: ['SAAS'],
    votes: 744,
    saves: 19,
    price: 'expensive',
    rating: 4,
    author: { name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/150?img=60' },
    time: '3 days ago',
    isOwned: false,
    isSaved: false,
    comments: []
  },
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



