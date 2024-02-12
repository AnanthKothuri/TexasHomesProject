import React from 'react';
import slide1 from "../assets/homess1.jpg";
import slide2 from "../assets/homess2.jpg";
import slide3 from "../assets/homess3.jpg";
import { Carousel } from 'react-bootstrap';

const HomePageCarousel = () => {


  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HomePageCarousel;
