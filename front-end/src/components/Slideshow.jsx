import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // Import the CSS for styling

const Slideshow = ({ interval = 3000, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const imageStyle = {
    width: '100%', // Ensures the slide covers the container width
    height: 'auto', // Adjust height automatically to maintain aspect ratio
    objectFit: 'contain', // Ensures the full image is visible
  };

  return (
    <div className="slideshow">
      <div
        className="slideshow-slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
       {slides.map((slide, index) => (
        <img key={index} src={slide} alt={`Slide ${index}`} style={imageStyle} />
      ))}

      </div>
    </div>
  );
};

export default Slideshow;
