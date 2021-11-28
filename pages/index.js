import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import CalendarToolbar from "../components/calendar/Toolbar";
import DateCellWrapper from "../components/calendar/DateCellWrapper";
import axios from "axios";
import Event from "../components/Event";
import { getRequestObject } from "../utils";
import { Carousel } from "../components/Carousel";
import EventCard from "../components/EventCard";

moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);

export default function Home() {
  const [events, setEvents] = useState([]);
  const [continuationtoken, setContinuationtoken] = useState();
  const [dateRanges, setDateRanges] = useState({ min: "", max: "" });
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const fetchEvents = async (args) => {
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

    const events = response.data.responseobjects[0].posts;
    console.log(response);
    const eventMapping = {};

    events.forEach((event) => {
      eventMapping[event.calendardatetime] = eventMapping[
        event.calendardatetime
      ]
        ? [...eventMapping[event.calendardatetime], event]
        : [event];
    });

    const uniqueDateEvents = Object.values(eventMapping).map((item) => ({
      start: item[0].calendardatetime,
      end: item[0].calendardatetime,
      allEventsOnThisDay: item,
    }));

    setEvents((prev) => [...prev, ...uniqueDateEvents]);
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

  const handleClick = (id) => {
    const activeIndex = posts.findIndex((item) => item.id === id);
    setActiveIndex(activeIndex);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="mx-auto h-screen w-full max-w-[900px] bg-white">
        <BigCalendar
          events={events}
          views={["month"]}
          defaultDate={new Date("2020-12-04T07:00:00")}
          components={{
            toolbar: CalendarToolbar,
            dateCellWrapper: DateCellWrapper,
            event: (args) => Event({ ...args, handleClick }),
          }}
          onRangeChange={fetchEvents}
        />
      </div>

      {activeIndex !== null && (
        <div
          style={{ zIndex: 10000 }}
          onClick={() => setActiveIndex(null)}
          className="fixed h-screen w-screen inset-0 bg-black bg-opacity-90 flex justify-center items-center"
        >
          <div className="max-w-[60%] max-h-[100%] md:max-w-[100%] lg:max-w-[75%] lg:max-h-[75%]">
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
