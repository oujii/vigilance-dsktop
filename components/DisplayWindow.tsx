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

  // Cleanup BroadcastChannel on unmount
  useEffect(() => {
    return () => {
      closeBroadcastChannel();
    };
  }, []);

  // Get cameras for this display's surveillance grid
  const displayCameraIds = surveillanceCameras[displayId] || [];

  // Mock camera data with timestamps for surveillance system (13 cameras total)
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

  // Filter cameras for this display
  const displayCameras = allCameras.filter(camera => 
    displayCameraIds.includes(camera.id)
  );

  const handleRestart = () => {
    setPower('ON');
  };

  // Show restart screen when system is off
  if (power === 'OFF') {
    return <RestartScreen onRestart={handleRestart} />;
  }

  // Show surveillance grid when system is on
  return (
    <SurveillanceGrid 
      cameras={displayCameras}
      gridType="2x2"
      displayId={displayId}
    />
  );
}