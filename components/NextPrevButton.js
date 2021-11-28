export const NextPrevButton = ({ direction, propStyles, onButtonClick }) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
      onButtonClick();
    }}
    role="button"
    onKeyDown={(e) => {
      if (e && e.key === "Enter") {
        e.stopPropagation();
        onButtonClick();
      }
    }}
    tabIndex={0}
    className="bg-white border border-gray-300 w-[30px] h-[30px] flex justify-center items-center rounded-full focus:outline-none cursor-pointer hover:border-blacklight"
    style={propStyles}
  >
    <img
      src="arrow-dynamic.svg"
      className={`${direction === "left" ? "transform rotate-180" : ""}`}
      width="6px"
      height="12px"
    />
  </div>
);
