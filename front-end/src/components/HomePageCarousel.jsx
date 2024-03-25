import React from 'react';
import slide1 from "../assets/home-page/homeless1.jpg";
import slide2 from "../assets/home-page/homeless2.jpg";
import slide3 from "../assets/home-page/homeless3.jpg";
import { Carousel, Image } from 'react-bootstrap';
import Colors from '../assets/Colors';

const HomePageCarousel = () => {
  const IMAGE_OPACITY = 0.6
  const IMAGE_HEIGHT = '35rem'
  const COLOR_OVERLAY = 'rgba(0, 0, 0, 0.5)'

  const titleStyling = {
    fontSize: 55,
    margin: 20,
    fontWeight: 'bold',
    textShadow: '0 0 2em grey',
  }

  const subtitleStyling = {
    fontSize: 30,
    whiteSpace: 'normal',
    marginBottom: 80
  }
  
  const captionStyling = {
    fontSize: 15,
    fontWeight: 'light',
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
          <hr style={{ width: '50%', margin: '10px auto', borderColor: 'white', borderWidth: '2px'}} />
          <p style={subtitleStyling}>Raising awareness for Texas<br/>homelessness</p>
          <p style={captionStyling}>Caption: {slide.caption}</p>
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
