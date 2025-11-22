import { Button } from "@/components/ui/button";
import sfondo from "@/assets/sfondo.jpg";

interface HomeProps {
  onEnter: () => void;
}

const Home = ({ onEnter }: HomeProps) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${sfondo})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <Button
        onClick={onEnter}
        size="lg"
        className="relative z-10 text-3xl font-black px-16 py-8 bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-110"
      >
        Entra
      </Button>
    </div>
  );
};

export default Home;
