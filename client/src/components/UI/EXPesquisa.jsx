
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";
import React, {useState ,useEffect } from "react";
import driverImg from "../../assets/all-images/toyota-offer-2.png";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EXPesquisa = () => {
  const [anunc, setAnunc] = useState([]);

  useEffect(() => {
    async function fetchAd() {
      const response = await axios.get('http://localhost:3002/anuncios/nivel-servico/1');
      console.log(response.data);
      setAnunc(response.data);
    }
    fetchAd();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, 
    arrows: false,
  };

  return (
    <section className="become__driver">
      <Container>
        {anunc.length > 1 ? (
          <Slider {...settings}>
            {anunc.map((anc) => (
              <div key={anc.id}  className="container_img">
                
                <a href={anc.link} target="_blank"><img className="become__driver_img" src={`http://localhost:3002/uploads/${anc.imagem}`} alt="" /></a>
               
              </div>
            ))}
          </Slider>
        ) : (
          anunc.map((anc) => (
            <div key={anc.id}  className="container_img">
              <a href={anc.link} target="_blank"><img className="become__driver_img" src={`http://localhost:3002/uploads/${anc.imagem}`} alt="" /></a>
              
            </div>
          ))
        )}
      </Container>
    </section>
  );
};

export default EXPesquisa;