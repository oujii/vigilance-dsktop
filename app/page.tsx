'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to control panel immediately
    router.push('/control');
  }, [router]);

  return (
    <div className="bg-[#101828] min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <div className="text-xl font-semibold mb-2">Vigilance Security</div>
        <div className="text-gray-400">Redirecting to control panel...</div>
      </div>
    </div>
  );
}
