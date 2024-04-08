// import my components
import { MyButton } from "./MyButton";

export function Start(props: { startGame: (ended: boolean) => void }) {
  const startGame = () => {
    props.startGame(true);
  };
  const signIn = () => {
    // Todo do Server
  };
  return (
    <>
      <div className="text-lg uppercase py-3">
        <span className="block text-lilac-100">Welcome to</span>
        <span className="drop-shadow-lg text-yellow">Who is the celebrity?</span>
      </div>
      <div className="flex">
        <div>
          <img src="/1.png" alt="celebrity1" />
        </div>
        <div>
          <img src="/2.png" alt="celebrity2" />
        </div>
        <div>
          <img src="/3.png" alt="celebrity3" />
        </div>
      </div>
      <MyButton text="Play" onClick={startGame} />
      <MyButton text="Sign in" onClick={signIn} disabled={true} />
    </>
  );
}
