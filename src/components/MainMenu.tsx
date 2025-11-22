import { Button } from "@/components/ui/button";
import sfondo from "@/assets/sfondo.jpg";
interface MainMenuProps {
  onSelectMode: (mode: "karaokissimo" | "staffetta" | "canta") => void;
  onShowClassifica: () => void;
}
const MainMenu = ({
  onSelectMode,
  onShowClassifica
}: MainMenuProps) => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative p-8" style={{
    backgroundImage: `url(${sfondo})`
  }}>
      <div className="absolute inset-0 bg-black/30" />
      
      <Button onClick={onShowClassifica} className="absolute top-8 right-8 z-20 text-white font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white bg-[#ae014b] hover:bg-[#c91960]">
        📊 CLASSIFICA
      </Button>

      <div className="relative z-10 flex flex-col gap-8 w-full max-w-2xl animate-fade-in">
        <Button onClick={() => onSelectMode("karaokissimo")} size="lg" className="text-3xl font-black py-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105">
          🎤 Karaokissimo
        </Button>

        <Button onClick={() => onSelectMode("staffetta")} size="lg" className="text-3xl font-black py-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105">
          🔁 Staffetta Karaoke
        </Button>

        <Button onClick={() => onSelectMode("canta")} size="lg" className="text-3xl font-black py-12 bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105">
          🍺 Canta con Tuborg
        </Button>
      </div>
    </div>;
};
export default MainMenu;