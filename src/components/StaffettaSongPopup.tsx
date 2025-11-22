import { Button } from "@/components/ui/button";

interface Song {
  title: string;
  artist: string;
  url: string;
}

interface StaffettaSongPopupProps {
  song: Song;
  category: "classic" | "fresh";
  onClose: () => void;
  onAddPoints: () => void;
}

const StaffettaSongPopup = ({ song, category, onClose, onAddPoints }: StaffettaSongPopupProps) => {
  const handleOpenLink = () => {
    window.open(song.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 animate-slide-up ${
          category === "classic" ? "border-yellow-500" : "border-primary"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className={`text-4xl font-black text-center mb-6 ${
            category === "classic" ? "text-yellow-600" : "text-primary"
          }`}
        >
          {song.title}
        </h3>

        <p
          className={`text-center font-bold mb-8 text-2xl ${
            category === "classic" ? "text-yellow-700" : "text-primary"
          }`}
        >
          {song.artist}
        </p>

        <div className="flex gap-4 mb-4">
          <Button
            onClick={handleOpenLink}
            className={`flex-1 text-lg font-bold py-6 ${
              category === "classic"
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            🎵 Apri Karaoke
          </Button>
        </div>

        <Button
          onClick={onAddPoints}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold py-6 mb-4"
        >
          + Aggiungi Punti
        </Button>

        <Button onClick={onClose} variant="outline" className="w-full text-lg font-bold py-6 border-2">
          Chiudi
        </Button>
      </div>
    </div>
  );
};

export default StaffettaSongPopup;
