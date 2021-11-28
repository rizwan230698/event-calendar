import { cloneElement, Children } from "react";

const DateCellWrapper = ({ children, value }) => {
  const day = new Date(value).getDay();
  return cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: day === 0 ? "#f6f6f6" : "#ffffff", //check for sundays
    },
  });
};

export default DateCellWrapper;
