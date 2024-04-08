import { useState } from "react";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

// My components
import { MyText } from "./MyText";
import { Celebrity, AnswerCelebrity } from "./Celebrity";

export function Celebrities(props: {
  updatePoints: (points: number, total: number) => void;
  gameEnded: (ended: boolean) => void;
  category: string;
}) {
  const answerCelebrity: AnswerCelebrity = {
    isCorrect: false,
    numTriesRemains: 3,
    points: 0,
  };

  // Celebrity answers
  const [celebrities, setCelebrities] = useState([
    { id: 1, image: "1.png", correctAnswer: "amy winehouse", answer: { ...answerCelebrity } },
    { id: 2, image: "2.png", correctAnswer: "c tangana", answer: { ...answerCelebrity } },
    { id: 3, image: "3.png", correctAnswer: "yung beef", answer: { ...answerCelebrity } },
    { id: 4, image: "4.png", correctAnswer: "bad gyal", answer: { ...answerCelebrity } },
    { id: 5, image: "5.png", correctAnswer: "becky g", answer: { ...answerCelebrity } },

    { id: 6, image: "6.png", correctAnswer: "brisa fenoy", answer: { ...answerCelebrity } },
    { id: 7, image: "7.png", correctAnswer: "bejo", answer: { ...answerCelebrity } },
    { id: 8, image: "8.png", correctAnswer: "elton john", answer: { ...answerCelebrity } },
    { id: 9, image: "9.png", correctAnswer: "elvis presley", answer: { ...answerCelebrity } },
    { id: 10, image: "10.png", correctAnswer: "michael jackson", answer: { ...answerCelebrity } },

    { id: 11, image: "11.png", correctAnswer: "bob marley", answer: { ...answerCelebrity } },
    { id: 12, image: "12.png", correctAnswer: "jimi hendrix", answer: { ...answerCelebrity } },
    { id: 13, image: "13.png", correctAnswer: "ray charles", answer: { ...answerCelebrity } },
    { id: 14, image: "14.png", correctAnswer: "loquillo", answer: { ...answerCelebrity } },
    { id: 15, image: "15.png", correctAnswer: "gorillaz", answer: { ...answerCelebrity } },
  ]);

  // Game Points
  const gamePoints = [
    { numTriesRemains: 2, points: 5 },
    { numTriesRemains: 1, points: 2 },
    { numTriesRemains: 0, points: 1 },
  ];
  const totalMaxPoints = celebrities.length * 5;

  // useState
  const [points, setPoints] = useState(0);

  // Functions
  const isAllAnswered = (id: number, answer: AnswerCelebrity) => {
    const celebrity = celebrities.find((celebrity) => celebrity.id === id);
    if (!celebrity) {
      return;
    }

    celebrity.answer.isCorrect = answer.isCorrect;
    celebrity.answer.numTriesRemains = answer.numTriesRemains;
    celebrity.answer.points = answer.points;

    setCelebrities(celebrities);

    // update total points with celebrity points
    //if (celebrity.answer.points > 0) {
    const newPoints = points + answer.points;
    setPoints(newPoints);
    //}

    // check if game is finished
    if (
      celebrities.every(
        (celebrity) => celebrity.answer.isCorrect || celebrity.answer.numTriesRemains === 0
      )
    ) {
      props.updatePoints(points, totalMaxPoints);
      props.gameEnded(true);
    }
  };

  return (
    <>
      <MyText text={props.category} />
      <Swiper
        navigation={true}
        pagination={{
          type: "fraction",
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper">
        {celebrities.map((celebrity) => (
          <SwiperSlide key={celebrity.id} data-key={celebrity.id}>
            <Celebrity
              id={celebrity.id}
              image={`/${celebrity.image}`}
              correctAnswer={celebrity.correctAnswer}
              onAnswered={isAllAnswered}
              gamePoints={gamePoints}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
