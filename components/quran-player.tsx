'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const QURAN_URL = 'https://server10.mp3quran.net/akdr/001.mp3';

export default function QuranPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(QURAN_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const tryAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.muted = true;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    const handleInteraction = () => {
      if (audioRef.current && isPlaying && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    };

    tryAutoplay();
    document.addEventListener('click', handleInteraction, { once: true });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = isMuted;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  function toggleMute() {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }

  if (!showPlayer && !isPlaying) {
    return (
      <button
        onClick={() => { setShowPlayer(true); togglePlay(); }}
        className="fixed bottom-24 left-4 z-50 w-12 h-12 rounded-full bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-black flex items-center justify-center shadow-lg transition-all"
        title="تشغيل القرآن"
      >
        <Play className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 left-4 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-lg border border-[#D4AF37]/30 rounded-full px-4 py-2 shadow-lg">
      <button onClick={togglePlay} className="text-[#D4AF37] hover:text-[#c5a233] transition-colors">
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <button onClick={toggleMute} className="text-[#D4AF37] hover:text-[#c5a233] transition-colors">
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      <span className="text-xs text-gray-400 whitespace-nowrap">الفاتحة</span>
    </div>
  );
}
