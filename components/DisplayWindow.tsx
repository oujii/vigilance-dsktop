'use client';

import { useEffect } from 'react';
import { useAppStore, closeBroadcastChannel } from '@/lib/store';
import SurveillanceGrid from './SurveillanceGrid';
import RestartScreen from './RestartScreen';

interface DisplayWindowProps {
  displayId: string;
}

export default function DisplayWindow({ displayId }: DisplayWindowProps) {
  const { power, surveillanceCameras, setPower } = useAppStore();

  // Cleanup BroadcastChannel on unmount + F key for fullscreen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      closeBroadcastChannel();
    };
  }, []);

  // Get cameras for this display's surveillance grid
  const displayCameraIds = surveillanceCameras[displayId] || [];

  // Mock camera data with timestamps for surveillance system (13 cameras total)
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

  // Filter cameras for this display
  const displayCameras = allCameras.filter(camera => 
    displayCameraIds.includes(camera.id)
  );

  // Show black screen when system is off
  if (power === 'OFF') {
    return <div className="h-screen bg-black"></div>;
  }

  // Show surveillance grid when system is on
  return (
    <div className="h-screen">
      <SurveillanceGrid 
        cameras={displayCameras}
        gridType="2x2"
        displayId={displayId}
        showTopBar={false}
      />
    </div>
  );
}