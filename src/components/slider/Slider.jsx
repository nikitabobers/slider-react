import React, { createRef, useEffect, useState } from "react";
import { WarningMessage } from "./common/WarningMessage";
import "./slider.css";

const calcItemWidth = (itemsTotal, container, item, handleChange) => {
  const containerWidth = container.current.getBoundingClientRect().width;

  const margin = parseInt(
    window.getComputedStyle(item.current).getPropertyValue("margin-left")
  );

  const marginValue = margin / itemsTotal;

  if (itemsTotal < 5) {
    handleChange(containerWidth / itemsTotal - marginValue + 5);
  } else {
    handleChange(containerWidth / itemsTotal - marginValue + 2);
  }
};

const Slider = ({ children, slidesDisplayed }) => {
  // Ensure that slider have items to slide
  if (children === undefined || children.length === undefined)
    return (
      <div className="container">
        <WarningMessage />
      </div>
    );

  // Slider container (visible frame)
  const containerRef = createRef();
  // List container
  const listRef = createRef();
  // List child
  const itemRef = createRef();

  let isDown = false;
  // Point coordinate in slider component on click
  let pointClick;
  // Current point coordinate in slider component
  let pointCurrent;

  // list item width
  const [itemWidth, setItemWidth] = useState(0);

  // Calculate slide width
  useEffect(() => {
    calcItemWidth(slidesDisplayed, containerRef, itemRef, setItemWidth);
  }, []);

  // Calculate list container  width
  useEffect(() => {
    listRef.current.style.width = `${children.length * itemWidth}px`;
  }, [itemWidth]);

  //
  // Mouse events
  //

  const mouseDown = (e) => {
    isDown = true;
    pointClick = e.pageX - containerRef.current.offsetLeft;
    pointCurrent = containerRef.current.scrollLeft;
  };

  const mouseLeave = () => (isDown = false);
  const mouseUp = (e) => {
    e.preventDefault();
    isDown = false;

    const startPoint = e.pageX - containerRef.current.offsetLeft;

    const move = startPoint - pointClick;

    // // Slide left
    if (move != 0 && move > 50) {
      containerRef.current.scrollLeft -= itemWidth;
    }
    // // Slide right
    if (move != 0 && move < -50) {
      containerRef.current.scrollLeft += itemWidth;
    }
  };

  //
  // Touch screen events
  //

  const touchStart = (e) => {
    pointClick = e.touches[0].clientX - containerRef.current.offsetLeft;
    pointCurrent = containerRef.current.scrollLeft;
  };

  const touchMove = (e) => {
    const startPoint = e.touches[0].clientX - containerRef.current.offsetLeft;
    const move = startPoint - pointClick;

    // Slide left
    if (move != 0 && move > 50) {
      containerRef.current.scrollLeft -= itemWidth;
    }
    // Slide right
    if (move != 0 && move < -50) {
      containerRef.current.scrollLeft += itemWidth;
    }
  };

  return (
    <div className="container">
      <div className="slider__container" ref={containerRef}>
        <ul
          className={`slider__list`}
          ref={listRef}
          onMouseDown={(e) => mouseDown(e)}
          onMouseLeave={(e) => mouseLeave(e)}
          onMouseUp={(e) => mouseUp(e)}
          onTouchStart={(e) => touchStart(e)}
          onTouchMove={(e) => touchMove(e)}
        >
          {children.map((item, index) => (
            <li
              ref={itemRef}
              style={{ width: itemWidth }}
              className="slider__item"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Slider };
