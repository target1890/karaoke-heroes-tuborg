import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PointsFormProps {
  category: "classic" | "fresh";
  onSubmit: (points: number) => void;
  onClose: () => void;
}

const PointsForm = ({ category, onSubmit, onClose }: PointsFormProps) => {
  const [points, setPoints] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pointsValue = parseInt(points);
    if (!isNaN(pointsValue) && pointsValue >= 0) {
      onSubmit(pointsValue);
      setPoints("");
    }
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
        <h2 className={`text-3xl font-black text-center mb-6 uppercase ${
          category === "classic" ? "text-yellow-600" : "text-primary"
        }`}>
          Inserisci Punteggio
        </h2>
        
        <p className={`text-center font-bold mb-6 text-xl ${
          category === "classic" ? "text-yellow-700" : "text-secondary"
        }`}>
          Categoria: {category === "classic" ? "🟡 CLASSIC" : "🟢 FRESH"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="number"
            min="0"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Punti (es. 85)"
            className={`text-2xl text-center font-bold py-6 border-4 transition-colors ${
              category === "classic" 
                ? "border-yellow-500 bg-white text-yellow-600 hover:border-yellow-400 hover:bg-yellow-50 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 focus-visible:ring-yellow-500 focus-visible:ring-offset-0" 
                : "border-primary"
            }`}
            autoFocus
          />

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onClose}
              variant="destructive"
              className="flex-1 text-lg font-bold py-6"
            >
              Annulla
            </Button>
            <Button
              type="submit"
              className={`flex-1 text-lg font-bold py-6 ${
                category === "classic" 
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              Conferma
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PointsForm;
