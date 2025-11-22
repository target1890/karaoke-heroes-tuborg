import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayer = ({ videoUrl, onClose }: VideoPlayerProps) => {
  const videoId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <Button
        onClick={onClose}
        className="absolute top-8 right-8 z-50 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full p-3"
      >
        <X size={32} />
      </Button>

      <div 
        className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
