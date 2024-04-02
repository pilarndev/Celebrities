// My components
import { MyText } from "./MyText";
import { MyButton } from "./MyButton";

export function Categories(props: { selectCategory: (category: string) => void }) {
  const selectedCategory = () => {
    props.selectCategory("Singers");
  };

  return (
    <>
      <MyText text="Choose a category"></MyText>
      <MyButton text="Singers" onClick={selectedCategory} />
      <MyButton text="Actors/Actress" onClick={selectedCategory} disabled={true} />
      <MyButton text="Influencers" onClick={selectedCategory} disabled={true} />
    </>
  );
}
