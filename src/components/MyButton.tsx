export function MyButton(props: { text: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className="bg-lilac-100 h-11 w-full my-4 text-white disabled:bg-lilac-50"
      onClick={props.onClick}
      disabled={props.disabled ?? false}>
      <span className="uppercase"> {props.text}</span>
      {props.disabled && <span className="text-xs block">coming soon...</span>}
    </button>
  );
}
