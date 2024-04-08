import "./App.css";
import { useState } from "react";

// import my components
import { Start } from "./components/Start";
import { Final } from "./components/Final";
import { Categories } from "./components/Categories";
import { Celebrities } from "./components/Celebrities";

function App() {
  const [isGameEnded, setGameEnded] = useState(false);
  const [isGameStart, setGameStart] = useState(false);
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState(0);
  const [totalMax, setTotal] = useState(0);

  const handleStartGame = (start: boolean) => {
    setGameStart(start);
  };

  const handleGameEnded = (ended: boolean) => {
    setGameEnded(ended);
  };

  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };

  const updatePoints = (points: number, totalMax: number) => {
    setPoints(points);
    setTotal (totalMax)
  };

  return (
    <div className="container bg-white p-8 text-center shadow-2xl shadow-purple">
      {isGameEnded ? (
        <Final points={points} totalMax={totalMax} gameEnded={handleGameEnded} />
      ) : category ? (
        <Celebrities updatePoints={updatePoints} gameEnded={handleGameEnded} category={category} />
      ) : isGameStart ? (
        <Categories selectCategory={handleCategorySelect} />
      ) : (
        <Start startGame={handleStartGame} />
      )}
    </div>
  );
}
export default App;
