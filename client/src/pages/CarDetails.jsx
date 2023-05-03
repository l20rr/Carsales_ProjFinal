import React, {useState ,useEffect } from "react";
import api from "../services/api";
import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";




const CarDetails = () => {
 const [Ads, setAds] = useState([])
 const {id} = useParams()
 useEffect(() => {
  async function fetchUsers() {
    const response = await api.get(`/publi/listAD/${id}`);
    console.log(response)
    setAds(response.data);
  }
  fetchUsers();
}, []);


  return (
    <>
   {
    Ads.map(Ad => (
    <div key={Ad.id}>
      
  <Helmet title={Ad.Marca}>
      <section>
        <Container>
          <Row>
            <h1>Usuario: {Ad.fullname}</h1>
            <Col lg="6">
              <img  alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{Ad.Marca}-{Ad.Modelo}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {Ad.price}.00 €
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({Ad.year} )
                  </span>
                </div>

                <p className="section__description">
                  {Ad.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {Ad.kms}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {Ad.power}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {Ad.Combustivel}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {Ad.Localidade}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {Ad.categoryName}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {Ad.SubcategoryName}
                  </span>
                
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <a href="/chat"><button style={{ background: "#f9a826", border:"none", borderRadius:12, padding:10, width:150 }}>Message</button></a>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
  </Helmet>
    </div>
    ))}
    </>
  );
};

export default CarDetails;
