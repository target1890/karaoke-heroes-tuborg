import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import sfondo from "@/assets/sfondo.jpg";
import tuborgLogo from "@/assets/tuborg-logo.png";
interface CantaConTuborgProps {
  onBack: () => void;
  onShowClassifica: () => void;
  onAddPointsClassic: () => void;
  onAddPointsFresh: () => void;
}
const CantaConTuborg = ({
  onBack,
  onShowClassifica,
  onAddPointsClassic,
  onAddPointsFresh
}: CantaConTuborgProps) => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative p-8" style={{
    backgroundImage: `url(${sfondo})`
  }}>
      <div className="absolute inset-0 bg-black/50" />
      
      <Button onClick={onBack} className="absolute top-8 left-8 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white">
        <ArrowLeft className="mr-2" /> Indietro
      </Button>

      <Button onClick={onShowClassifica} className="absolute top-8 right-8 z-20 bg-[#ae014b] hover:bg-[#c91960] text-white font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white">
        📊 CLASSIFICA
      </Button>

      <div className="relative z-10 flex flex-col items-center gap-12 animate-fade-in">
        <img src={tuborgLogo} alt="Tuborg Logo" className="w-64 h-64 object-contain animate-pulse-glow" />
        
        <div className="bg-gradient-to-r from-green-400 to-green-600 px-16 py-8 rounded-3xl shadow-2xl flex items-center gap-6">
          
          <h1 className="text-6xl font-black text-white text-center uppercase" style={{
          textShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}>
            Canta con Tuborg
          </h1>
        </div>

        <div className="flex gap-8 mt-4">
          <Button onClick={onAddPointsClassic} size="lg" className="text-2xl font-black px-12 py-8 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-110">
            + 🟡 Punti CLASSIC
          </Button>

          <Button onClick={onAddPointsFresh} size="lg" className="text-2xl font-black px-12 py-8 bg-green-500 hover:bg-green-600 text-white rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-110">
            + 🟢 Punti FRESH
          </Button>
        </div>
      </div>
    </div>;
};
export default CantaConTuborg;