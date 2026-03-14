import React, { createContext, useState } from 'react';

const defaultIdeas = [
  {
    id: '1',
    title: 'Neural-Recruiter',
    description: 'An AI-driven platform that conducts technical interviews via voice and rates candidates based on problem-solving speed and logic.',
    tags: ['AI', 'SAAS'],
    votes: 1240,
    price: 'expensive',
    rating: 5,
    author: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=1' },
    time: '2 hours ago',
    isOwned: false,
  },
  {
    id: '2',
    title: 'NanoPay APIs',
    description: 'Micro-transaction infrastructure for IoT devices to pay each other for data usage without high gas fees or network lag.',
    tags: ['FINTECH'],
    votes: 856,
    price: 'cheap',
    rating: 4,
    author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: '5 hours ago',
    isOwned: false,
  },
  {
    id: '3',
    title: 'SkillSwap VR',
    description: 'A VR environment where experts can guide novices through physical tasks like engine repair in real-time holographic sync.',
    tags: ['EDTECH'],
    votes: 432,
    price: 'cheap',
    rating: 3,
    author: { name: 'Marcus Thorne', avatar: 'https://i.pravatar.cc/150?img=11' },
    time: 'Yesterday',
    isOwned: false,
  },
  {
    id: '4',
    title: 'CarbonFlow',
    description: 'Real-time supply chain emission tracking for SMEs with AI-driven Scope 3 reporting and automatic ERP integration.',
    tags: ['AI', 'SAAS'],
    votes: 1100,
    price: 'expensive',
    rating: 5,
    author: { name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=47' },
    time: '1 day ago',
    isOwned: false,
  },
  {
    id: '5',
    title: 'SleepSync',
    description: "Mobile app using the phone's accelerometer to monitor breathing and play adaptive soundscapes that guide users into deep sleep.",
    tags: ['AI'],
    votes: 612,
    price: 'cheap',
    rating: 4,
    author: { name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?img=32' },
    time: '2 days ago',
    isOwned: false,
  },
  {
    id: '6',
    title: 'LegalWrap',
    description: 'Professional-grade legal document generator for startups and freelancers. NDA, ToS, and privacy policy in seconds.',
    tags: ['SAAS'],
    votes: 744,
    price: 'expensive',
    rating: 4,
    author: { name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/150?img=60' },
    time: '3 days ago',
    isOwned: false,
  },
];

export const IdeasContext = createContext();

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState(defaultIdeas);

  const addIdea = (newIdea) => {
    setIdeas(prev => [newIdea, ...prev]);
  };

  const deleteIdea = (id) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  return (
    <IdeasContext.Provider value={{ ideas, addIdea, deleteIdea }}>
      {children}
    </IdeasContext.Provider>
  );
}
