import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
         
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
         
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
         
        </Container>
      </div>
      <div className="slider__item slider__item-04 mt0">
        <Container>
         
        </Container>
      </div>
      <div className="slider__item slider__item-05 mt0">
        <Container>
        </Container>
      </div>
      <div className="slider__item slider__item-06 mt0">
        <Container>
        </Container>
      </div>
      <div className="slider__item slider__item-07 mt0">
        <Container>
         
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
