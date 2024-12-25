export default function Button(props: {
  label: string;
  click_action: () => void;
}) {
  return (
    <div
      className="border border-gray-700 rounded w-[95%] h-[95%] flex justify-center items-center m-4 active:bg-[#8fcf8a] hover:bg-[#aed2ad] transition-colors"
      onClick={props.click_action}
    >
      {props.label}
    </div>
  );
}
