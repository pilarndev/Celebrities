// My components
import { MyText } from "./MyText";
import { MyButton } from "./MyButton";

// Confetti
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

// Other confetti
// import ConfettiExplosion from 'react-confetti-explosion';

export function Final(props: {
  points: number;
  totalMax: number;
  gameEnded: (ended: boolean) => void;
}) {
  function startGame() {
    props.gameEnded(false);
  }
  const { width, height } = useWindowSize();

  return (
    <>
      {/* <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={1600}/> */}
      <MyText text="Game ended"/>
      <span className="text-lg uppercase">
        Score: {props.points} / {props.totalMax}
      </span>
      <MyButton text="Play again" onClick={startGame} />
      {props.points === props.totalMax && <Confetti width={width} height={height}  />}
    </>
  );
}
