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

  const handleSlideStart = (e) => {
    isDown = true;

    let eventStartPoint;

    switch (e.type) {
      case "touchstart":
        eventStartPoint = e.touches[0].clientX;
        break;
      case "mousedown":
        eventStartPoint = e.pageX;
        break;
      default:
        eventStartPoint = 0;
    }

    pointClick = eventStartPoint - containerRef.current.offsetLeft;
    pointCurrent = containerRef.current.scrollLeft;
  };

  const handleSlideMove = (e) => {
    if (!isDown) return;
    let eventStartPoint;

    switch (e.type) {
      case "touchmove":
        eventStartPoint = e.touches[0].clientX;
        break;
      case "mousemove":
        eventStartPoint = e.pageX;
        break;
      default:
        eventStartPoint = 0;
    }

    const startPoint = eventStartPoint - containerRef.current.offsetLeft;
    const moveValue = startPoint - pointClick;
    containerRef.current.scrollLeft = pointCurrent - moveValue;
  };

  const handleSlideEnd = (e) => {
    isDown = false;

    // Add smooth animated style to Container div
    containerRef.current.style.scrollBehavior = "smooth";

    let eventStartPoint = 0;
    switch (e.type) {
      case "touchend":
        eventStartPoint = e.changedTouches[0].clientX;
        break;
      case "mouseup":
        eventStartPoint = e.pageX;
        break;
      default:
        eventStartPoint = 0;
    }

    const startPoint = eventStartPoint - containerRef.current.offsetLeft;

    // To determine slide direction (right or left)
    let moveValue = startPoint - pointClick;

    // Get only positive moving value
    let moveAbsoluteValue = Math.abs(moveValue);

    let counter = 1;
    if (moveAbsoluteValue > itemWidth) {
      counter = Math.round(moveAbsoluteValue / itemWidth);
    }
    //Calculate distance left from scrolling point to the next slide element
    let distanceToMove = itemWidth * counter - moveAbsoluteValue;

    // Return to start point if cswipe is too small
    if (moveValue < 50 || moveValue > -50) {
      containerRef.current.scrollLeft = pointCurrent;
    }
    // Slide left
    if (moveValue > 50) {
      containerRef.current.scrollLeft -= distanceToMove;
    }
    // Slide right
    if (moveValue < -50) {
      containerRef.current.scrollLeft += distanceToMove;
    }

    // Reset Container div animation
    containerRef.current.style.scrollBehavior = "auto";
  };

  // On desktop return to click start if mouse moved outside slider
  const mouseLeave = () => {
    isDown = false;
    containerRef.current.style.scrollBehavior = "smooth";
    containerRef.current.scrollLeft = pointCurrent;
    containerRef.current.style.scrollBehavior = "auto";
  };

  return (
    <div className="container">
      <div className="slider__container" ref={containerRef}>
        <ul
          className={`slider__list`}
          ref={listRef}
          onMouseDown={(e) => handleSlideStart(e)}
          onMouseMove={(e) => handleSlideMove(e)}
          onMouseUp={(e) => handleSlideEnd(e)}
          onMouseLeave={(e) => mouseLeave(e)}
          onTouchStart={(e) => handleSlideStart(e)}
          onTouchMove={(e) => handleSlideMove(e)}
          onTouchEnd={(e) => handleSlideEnd(e)}
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
