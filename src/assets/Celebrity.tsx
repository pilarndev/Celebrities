import { useState } from "react";

// My components
import { MyButton } from "./MyButton";
import { Words } from "./Words";

export interface AnswerCelebrity {
  isCorrect: boolean;
  numTriesRemains: number;
  points: number;
}

interface CelebrityProps {
  id: number;
  image: string;
  correctAnswer: string;
  onAnswered: (id: number, answer: AnswerCelebrity) => void;
  gamePoints: { numTriesRemains: number; points: number }[];
}

export const Celebrity = (props: CelebrityProps) => {
  // UseStates
  const [result, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [tries, setTries] = useState(3); // The player has 3 tries
  const [isCorrect, setIsCorrect] = useState(false);

  // Functions
  const checkAnswer = (answer: string, correctAnswer: string) => {
    // Decrease number of tries
    const newTries = tries - 1;
    setTries(newTries);

    // Check if answer is ok or ko
    const newAnswer = {
      isCorrect: false,
      numTriesRemains: newTries,
      points: 0,
    };
    // answer ok
    if (answer.split(" ").join("") === correctAnswer.split(" ").join("")) {
      setMessage("correct!!");
      props.onAnswered(props.id, {
        ...newAnswer,
        isCorrect: true,
        points: props.gamePoints.find((p) => p.numTriesRemains === newTries)!.points,
      });
      setIsCorrect(true);
      // answer ko
    } else {
      let message = "";
      newTries === 0
        ? (message = "Sorry, You have no more tries")
        : (message = `try again!!. You have ${newTries} more tries`);
      props.onAnswered(props.id, { ...newAnswer });
      setMessage(message);
    }
  };

  const handleAnswer = (newAnswer: string) => {
    setAnswer(newAnswer);
  };

  // answers
  // console.log(props.id, props.correctAnswer);

  return (
    <>
      <img src={props.image} alt="celebrity image" />
      {tries && !isCorrect ? (
        <Words
          numWords={props.correctAnswer.split(" ").map((x) => x.length)}
          answer={handleAnswer}
          celebrity={props.id}
        />
      ) : null}
      {tries && !isCorrect ? (
        <MyButton text="check" onClick={() => checkAnswer(answer, props.correctAnswer)} />
      ) : null}
      <div className="mb-4">
        <label
          className={`text-sm font-medium ${
            result.includes("correct") ? "text-green-600" : "text-red-600"
          }`}>
          {result}
        </label>
      </div>
    </>
  );
};
