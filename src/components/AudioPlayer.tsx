import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause } from "lucide-react";
import { Media } from "@/types/media";

export default function AudioPlayer({ sound }: { sound: Media }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Play / pause toggle
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    // Sync progress
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []);

    // Handle manual seek
    const handleSeek = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = value[0];
        setCurrentTime(value[0]);
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-muted rounded-2xl shadow-md w-full">
            <div className="flex items-center gap-4">
                <Button onClick={togglePlay} variant="outline" size="icon">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <span className="text-sm text-muted-foreground">{sound.title}</span>
            </div>

            <Slider value={[currentTime]} max={duration || 100} step={0.1} onValueChange={handleSeek} className="w-full" />

            <audio ref={audioRef} preload="metadata">
                <source src={sound.content} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}

// Format seconds to mm:ss
function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}
