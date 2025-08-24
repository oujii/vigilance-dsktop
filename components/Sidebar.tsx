'use client';

import { useAppStore } from '@/lib/store';

export default function Sidebar() {
  const { power, setPower } = useAppStore();

  const handleLogout = () => {
    // Logout action triggers power off
    setPower('OFF');
  };

  const handlePowerToggle = () => {
    const newPower = power === 'ON' ? 'OFF' : 'ON';
    setPower(newPower);
  };

  const navigationLinks = [
    {
      name: 'Home',
      icon: (
        <img src="/homename.png" alt="Home" className="h-5 w-5" />
      ),
      active: true,
    },
    {
      name: 'Live Feed',
      icon: (
        <img src="/mage_dashboard-fill.png" alt="Live Feed" className="h-5 w-5" />
      ),
      active: false,
    },
    {
      name: 'Access',
      icon: (
        <img src="/bxs_user.png" alt="Access" className="h-5 w-5" />
      ),
      active: false,
    },
    {
      name: 'System',
      icon: (
        <img src="/mdi_cog.png" alt="System" className="h-5 w-5" />
      ),
      active: false,
    },
  ];

  return (
    <aside className="w-64 bg-[#1D2939] p-6 flex flex-col">
      {/* Logo section removed - now in TopBar */}

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2">
        {navigationLinks.map((link) => (
          <a
            key={link.name}
            href="#"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              link.active
                ? 'text-white bg-blue-500/20'
                : 'text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            {link.icon}
            <span className={link.active ? 'font-semibold' : ''}>{link.name}</span>
          </a>
        ))}
      </nav>

      {/* Power Control Section */}
      <div className="mt-8 p-4 bg-gray-700/30 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">System Control</h3>
        <button
          onClick={handlePowerToggle}
          className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
            power === 'ON'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Power: {power}
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Toggle to control all display windows
        </p>
      </div>

    </aside>
  );
}