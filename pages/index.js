import React, { useEffect, useState } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import CalendarToolbar from "../components/calendar/Toolbar";
import DateCellWrapper from "../components/calendar/DateCellWrapper";
import Event from "../components/Event";
import { getRequestObject } from "../utils";
import { Carousel } from "../components/Carousel";
import EventCard from "../components/EventCard";

moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [continuationtoken, setContinuationtoken] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [dateRanges, setDateRanges] = useState({ min: "", max: "" });
  const [activeIndex, setActiveIndex] = useState(null);

  const fetchPosts = async (args) => {
    if (args) {
      const startDate = moment(args.start);
      const endDate = moment(args.end);

      const isNotInDateRange =
        startDate.isBefore(moment(dateRanges.min)) ||
        endDate.isAfter(moment(dateRanges.max));

      if (!isNotInDateRange || !hasMore) return;
    }

    const response = await axios.post(
      "http://devapi.quinn.care/graph",
      getRequestObject(continuationtoken)
    );

    const newMaxDate =
      response.data.responseobjects[0].posts[0].calendardatetime;
    const newMinDate =
      response.data.responseobjects[0].posts[
        response.data.responseobjects[0].posts.length - 1
      ].calendardatetime;

    setPosts((prev) => [...prev, ...response.data.responseobjects[0].posts]);
    setContinuationtoken(response.data.responseobjects[0].continuationtoken);
    setHasMore(!!response.data.responseobjects[0].continuationtoken);
    //set New Range
    setDateRanges((prev) => {
      if (!prev.min && !prev.max) return { min: newMinDate, max: newMaxDate };

      return {
        min: moment(newMinDate).isBefore(moment(prev.min))
          ? newMinDate
          : prev.min,
        max: moment(newMaxDate).isAfter(moment(prev.max))
          ? newMaxDate
          : prev.max,
      };
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClick = (id) => {
    const activeIndex = posts.findIndex((item) => item.id === id);
    setActiveIndex(activeIndex);
  };

  const getEventList = () => {
    const eventMapping = {};

    posts.forEach((post) => {
      eventMapping[post.calendardatetime] = eventMapping[post.calendardatetime]
        ? [...eventMapping[post.calendardatetime], post]
        : [post];
    });

    return Object.values(eventMapping).map((item) => ({
      start: item[0].calendardatetime,
      end: item[0].calendardatetime,
      allEventsOnThisDay: item,
    }));
  };

  return (
    <>
      <div className="mx-auto h-screen w-full max-w-[900px] bg-white">
        <BigCalendar
          events={getEventList()}
          views={["month"]}
          defaultDate={new Date("2020-12-04T07:00:00")}
          components={{
            toolbar: CalendarToolbar,
            dateCellWrapper: DateCellWrapper,
            event: (args) => Event({ ...args, handleClick }),
          }}
          onRangeChange={fetchPosts}
        />
      </div>

      {activeIndex !== null && (
        <div
          style={{ zIndex: 100 }}
          className="fixed h-screen w-screen inset-0 bg-black bg-opacity-95 flex justify-center items-center"
        >
          <div
            onClick={() => setActiveIndex(null)}
            role="button"
            onKeyDown={(e) => {
              if (e && e.key === "Enter") {
                e.stopPropagation();
                onButtonClick();
              }
            }}
            tabIndex={0}
            className="cursor-pointer absolute top-[20px] right-[20px] h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]"
          >
            <img className="h-full" src="close-circle.svg" />
          </div>

          <div className="max-w-[60%] max-h-[100%] sm:max-w-[100%] lg:max-w-[75%] lg:max-h-[75%]">
            <Carousel initialActiveIndex={activeIndex}>
              {posts?.map((item, i) => (
                <EventCard event={item} key={i} />
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
}
