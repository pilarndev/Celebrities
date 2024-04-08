import { useState, useEffect, useRef } from "react";

export function Words(props: {
  numWords: Array<number>;
  answer: (answer: string) => void;
  celebrity: number;
}) {
  // useStates
  const [answer, setAnswer] = useState<string[][]>([[]]);
  const [focus, setFocus] = useState({
    celebrity: 1,
    word: 0,
    letter: 0,
  });

  // useEffects
  useEffect(() => {
    props.answer(answer.map((x) => x.join("")).join(""));
  });

  // Input reference management
  const inputRefs = useRef<HTMLInputElement[]>([]);
  useEffect(() => {
    const input = inputRefs.current.filter((_, index) => {
      return index.toString() === focus.celebrity + "" + focus.word + "" + focus.letter;
    });
    input[0] && input[0].focus();
  }, [focus]);

  // Functions
  // Handles the key release event
  function handleKeyUp(wordPosition: number, letterPosition: number) {
    const lastWord = wordPosition === props.numWords.length - 1;
    const lastLetter = letterPosition === props.numWords[wordPosition] - 1;
    const nextWordPosition = lastLetter && !lastWord ? wordPosition + 1 : wordPosition;
    const nextLetterPosition = lastLetter && !lastWord ? 0 : letterPosition + 1;

    setFocus({
      celebrity: props.celebrity,
      word: nextWordPosition,
      letter: nextLetterPosition,
    });
  }

  // Handles the key press event
  function handleKeyDown(wordPosition: number, letterPosition: number) {
    const firstWord = wordPosition === 0;
    const firstLetter = letterPosition === 0;
    const prevWordPosition = firstLetter && !firstWord ? wordPosition - 1 : wordPosition;
    const prevLetterPosition =
      firstLetter && !firstWord ? props.numWords[wordPosition - 1] - 1 : letterPosition - 1;

    setFocus({
      celebrity: props.celebrity,
      word: prevWordPosition,
      letter: prevLetterPosition,
    });
  }

  // Manages the game response
  function handleAnswer(
    event: React.ChangeEvent<HTMLInputElement>,
    word: number,
    position: number
  ) {
    setAnswer((prevAnswer) => {
      const newAnswer = [...prevAnswer];

      if (!newAnswer[word]) {
        newAnswer[word] = [];
      }
      newAnswer[word][position] = event.target.value;

      return newAnswer;
    });
  }

  // Generates the inputs
  function generateInputs(wordPosition: number, numLettersWord: number) {
    return Array.from({ length: numLettersWord }, (_, letterPosition) => (
      <input
        ref={(input) => {
          inputRefs.current[props.celebrity * 100 + wordPosition * 10 + letterPosition] = input!;
        }}
        className="text-center w-[1.1rem] h-9 mx-0.5 bg-gray-100 text-base"
        maxLength={1}
        id={`value${props.celebrity}${wordPosition}${letterPosition}`}
        key={`${wordPosition}${letterPosition}`}
        onKeyDown={(event) => {
          if (event.key === "Backspace") {
            event.currentTarget.value = "";
            handleKeyDown(wordPosition, letterPosition);
          }
          // Clean in case a letter is typed again
          if (event.currentTarget.value.length === 1) {
            event.currentTarget.value = "";
          }
        }}
        onKeyUp={(event) => {
          if (event.currentTarget.value.length === 1) {
            handleKeyUp(wordPosition, letterPosition);
          }
        }}
        onChange={(event) => {
          handleAnswer(event, wordPosition, letterPosition);
        }}></input>
    ));
  }

  return (
    <>
      {props.numWords.map((numLettersWord, wordPosition) => {
        return (
          <span key={wordPosition}>
            {generateInputs(wordPosition, numLettersWord)}
            {wordPosition !== props.numWords.length - 1 && <span className="m-[0.25rem]" />}
          </span>
        );
      })}
    </>
  );
}
