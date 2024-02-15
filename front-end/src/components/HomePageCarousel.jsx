import React from 'react';
import slide1 from "../assets/home-page/homeless1.jpg";
import slide2 from "../assets/home-page/homeless2.jpg";
import slide3 from "../assets/home-page/homeless3.jpg";
import { Carousel, Image } from 'react-bootstrap';

const HomePageCarousel = () => {
  const IMAGE_OPACITY = 0.6
  const IMAGE_HEIGHT = '30rem'
  const COLOR_OVERLAY = 'rgba(0, 0, 0, 0.5)'

  const titleStyling = {
    fontSize: 80,
    margin: 50,
    fontWeight: 'bold',
    textShadow: '0 0 0.2em grey',
  }
  
  const captionStyling = {
    fontSize: 19,
    textShadow: '0 0 0.3em grey',
  }

  const slides = [
    { 
      image: slide1, 
      caption: "Homeless tents set up in front of a Picasso quote"
    },
    { 
      image: slide2,
      caption: "Mother and son holding up a sign asking for help"
    },
    { 
      image: slide3,
      caption: "Belongings of a homeless person piled near a bench"
    },
  ];

  const renderCarouselItems = (slides) => {
    return slides.map((slide, index) => (
      <Carousel.Item key={index} style={{ width: '100%', height: IMAGE_HEIGHT, background: COLOR_OVERLAY }}>
        <Image src={slide.image} fluid style={{ objectFit: 'cover', width: '100%', height: '100%', opacity: IMAGE_OPACITY }} />
        <Carousel.Caption>
          <h1 style={titleStyling}>Texas Homes Project</h1>
          <p style={captionStyling}><b>Caption:</b> {slide.caption}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  };
  
  return (
    <>
      <Carousel>
        {renderCarouselItems(slides)}
      </Carousel>
    </>
  );
};

export default HomePageCarousel;
