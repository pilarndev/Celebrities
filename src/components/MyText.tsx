export function MyText(props: { text: string }) {
  return (
    <span className="text-lg uppercase py-3 block text-yellow">
      {props.text}
    </span>
  );
}
