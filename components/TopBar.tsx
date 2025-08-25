'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import PinModal from './PinModal';

interface TopBarProps {
  cameraCount: number;
}

export default function TopBar({ cameraCount }: TopBarProps) {
  const { setPower } = useAppStore();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showShutdownModal, setShowShutdownModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentTime = new Date().toLocaleTimeString('sv-SE', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const currentDate = new Date().toLocaleDateString('sv-SE');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    setShowUserDropdown(false);
    setShowShutdownModal(true);
  };

  const handleShutdownConfirm = () => {
    setShowShutdownModal(false);
    setPower('OFF');
  };

  return (
    <>
      {/* Top Bar - Header */}
      <div className="bg-[#070F1F] px-4 py-2 flex justify-between items-center shadow-2xl">
        <div className="flex items-center space-x-8">
          {/* VIGILANCE Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => document.documentElement.requestFullscreen()}>
            <img 
              src="/logoi.png" 
              alt="VIGILANCE" 
              className="h-8 w-auto"
              onError={(e) => {
                // Fallback to text if image doesn't exist
                e.currentTarget.style.display = 'none';
                const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextSibling) {
                  nextSibling.style.display = 'block';
                }
              }}
            />
            <span 
              className="text-xl text-gray-400 tracking-widest font-semibold hidden"
              style={{ display: 'none' }}
            >
              VIGILANCE
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500/20 text-white border border-blue-500/30">
              <img src="/ic_baseline-home.png" alt="Home" className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors">
              <img src="/mage_dashboard-fill.png" alt="Live Feed" className="h-4 w-4" />
              <span>Live Feed</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors">
              <img src="/bxs_user.png" alt="Access" className="h-4 w-4" />
              <span>Access</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors">
              <img src="/mdi_cog.png" alt="System" className="h-4 w-4" />
              <span>System</span>
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Online Users Avatars */}
          <div className="flex items-center space-x-2">
            {/* Carl (Online/Active) */}
            <div className="relative">
              <div className="w-10 h-10 bg-gray-600 rounded-full border-3 border-green-500 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">C</span>
              </div>
            </div>
            {/* Adam (Offline) */}
            <div className="relative">
              <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-[#101828] flex items-center justify-center opacity-50">
                <span className="text-sm font-semibold text-gray-300">A</span>
              </div>
            </div>
          </div>

          <button className="p-2 rounded-full hover:bg-gray-700/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 00-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
         
          
          {/* User Dropdown Section */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleUserClick}
              className="flex items-center space-x-3 hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-1">
                <h2 className="text-md font-semibold">CW001 home</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <img src="/homename.png" alt="Home" className="h-6 w-6" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1D2939] border border-gray-600 rounded-lg shadow-xl z-50">
                <div className="py-1">
                  {/* Profile Section */}
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-sm font-medium text-white">CW001 home</p>
                    <p className="text-xs text-gray-400">admin@vigilance.local</p>
                  </div>
                  
                  {/* Menu Items */}
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Help & Support</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Documentation</span>
                  </button>
                  
                  <hr className="border-gray-600 my-1" />
                  
                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shutdown PIN Modal */}
      <PinModal
        isOpen={showShutdownModal}
        type="shutdown"
        onSubmit={handleShutdownConfirm}
        onCancel={() => setShowShutdownModal(false)}
      />

    </>
  );
}