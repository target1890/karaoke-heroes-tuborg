import { useState, useEffect } from "react";
import Home from "@/components/Home";
import MainMenu from "@/components/MainMenu";
import CategorySelector from "@/components/CategorySelector";
import SongList from "@/components/SongList";
import VideoPlayer from "@/components/VideoPlayer";
import PointsForm from "@/components/PointsForm";
import Classifica from "@/components/Classifica";
import CantaConTuborg from "@/components/CantaConTuborg";
import StaffettaMode from "@/components/StaffettaMode";
import StaffettaSongPopup from "@/components/StaffettaSongPopup";
import classicData from "@/data/classic.json";
import freshData from "@/data/fresh.json";

type Screen = 
  | "home" 
  | "menu" 
  | "karaoke-category" 
  | "karaoke-list" 
  | "staffetta-category" 
  | "staffetta-list"
  | "canta"
  | "classifica";

type Category = "classic" | "fresh";

interface Song {
  title: string;
  artist: string;
  url: string;
}

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentMode, setCurrentMode] = useState<"karaokissimo" | "staffetta" | "canta" | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showPointsForm, setShowPointsForm] = useState(false);
  const [classicScore, setClassicScore] = useState(() => {
    const saved = localStorage.getItem("classicScore");
    return saved ? parseInt(saved) : 0;
  });
  const [freshScore, setFreshScore] = useState(() => {
    const saved = localStorage.getItem("freshScore");
    return saved ? parseInt(saved) : 0;
  });
  const [selectedStaffettaSong, setSelectedStaffettaSong] = useState<Song | null>(null);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [playedSongs, setPlayedSongs] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("playedSongs");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("classicScore", classicScore.toString());
  }, [classicScore]);

  useEffect(() => {
    localStorage.setItem("freshScore", freshScore.toString());
  }, [freshScore]);

  useEffect(() => {
    localStorage.setItem("playedSongs", JSON.stringify(Array.from(playedSongs)));
  }, [playedSongs]);

  const getSongs = (category: Category): Song[] => {
    return category === "classic" ? classicData.CLASSIC : freshData.FRESH;
  };

  const handleSelectMode = (mode: "karaokissimo" | "staffetta" | "canta") => {
    setCurrentMode(mode);
    if (mode === "karaokissimo") {
      setScreen("karaoke-category");
    } else if (mode === "staffetta") {
      setScreen("staffetta-category");
    } else {
      setScreen("canta");
    }
  };

  const handleSelectCategory = (category: Category) => {
    setCurrentCategory(category);
    if (currentMode === "karaokissimo") {
      setScreen("karaoke-list");
    } else if (currentMode === "staffetta") {
      setScreen("staffetta-list");
    }
  };

  const handleSelectSong = (song: Song) => {
    const songId = `${song.title}-${song.artist}`;
    setCurrentSongId(songId);
    
    if (currentMode === "karaokissimo") {
      setSelectedVideo(song.url);
    } else if (currentMode === "staffetta") {
      setSelectedStaffettaSong(song);
    }
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setShowPointsForm(true);
  };

  const handleSubmitPoints = (points: number) => {
    if (currentCategory === "classic") {
      setClassicScore((prev) => prev + points);
    } else if (currentCategory === "fresh") {
      setFreshScore((prev) => prev + points);
    }
    
    // Aggiungi la canzone a playedSongs solo quando i punti vengono confermati
    if (currentSongId) {
      setPlayedSongs(prev => new Set(prev).add(currentSongId));
      setCurrentSongId(null);
    }
    
    setShowPointsForm(false);
  };

  const handleAddPoints = () => {
    setShowPointsForm(true);
  };

  const handleAddPointsForCategory = (category: Category) => {
    setCurrentCategory(category);
    setShowPointsForm(true);
  };

  const handleResetScores = () => {
    setClassicScore(0);
    setFreshScore(0);
    setPlayedSongs(new Set());
    localStorage.removeItem("classicScore");
    localStorage.removeItem("freshScore");
    localStorage.removeItem("playedSongs");
  };

  return (
    <>
      {screen === "home" && <Home onEnter={() => setScreen("menu")} />}
      
      {screen === "menu" && (
        <MainMenu 
          onSelectMode={handleSelectMode} 
          onShowClassifica={() => setScreen("classifica")}
        />
      )}

      {screen === "karaoke-category" && (
        <CategorySelector
          onSelectCategory={handleSelectCategory}
          onBack={() => setScreen("menu")}
          onShowClassifica={() => setScreen("classifica")}
          title="Karaokissimo"
        />
      )}

      {screen === "karaoke-list" && currentCategory && (
        <SongList
          songs={getSongs(currentCategory)}
          category={currentCategory}
          onSelectSong={handleSelectSong}
          onBack={() => setScreen("karaoke-category")}
          onShowClassifica={() => setScreen("classifica")}
          playedSongs={playedSongs}
        />
      )}

      {screen === "staffetta-category" && (
        <CategorySelector
          onSelectCategory={handleSelectCategory}
          onBack={() => setScreen("menu")}
          onShowClassifica={() => setScreen("classifica")}
          title="Staffetta Karaoke"
        />
      )}

      {screen === "staffetta-list" && currentCategory && (
        <StaffettaMode
          songs={getSongs(currentCategory)}
          category={currentCategory}
          onSelectSong={handleSelectSong}
          onBack={() => setScreen("staffetta-category")}
          onShowClassifica={() => setScreen("classifica")}
          onAddPoints={handleAddPoints}
          playedSongs={playedSongs}
        />
      )}

      {screen === "canta" && (
        <CantaConTuborg
          onBack={() => setScreen("menu")}
          onShowClassifica={() => setScreen("classifica")}
          onAddPointsClassic={() => handleAddPointsForCategory("classic")}
          onAddPointsFresh={() => handleAddPointsForCategory("fresh")}
        />
      )}

      {screen === "classifica" && (
        <Classifica
          classicScore={classicScore}
          freshScore={freshScore}
          onBack={() => setScreen("menu")}
          onReset={handleResetScores}
          onAddPointsClassic={() => handleAddPointsForCategory("classic")}
          onAddPointsFresh={() => handleAddPointsForCategory("fresh")}
        />
      )}

      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo}
          onClose={handleCloseVideo}
        />
      )}

      {showPointsForm && currentCategory && (
        <PointsForm
          category={currentCategory}
          onSubmit={handleSubmitPoints}
          onClose={() => {
            setShowPointsForm(false);
            setCurrentSongId(null);
          }}
        />
      )}

      {selectedStaffettaSong && currentCategory && (
        <StaffettaSongPopup
          song={selectedStaffettaSong}
          category={currentCategory}
          onClose={() => setSelectedStaffettaSong(null)}
          onAddPoints={() => {
            setSelectedStaffettaSong(null);
            setShowPointsForm(true);
          }}
        />
      )}
    </>
  );
};

export default Index;
