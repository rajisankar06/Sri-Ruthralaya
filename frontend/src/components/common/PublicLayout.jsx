import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingChatbot from '../chatbot/FloatingChatbot';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-temple-cream selection:bg-temple-gold/30 selection:text-temple-maroon">
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
