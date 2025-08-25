'use client';

import { useAppStore } from '@/lib/store';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import Sidebar from '@/components/Sidebar';
import SurveillanceGrid from '@/components/SurveillanceGrid';
import TopBar from '@/components/TopBar';
import RestartScreen from '@/components/RestartScreen';

export default function ControlPage() {
  const { power, surveillanceCameras, setPower } = useAppStore();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  // Get cameras for this display's surveillance grid (exactly like DisplayWindow)
  const controlCameraIds = surveillanceCameras['control'] || ['1', '2', '3', '4', '5', '6'];

  // Same camera data structure as DisplayWindow - matches the global allCameras
  const allCameras = [
    { id: '1', name: 'CAM 01', location: 'Kök', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '2', name: 'CAM 02', location: 'Vardagsrum 1', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '3', name: 'CAM 03', location: 'Vardagsrum 2', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '4', name: 'CAM 04', location: 'Master Bedroom', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '5', name: 'CAM 05', location: 'Kontor', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '6', name: 'CAM 06', location: 'Gästrum', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '7', name: 'CAM 07', location: 'Klädkammare', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '8', name: 'CAM 08', location: 'Trappa', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '9', name: 'CAM 09', location: 'Hall', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '10', name: 'CAM 10', location: 'Garage', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '11', name: 'CAM 11', location: 'Brygga', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '12', name: 'CAM 12', location: 'Terass', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '13', name: 'CAM 13', location: 'Kök 2', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
  ];

  // Filter cameras for this display (exactly like DisplayWindow)
  const controlCameras = allCameras.filter(camera => 
    controlCameraIds.includes(camera.id)
  );

  const handleRestart = () => {
    setPower('ON');
  };

  // Show restart screen when system is off
  if (power === 'OFF') {
    return <RestartScreen onRestart={handleRestart} />;
  }

  return (
    <div className="bg-[#101828] text-white min-h-screen flex flex-col">
      {/* Top Bar */}
      <TopBar 
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