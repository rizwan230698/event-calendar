const colors = ["#F193C8", "#F2948E", "#57C0F9"];

const Event = ({ event }) => {
  const image = event.allEventsOnThisDay[0].media[0].mediaurl;

  return (
    <div className="h-full bg-white relative z-10">
      <div
        style={{
          transform: "translateY(-22px)",
        }}
        className="absolute flex space-x-2 pl-[10px]"
      >
        {event.allEventsOnThisDay.map(
          (_, i) =>
            i < 2 && (
              <div
                key={i}
                style={{
                  backgroundColor: colors[i],
                }}
                className="h-[15px] w-[15px] rounded-full"
              />
            )
        )}
      </div>
      <img src={image} className="h-full w-full" />
    </div>
  );
};

export default Event;
