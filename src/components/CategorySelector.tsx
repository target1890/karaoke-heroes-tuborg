import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import sfondo from "@/assets/sfondo.jpg";
interface CategorySelectorProps {
  onSelectCategory: (category: "classic" | "fresh") => void;
  onBack: () => void;
  onShowClassifica: () => void;
  title: string;
}
const CategorySelector = ({
  onSelectCategory,
  onBack,
  onShowClassifica,
  title
}: CategorySelectorProps) => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative p-8" style={{
    backgroundImage: `url(${sfondo})`
  }}>
      <div className="absolute inset-0 bg-black/40" />
      
      <Button onClick={onBack} className="absolute top-8 left-8 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white">
        <ArrowLeft className="mr-2" /> Indietro
      </Button>

      <Button onClick={onShowClassifica} className="absolute top-8 right-8 z-20 bg-[#ae014b] hover:bg-[#c91960] text-white font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white">
        📊 CLASSIFICA
      </Button>

      <div className="relative z-10 flex flex-col gap-8 w-full max-w-2xl animate-fade-in">
        <h1 className="text-5xl font-black text-white text-center mb-8 uppercase" style={{
        textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00'
      }}>
          {title}
        </h1>

        <Button onClick={() => onSelectCategory("classic")} size="lg" className="text-3xl font-black py-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105">
          🟡 Classic
        </Button>

        <Button onClick={() => onSelectCategory("fresh")} size="lg" className="text-3xl font-black py-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105">
          🟢 Fresh
        </Button>
      </div>
    </div>;
};
export default CategorySelector;