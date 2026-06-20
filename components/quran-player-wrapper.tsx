'use client';

import dynamic from 'next/dynamic';

const QuranPlayer = dynamic(() => import('@/components/quran-player'), { ssr: false });

export default function QuranPlayerWrapper() {
  return <QuranPlayer />;
}
