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
    { id: '1', name: 'ADC6-10-M022', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '2', name: 'BDH4-15-S081', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '3', name: 'CDK2-08-X104', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '4', name: 'DFL7-22-Y045', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '5', name: 'EGM9-31-Z067', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '6', name: 'FHN3-17-A129', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '7', name: 'GJP5-26-B088', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '8', name: 'HKQ8-13-C156', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '9', name: 'ILR1-29-D093', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '10', name: 'JMS4-18-E174', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '11', name: 'KNT6-25-F012', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '12', name: 'LOU9-14-G138', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
    { id: '13', name: 'MPV2-33-H076', location: '', videoSrc: '/default-placeholder.mp4', timestamp: '14:32:15' },
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
    <div className="bg-[#101828] text-white h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <TopBar 
        cameraCount={controlCameras.length}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Surveillance Display */}
        <main className="flex-1 min-h-0">
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