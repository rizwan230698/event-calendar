import moment from "moment";
import { getLegendCode } from "../utils";
import { Rating } from "react-simple-star-rating";
import { truncate } from "lodash";
import { useState } from "react";

const EventCard = ({ event }) => {
  const [expand, setExpand] = useState(false);

  //One image coming from backend is not valid url so replacing it
  const isImageInValid =
    event.media[0].mediaurl ===
    "https://ik.imagekit.io/ojdx405rcr7/prod/54e0e04d-1672-48ff-9587-edda88c98bee_d73fa59a-e94a-4e3c-a7da-59bd1de2c0ba_E7ltHuxdl";

  return (
    <div className="min-w-[65%] md:w-[260px] bg-white m-auto border border-gray-300">
      <div className="relative h-0 pb-4/3">
        <img
          src={
            !isImageInValid
              ? event?.media[0]?.mediaurl
              : "https://images.unsplash.com/photo-1638043008244-b2b8ca402834?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80"
          }
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="py-[10px] px-[8px] pb-[20px]">
        <div className="flex justify-between items-center pb-[10px]">
          <div className="flex space-x-2">
            {event?.typeofday?.map((item, i) => {
              const legend = getLegendCode(item);
              return (
                i < 3 && (
                  <div
                    key={i}
                    style={{ backgroundColor: legend.color }}
                    className="flex justify-center items-center rounded-full h-[28px] w-[28px] text-sm"
                  >
                    {legend.code}
                  </div>
                )
              );
            })}
          </div>
          <Rating ratingValue={event.rating} fillColor="#9BD2F2" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium mb-[5px]">
            {moment(event.calendardatetime).format("Do MMM YYYY")}
          </p>
          <p className="text-xs text-graybody">
            {event.text.length > 150 && !expand
              ? truncate(event.text, {
                  length: 150,
                  separator: /,? +/,
                })
              : event.text}

            {event.text.length > 150 && (
              <span
                className="font-medium cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpand((prev) => !prev);
                }}
              >
                {expand ? "(less)" : "(more)"}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
