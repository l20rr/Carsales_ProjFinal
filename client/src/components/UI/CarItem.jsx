import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { Col, Container} from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import Slider from "react-slick";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';

const CarItem = () => {
  const [Ads, setAds] = useState([]);
  const [lastImagePath, setLastImagePath] = useState("");
  const cookies = new Cookies();
  const [favorites, setFavorites] = useState({});

 

  useEffect(() => {
    async function fetchAds() {
      const response = await api.get('/pri/listAllPriorityPriceASC');
      setAds(response.data);
      console.log(response.data)
    }
    fetchAds();
  }, []);
  
  useEffect(() => {
    async function fetchLastImagePath() {
      const response = await api.get("/vehicle/lastImagePath");
      setLastImagePath(response.data.lastImagePath);
    }
    fetchLastImagePath();
  }, []);
  
  async function toggleFavorite(vehicleID) {
    try {
      const userID = cookies.get("userID");
      const postData = {
        clientID: userID,
        publishadID: vehicleID,
      };
      const isFavorited = await checkFav(vehicleID);
  
      if (isFavorited) {
        const response = await api.delete(`fav/favorites/${vehicleID}`);
        setFavorites((prevFavorites) => ({ ...prevFavorites, [vehicleID]: false }));
      } else {
        const response = await api.post("fav/favorites", postData);
        setFavorites((prevFavorites) => ({ ...prevFavorites, [vehicleID]: true }));
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchFavorites() {
      const userID = cookies.get("userID");
      const response = await api.get(`fav/favorites/${userID}`);
      const favorites = response.data.reduce((acc, fav) => {
        acc[fav.publishadID] = true;
        return acc;
      }, {});
      setFavorites(favorites);
    }
    fetchFavorites();
  }, []);
  
  
async function checkFav(vehicleID) {
  try {
    const userID = cookies.get('userID');
    const response = await api.get(`fav/favorites/${userID}`);

    for (const fav of response.data) {
      if (fav.publishadID === vehicleID) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

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
      {Ads.map((ad) => (
        <Col key={ad.id} lg="4" md="4" sm="6" className="mb-5">
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
          <div onClick={() => toggleFavorite(ad.vehicleID)}>
            {favorites[ad.vehicleID] ? (
              <MDBIcon style={{ color: "red" }} fas icon="heart" />
            ) : (
              <MDBIcon style={{ color: "red" }} far icon="heart" />
            )}
          </div>
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
                  <i class="ri-gas-station-fill"></i> {ad.fuel}
                </span>
              </div>
              <button className=" w-50 car__item-btn car__btn-details">
                <Link to={`/cars/${ad.vehicleID}`}>Detalhes</Link>
              </button>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
      }
export default CarItem;