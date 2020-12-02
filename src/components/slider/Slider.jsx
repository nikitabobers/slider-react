import React, { createRef, useEffect } from "react";
import { WarningMessage } from "./common/WarningMessage";
import "./slider.css";

const Slider = ({ children }) => {
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

	// Calculate list container  width
	useEffect(() => {
		listRef.current.style.width = `${
			children.length * itemRef.current.clientWidth
		}px`;
	}, []);

	//
	// Mouse events
	//

	const mouseDown = (e) => {
		isDown = true;
		pointClick = e.pageX - containerRef.current.offsetLeft;
		pointCurrent = containerRef.current.scrollLeft;
	};

	const mouseLeave = () => (isDown = false);
	const mouseUp = () => (isDown = false);

	const mouseMove = (e) => {
		if (!isDown) return;
		e.preventDefault();
		const startPoint = e.pageX - containerRef.current.offsetLeft;
		const move = startPoint - pointClick;
		containerRef.current.scrollLeft = pointCurrent - move;
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
		containerRef.current.scrollLeft = pointCurrent - move;
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
					onMouseMove={(e) => mouseMove(e)}
					onTouchStart={(e) => touchStart(e)}
					onTouchMove={(e) => touchMove(e)}
				>
					{children.map((item, index) => (
						<li ref={itemRef} className="slider__item" key={index}>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export { Slider };
