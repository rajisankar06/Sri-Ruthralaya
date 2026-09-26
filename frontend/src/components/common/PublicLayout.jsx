import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingChatbot from '../chatbot/FloatingChatbot';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] text-white selection:bg-[#d4af37]/30 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {/* Floating AI Chatbot on every public page */}
      <FloatingChatbot />
    </div>
  );
}
