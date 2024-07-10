'use client';
import { useSelector } from 'react-redux';
import MusicPlayer from '@/components/MusicPlayer';

export default function ClientSideWrapper() {
    const activeSong = useSelector((state) => state.player.activeSong);
  
    return activeSong?.title ? (
      <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
        <MusicPlayer />
      </div>
    ) : null;
  }
