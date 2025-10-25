'use client'  // NEW! Add this FIRST (component has onClick)
// src/components/Header/Header.tsx
import React from 'react';

/**
 * Application header with title and navigation elements
 * @param {Object} props - Component props
 * @param {string} props.title - Main application title to display in header
 * @param {string} props.subtitle - Optional subtitle or tagline for additional context
 */
interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg mb-8 flex justify-between items-center w-full px-5 py-6 rounded-xl ">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2 text-white opacity-90 text-blue-100">{title}</h1>
        {subtitle && <p className="text-base m-0 ">{subtitle}</p>}
      </div>
      <nav className="flex gap-3 flex-wrap">
        <button className="bg-white/20 border-white/40">Dashboard</button>
        <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200">Analytics</button>
        <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200">Settings</button>
      </nav>
    </header>
  );
};

export default Header;