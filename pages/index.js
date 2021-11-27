import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import CalendarToolbar from "../components/calendar/Toolbar";
import DateCellWrapper from "../components/calendar/DateCellWrapper";

moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);

export default function Home() {
  return (
    <div className="mx-auto h-screen w-full max-w-[900px] bg-white">
      <BigCalendar
        events={[]}
        views={["month"]}
        defaultDate={new Date()}
        components={{
          toolbar: CalendarToolbar,
          dateCellWrapper: DateCellWrapper,
        }}
      />
    </div>
  );
}
