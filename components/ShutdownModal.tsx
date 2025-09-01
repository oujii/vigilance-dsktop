'use client';

interface ShutdownModalProps {
  isOpen: boolean;
  onShutdown: () => void;
  onLogout: () => void;
  onRestart: () => void;
  onCancel: () => void;
}

export default function ShutdownModal({ 
  isOpen, 
  onShutdown, 
  onLogout, 
  onRestart, 
  onCancel 
}: ShutdownModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#1D2939] border border-gray-600 rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">System Control</h2>
        
        <div className="space-y-4">
          {/* Shutdown Button */}
          <button
            onClick={onShutdown}
            className="w-full flex items-center space-x-4 p-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-white transition-colors"
          >
            <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold">Shut Down</div>
              <div className="text-sm text-gray-300">Turn off the surveillance system</div>
            </div>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-4 p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-white transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold">Logout</div>
              <div className="text-sm text-gray-300">Sign out current user session</div>
            </div>
          </button>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            className="w-full flex items-center space-x-4 p-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-white transition-colors"
          >
            <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold">Restart</div>
              <div className="text-sm text-gray-300">Restart the surveillance system</div>
            </div>
          </button>
        </div>

        {/* Cancel Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600/50 hover:bg-gray-600/70 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}