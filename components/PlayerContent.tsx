"use client";

import { useEffect, useState, useRef } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill, BsShuffle, BsRepeat, BsRepeat1 } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useSound } from "use-sound";
import usePlayer, { RepeatMode } from "@/hooks/usePlayer";
import { Song } from "@/types";
import { twMerge } from "tailwind-merge";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const [isPlaying, setIsPlaying] = useState(false);  

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = player.volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }
        if (player.repeatMode === RepeatMode.ONE) {
            play();
            return;
        }
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            if (player.repeatMode === RepeatMode.ALL) {
                return player.setId(player.ids[0]);
            }
            return;
        }
        
        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            if (player.repeatMode === RepeatMode.ALL) {
                return player.setId(player.ids[player.ids.length - 1]);
            }
            return;
        }

        player.setId(previousSong);
    }

    const toggleRepeat = () => {
        const modes = [RepeatMode.OFF, RepeatMode.ALL, RepeatMode.ONE];
        const currentIndex = modes.indexOf(player.repeatMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        player.setRepeatMode(modes[nextIndex]);
    }
    
    const [play, { pause, sound }] = useSound(songUrl, {
        volume: player.volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3'],
        preload: true,
        interrupt: true,
    })

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound])
    
    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }

    const toggleMute = () => {
        player.setVolume(player.volume === 0 ? 1 : 0);
    };

    const handleVolumeChange = (value: number) => {
        player.setVolume(value);
    };

    const getRepeatIcon = () => {
        if (player.repeatMode === RepeatMode.ONE) {
            return <BsRepeat1 size={30} className="text-green-500" />;
        }
        return (
            <BsRepeat 
                size={30} 
                className={player.repeatMode === RepeatMode.ALL ? "text-green-500" : "text-neutral-400"}
            />
        );
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            {/** Player Image and Like Button */}
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song?.id}/>
                </div>
            </div>

            {/** Player functionality (Mobile View) */}
            <div className="
                flex
                md:hidden
                col-auto
                w-full
                justify-end
                items-center
                gap-x-4
            ">
                <AiFillStepBackward 
                    onClick={onPlayPrevious} 
                    size={24} 
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
                <div
                    onClick={handlePlay}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon
                        size={30}
                        className="text-black"
                    />
                </div>
                <AiFillStepForward 
                    onClick={onPlayNext} 
                    size={24} 
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>

            {/** Player functionality (Desktop View) */}
            <div className="hidden md:flex w-full h-full justify-center items-center max-w-[722px] gap-x-6">
                <BsShuffle 
                    onClick={player.toggleShuffle}
                    size={30} 
                    className={twMerge(
                        "text-neutral-400 cursor-pointer hover:text-white transition",
                        player.isShuffled && "text-green-500"
                    )}
                />
                <AiFillStepBackward onClick={onPlayPrevious} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
                <AiFillStepForward onClick={onPlayNext} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
                <div onClick={toggleRepeat} className="cursor-pointer">
                    {getRepeatIcon()}
                </div>
            </div>

            {/** Player Volume */}
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon 
                        onClick={toggleMute}
                        size={34} 
                        className="cursor-pointer"/>
                    <Slider 
                        value={player.volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerContent;
