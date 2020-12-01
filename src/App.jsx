import React from "react";
import { Slider } from "./components/slider/Slider";

function App() {
	const list = [1, 2, 3];

	return (
		<div className="App">
			<Slider>
				{list.map((item) => (
					<div key={item}>{item}</div>
				))}
			</Slider>
		</div>
	);
}

export default App;
