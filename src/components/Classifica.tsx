import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft } from "lucide-react";
import sfondo from "@/assets/sfondo.jpg";

interface ClassificaProps {
  classicScore: number;
  freshScore: number;
  onBack: () => void;
  onReset: () => void;
  onAddPointsClassic: () => void;
  onAddPointsFresh: () => void;
}

const Classifica = ({ classicScore, freshScore, onBack, onReset, onAddPointsClassic, onAddPointsFresh }: ClassificaProps) => {
  const totalClassic = classicScore;
  const totalFresh = freshScore;
  const winner = totalClassic > totalFresh ? "classic" : totalFresh > totalClassic ? "fresh" : "tie";

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative p-8"
      style={{ backgroundImage: `url(${sfondo})` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      
      <Button
        onClick={onBack}
        className="absolute top-8 left-8 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white"
      >
        <ArrowLeft className="mr-2" /> Indietro
      </Button>

      <div className="relative z-10 w-full max-w-4xl animate-fade-in">
        <h1 className="text-6xl font-black text-white text-center mb-12 uppercase" style={{ textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00' }}>
          📊 Classifica
        </h1>

        <div className="space-y-6">
          <div 
            className={`rounded-2xl p-8 shadow-2xl border-4 transition-all overflow-hidden ${
              winner === "classic" 
                ? "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-500 scale-110 shadow-[0_0_40px_rgba(234,179,8,0.6)]" 
                : "bg-white border-yellow-300 opacity-80"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-wrap">
                {winner === "classic" && <span className="text-6xl animate-bounce">🏆</span>}
                <h2 className={`font-black text-yellow-600 ${winner === "classic" ? "text-5xl" : "text-4xl"}`}>
                  🟡 CLASSIC
                </h2>
                {winner === "classic" && (
                  <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-black text-lg animate-pulse shadow-lg">
                    IN VANTAGGIO
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className={`font-black text-yellow-600 ${winner === "classic" ? "text-7xl" : "text-6xl"}`}>
                  {totalClassic}
                </p>
                <p className="text-xl text-muted-foreground font-bold">punti totali</p>
              </div>
            </div>
          </div>

          <div 
            className={`rounded-2xl p-8 shadow-2xl border-4 transition-all overflow-hidden ${
              winner === "fresh" 
                ? "bg-gradient-to-r from-green-100 to-green-50 border-green-500 scale-110 shadow-[0_0_40px_rgba(34,197,94,0.6)]" 
                : "bg-white border-primary opacity-80"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-wrap">
                {winner === "fresh" && <span className="text-6xl animate-bounce">🏆</span>}
                <h2 className={`font-black text-primary ${winner === "fresh" ? "text-5xl" : "text-4xl"}`}>
                  🟢 FRESH
                </h2>
                {winner === "fresh" && (
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full font-black text-lg animate-pulse shadow-lg">
                    IN VANTAGGIO
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className={`font-black text-primary ${winner === "fresh" ? "text-7xl" : "text-6xl"}`}>
                  {totalFresh}
                </p>
                <p className="text-xl text-muted-foreground font-bold">punti totali</p>
              </div>
            </div>
          </div>

          {winner === "tie" && (
            <div className="text-center text-white text-3xl font-black animate-pulse-glow">
              🤝 PAREGGIO! 🤝
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <Button
              onClick={onAddPointsClassic}
              className="flex-1 text-xl font-black py-8 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105"
            >
              + 🟡 Punti CLASSIC
            </Button>
            <Button
              onClick={onAddPointsFresh}
              className="flex-1 text-xl font-black py-8 bg-green-500 hover:bg-green-600 text-white rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105"
            >
              + 🟢 Punti FRESH
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full mt-4 text-2xl font-black py-8 bg-red-600 hover:bg-red-700 text-white rounded-2xl uppercase tracking-wider shadow-2xl border-4 border-white transition-all hover:scale-105"
              >
                🔄 Reset Punteggi
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-red-50 border-red-200 border-2">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-900">Sei sicuro di voler resettare i punteggi?</AlertDialogTitle>
                <AlertDialogDescription className="text-red-700">
                  Questa azione resetterà tutti i punteggi e le canzoni riprodotte. Non è possibile annullare questa operazione.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-red-300 hover:bg-red-100">Annulla</AlertDialogCancel>
                <AlertDialogAction onClick={onReset} className="bg-red-600 hover:bg-red-700">
                  Conferma Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Classifica;
