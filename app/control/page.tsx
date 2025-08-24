'use client';

import { useAppStore } from '@/lib/store';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import Sidebar from '@/components/Sidebar';
import SurveillanceGrid from '@/components/SurveillanceGrid';
import TopBar from '@/components/TopBar';

export default function ControlPage() {
  const { surveillanceCameras, setPower } = useAppStore();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  // Get cameras for control display (6 cameras in 3x2 grid)
  const controlCameraIds = surveillanceCameras['control'] || ['1', '2', '3', '4', '5', '6'];

  // Mock camera data for surveillance system
  const allCameras = [
    { 
      id: '1', 
      name: 'CAM 01',
      location: 'Kök', 
      videoSrc: '/default-placeholder.mp4',
      timestamp: '14:32:15'
    },
    { 
      id: '2', 
      name: 'CAM 02',
      location: 'Vardagsrum 1', 
      videoSrc: '/default-placeholder.mp4',
      timestamp: '14:32:15'
    },
    { 
      id: '3', 
      name: 'CAM 03',
      location: 'Vardagsrum 2', 
      videoSrc: '/default-placeholder.mp4',
      timestamp: '14:32:15'
    },
    { 
      id: '4', 
      name: 'CAM 04',
      location: 'Master Bedroom', 
      videoSrc: '/default-placeholder.mp4',
      timestamp: '14:32:15'
    },
    { 
      id: '5', 
      name: 'CAM 05',
      location: 'Kontor', 
      videoSrc: '/default-placeholder.mp4',
      timestamp: '14:32:15'
    },
    { 
      id: '6', 
      name: 'CAM 06',
      location: 'Gästrum', 
      videoSrc: '/default-placeholder.mp4',
      timestamp: '14:32:15'
    },
  ];

  // Filter cameras for control display
  const controlCameras = allCameras.filter(camera => 
    controlCameraIds.includes(camera.id)
  );

  const handleLogout = () => {
    // Set power OFF to make all screens black, then redirect
    setPower('OFF');
    // Small delay to ensure state propagates, then redirect
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  };

  return (
    <div className="bg-[#101828] text-white min-h-screen flex flex-col">
      {/* Top Bar */}
      <TopBar 
        onLogout={handleLogout}
        cameraCount={controlCameras.length}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Surveillance Display */}
        <main className="flex-1">
          <SurveillanceGrid 
            cameras={controlCameras}
            gridType="3x2"
            displayId="control"
            showTopBar={false}
          />
        </main>
      </div>
    </div>
  );
}