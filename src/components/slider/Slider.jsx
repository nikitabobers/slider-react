import React from "react";
import "./slider.css";

const Slider = ({ children }) => {
	return (
		<div className="container">
			<div className="slider__container">
				<ul className={`slider__list`}>
					{children.map((item, index) => (
						<item.type className="slider__item" key={index}>
							{item}
						</item.type>
					))}
				</ul>
			</div>
		</div>
	);
};

export { Slider };
