import { colors } from "../utils";

const Event = ({ event, handleClick }) => (
  <div className="h-full bg-white relative z-10">
    <div
      style={{
        transform: "translateY(-22px)",
      }}
      className="absolute flex space-x-2 pl-[5px] md:pl-[10px]"
    >
      {event.allEventsOnThisDay.map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: colors[i],
          }}
          className="h-[15px] w-[15px] rounded-full event-dot"
        />
      ))}
    </div>
    <img
      onClick={() => handleClick(event.allEventsOnThisDay[0].id)}
      src={event.allEventsOnThisDay[0].media[0].mediaurl}
      className=" h-full w-full"
    />
  </div>
);

export default Event;
