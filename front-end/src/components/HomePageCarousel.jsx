import React from 'react';
import slide1 from "../assets/homess1.jpg";
import slide2 from "../assets/homess2.jpg";
import slide3 from "../assets/homess3.jpg";
import { Carousel, Image } from 'react-bootstrap';

const HomePageCarousel = () => {
  const opacity = 0.6
  const image_height = '30rem'
  const image_background = 'rgba(0, 0, 0, 0.5)'

  return (
    <>
      <Carousel >

        <Carousel.Item style={{width: '100%', height: image_height, background: image_background}}> 
          <Image src={slide1} fluid style={{ objectFit: 'cover', width: '100%', height: '100%', opacity: opacity}}/>;
          <Carousel.Caption>
            <h1 style={{fontSize: 80, margin: 50}}>Texas Homes Project</h1>
            <p>Caption: Homeless tents set up in front a Picasso quote</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{width: '100%', height: image_height, background: image_background}}>
        <Image src={slide2} fluid style={{ objectFit: 'cover', width: '100%', height: '100%', opacity: opacity }}/>;
          <Carousel.Caption>
            <h1 style={{fontSize: 80, margin: 50}}>Texas Homes Project</h1>
            <p>Caption: Mother and son holding up a sign asking for help</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{width: '100%', height: image_height, background: image_background}}>
        <Image src={slide3} fluid style={{ objectFit: 'cover', width: '100%', height: '100%', opacity: opacity }}/>;
          <Carousel.Caption>
            <h1 style={{fontSize: 80, margin: 50}}>Texas Homes Project</h1>
            <p>Caption: Belongings of a homeless person piled near a bench</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </>
  );
};

export default HomePageCarousel;
