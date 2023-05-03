import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

const CarItem = () => {
  const [Ads, setAds] = useState([]);
  const [lastImagePath, setLastImagePath] = useState("");
  
  useEffect(() => {
    async function fetchAds() {
      const response = await api.get('/publi/listAllAD');
      setAds(response.data);
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
  
  return (
    <>
      {Ads.map((ad) => (
        <Col key={ad.id} lg="4" md="4" sm="6" className="mb-5">
          <div className="car__item">
            <div className="car__img">
            <img src={`http://localhost:3000/uploads/${ad.image}`} alt="" />
            </div>
            <div className="car__item-content mt-4">
              <h4 className="section__title text-center">
                {ad.Marca}-{ad.Modelo}
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
      ))}
    </>
  );
      }
export default CarItem;