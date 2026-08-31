"use client";

import { useAudio } from "./AudioContext";
import { Play, Pause, X, Music2 } from "lucide-react";
import Image from "next/image";

export default function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, closePlayer } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="absolute bottom-20 left-0 right-0 px-2 z-40 max-w-md md:max-w-none lg:max-w-7xl 2xl:max-w-[1600px] mx-auto">
      <div className="bg-foreground text-background rounded-xl p-3 shadow-lg flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-secondary flex-shrink-0 overflow-hidden flex items-center justify-center relative">
          {currentTrack.coverArt ? (
            <Image src={currentTrack.coverArt} alt={currentTrack.title} fill className="object-cover" />
          ) : (
            <Music2 size={20} className="text-foreground/50" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">{currentTrack.title}</p>
          <p className="text-xs text-background/70 truncate">{currentTrack.artist}</p>
        </div>

        <button 
          onClick={togglePlayPause}
          className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0"
        >
          {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-1" />}
        </button>

        <button 
          onClick={closePlayer}
          className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-background/50 hover:text-background"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
