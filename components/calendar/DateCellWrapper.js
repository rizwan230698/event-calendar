import { cloneElement, Children } from "react";

const DateCellWrapper = ({ children, value }) => {
  const day = new Date(value).getDay();
  return cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: day === 0 ? "#f6f6f6" : "#ffffff",
      color: day === 0 ? "red" : "#000000",
    },
  });
};

export default DateCellWrapper;
