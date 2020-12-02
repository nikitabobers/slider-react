# React Slider

Slider created with ReactJS library

## Installation

- Clone source code in your local machine

  ```
  git clone https://github.com/nikitabobers/slider-react.git
  ```

- Use the package manager [yarn](https://yarnpkg.com/) to install slider.

  `cd slider-react` to go into the project root

  `yarn init` to install dependencies

## Available commands

`yarn start` to start development server

`yarn build` to create compiled production code in the /dist folder

## Examples of usage

In `src/App.jsx` file Insert any tags in Slider component

- With different tags

  ```jsx
  import { Slider } from "./components/slider/Slider";

  return (
  	<div className="App">
  		<Slider>
  			<p>Paragraph</p>
  			<div>
  				<p>Div with Paragraph and button</p>
  				<button>Click Me</button>
  			</div>
  			<a href="https://scandiweb.com/">Visit Scandiweb.com</a>
  		</Slider>
  	</div>
  );
  ```

- With `map()` method

  ```jsx
  import { Slider } from "./components/slider/Slider";

  function App() {
  	const persons = [
  		{ name: "Mike", age: 22 },
  		{ name: "Bob", age: 15 },
  		{ name: "Alex", age: 77 },
  	];

  	return (
  		<div className="App">
  			<Slider>
  				{persons.map((person) => (
  					<div>
  						<p>{person.name}</p>
  						<p>{person.age}</p>
  					</div>
  				))}
  			</Slider>
  		</div>
  	);
  }
  ```
