import Button from "../Button";

const CalendarToolbar = (props) => {
  const { onNavigate, label } = props;
  return (
    <div className="flex justify-between px-[20px] py-[10px]">
      <div className="flex items-center text-3xl font-bold">
        <span>{label.slice(0, label.indexOf(" "))}</span>
        <span className="font-normal ml-[5px]">
          {label.slice(label.indexOf(" "))}
        </span>
      </div>
      <div className="flex items-center">
        <Button onClick={() => onNavigate("PREV")}>
          <img className="transform rotate-180" src="arrow-right-grey.svg" />
        </Button>
        <Button className="px-[20px]" onClick={() => onNavigate("TODAY")}>
          Today
        </Button>
        <Button onClick={() => onNavigate("NEXT")}>
          <img src="arrow-right-grey.svg" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
