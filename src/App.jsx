import React from "react";
import { Slider } from "./components/slider/Slider";
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.jpg";
import image5 from "./images/5.png";
import image6 from "./images/6.jpg";

function App() {
  return (
    <div className="App">
      <Slider slidesDisplayed={3}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>5</p>
      </Slider>
      <Slider slidesDisplayed={3}>
        <div>
          <p>1</p>
          <img src={image1} />
        </div>
        <div>
          <p>2</p>
          <img src={image2} />
        </div>
        <div>
          <p>3</p>
          <img src={image3} />
        </div>
        <div>
          <p>4</p>
          <img src={image4} />
        </div>
        <div>
          <p>5</p>
          <img src={image5} />
        </div>
        <div>
          <p>6</p>
          <img src={image6} />
        </div>
      </Slider>
      <Slider slidesDisplayed={4}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </Slider>
      <Slider slidesDisplayed={6}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
      </Slider>
      <Slider slidesDisplayed={10}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
        <p>13</p>
        <p>14</p>
        <p>15</p>
        <p>16</p>
        <p>17</p>
        <p>18</p>
        <p>19</p>
        <p>20</p>
      </Slider>
    </div>
  );
}

export default App;
