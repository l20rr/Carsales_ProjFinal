import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import  SideBar from "./SideBar";

import { Col, Container} from "reactstrap";


import Slider from "react-slick";

const cookies = new Cookies();
function Fav() {
    const [Ads, setAds] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
      async function fetchAds() {
          const response = await api.get(`fav/favorites/2`)
        setAds(response.data);
      }
      fetchAds();
    }, []);
    
  
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
      <>
     
    <div style={{display:'flex', margin:'0 auto'}}>
    <SideBar/>
    {Ads.length > 0 ? (
        Ads.map((ad) => (
          <Col key={ad.id} lg="2" md="4" sm="6" className="mb-5">
            <div className="car__item">
            <Slider {...settings} className="hero__slider">
                     <div className="car__img">
                      <img src={`http://localhost:3000/uploads/${ad.image}`} alt="" />
                    <Container>
                  
                    </Container>
                     </div>
  
                     <div className="car__img">
                      <img src={`http://localhost:3000/uploads/${ad.image2}`} alt="" />
                    <Container>
                  
                    </Container>
                     </div>
  
                     <div className="car__img">
                      <img src={`http://localhost:3000/uploads/${ad.image3}`} alt="" />
                    <Container>
                  
                    </Container>
                     </div>
            </Slider>
              <div className="car__item-content mt-4">
                <h4 className="section__title text-center">
                  {ad.brand}-{ad.model}
                </h4>
                <h6 className="rent__price text-center mt-">
                  {ad.price}.00€ <span></span>
                </h6>
                <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-car-line"></i> {ad.categoryName}
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-calendar-check-line"></i> {ad.year}
                  </span>
                  <span className=" d-flex align-items-center gap-1">
                    <i class="ri-gas-station-fill"></i> {ad.Combustivel}
                  </span>
                </div>
                <button className=" w-50 car__item-btn car__btn-details">
                  <Link to={`/cars/${ad.id}`}>Detalhes</Link>
                </button>
              </div>
            </div>
          </Col>
        ))
        ) : (
            <h2>0 Favoritos</h2>
          )}
        </div>
      </>
    );
        }

export default Fav;