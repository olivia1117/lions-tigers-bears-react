import React, { useState, useEffect } from 'react';
import './main.css';

function App() {
  const [breeds, setBreeds] = useState({});
  const [images, setImages] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        setBreeds(data.message);
      } catch (e) {
        console.error("There was a problem fetching the breed list.");
      }
    }
    fetchBreeds();
  }, []);

  const loadByBreed = async (breed) => {
    if (breed !== "Choose a dog breed") {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await response.json();
      setImages(data.message);
      setCurrentPosition(0);
      clearInterval(timer);
      startSlideshow(data.message);
    }
  };

  const startSlideshow = (images) => {
    if (images.length > 1) {
      setTimer(
        setInterval(() => {
          setCurrentPosition((prev) => (prev + 1) % images.length);
        }, 3000)
      );
    }
  };

  return (
    <div>
      <h1>Dog Breed Selector</h1>
      <div>
        <select onChange={(e) => loadByBreed(e.target.value)}>
          <option>Choose a dog breed</option>
          {Object.keys(breeds).map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
      </div>
      <div id="slideshow">
        {images.length > 0 && (
          <div
            className="slide"
            style={{ backgroundImage: `url('${images[currentPosition]}')` }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default App;