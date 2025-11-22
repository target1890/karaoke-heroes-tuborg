import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import sfondo from "@/assets/sfondo.jpg";

interface Song {
  title: string;
  artist: string;
  url: string;
}

interface SongListProps {
  songs: Song[];
  category: "classic" | "fresh";
  onSelectSong: (song: Song) => void;
  onBack: () => void;
  onShowClassifica: () => void;
  playedSongs: Set<string>;
}

const SongList = ({ songs, category, onSelectSong, onBack, onShowClassifica, playedSongs }: SongListProps) => {
  return (
    <div className="min-h-screen bg-cover bg-center relative p-8" style={{ backgroundImage: `url(${sfondo})` }}>
      <div className="absolute inset-0 bg-black/50" />

      <Button
        onClick={onBack}
        className="absolute top-8 left-8 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white"
      >
        <ArrowLeft className="mr-2" /> Indietro
      </Button>

      <Button
        onClick={onShowClassifica}
        className="absolute top-8 right-8 z-20 bg-[#ae014b] hover:bg-[#c91960] text-white font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white"
      >
        📊 CLASSIFICA
      </Button>

      <div className="relative z-10 pt-28 pb-12 max-w-7xl mx-auto">
        <h1
          className="text-5xl font-black text-white text-center mb-8 uppercase"
          style={{
            textShadow:
              category === "classic"
                ? "0 0 20px #ffff00, 0 0 40px #ffff00, 0 0 60px #ffff00"
                : "0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00",
          }}
        >
          {category === "classic" ? "🟡 Classic" : "🟢 Fresh"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-8">
          {songs.map((song, index) => {
            const songId = `${song.title}-${song.artist}`;
            const isPlayed = playedSongs.has(songId);

            return (
              <Button
                key={index}
                onClick={() => onSelectSong(song)}
                className={`h-auto py-6 px-6 bg-white/90 hover:bg-white text-left flex flex-col items-start gap-2 rounded-xl shadow-lg transition-all hover:scale-105 border-4 ${
                  isPlayed ? "border-red-500" : category === "classic" ? "border-yellow-500" : "border-primary"
                }`}
              >
                <span
                  className={`font-black text-xl ${isPlayed ? "text-red-600" : category === "classic" ? "text-yellow-600" : "text-primary"}`}
                >
                  {song.title}
                </span>
                <span
                  className={`text-sm font-semibold ${isPlayed ? "text-red-700" : category === "classic" ? "text-yellow-700" : "text-secondary"}`}
                >
                  {song.artist}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SongList;
