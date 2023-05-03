import React, {useState ,useEffect } from "react";
import api from "../services/api";
import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";

const CarDetails = () => {

const [userID, setClientID] = useState('');
const [year, setYear] = useState('');
  const [kms, setKms] = useState('');
 const [brand, setBrand] = useState('');
 const [model, setModel] = useState('');
 const [fuel, setFuel] = useState('');
 const [price, setPrice] = useState('');
const [power, setPower] = useState('');
 const [numSeats, setNumSeats] = useState('');
const [Localidade, setLocalidade] = useState('');
const [image, setImage] = useState(null);
const [category, setCategory] = useState('');
const [Subcategory, setSubCategory] = useState('');
const [date, setDate] = useState('');
const [streamChatUserId, setStreamChatUserId] = useState('');
  
  
useEffect(() => {
 api.get(`/publi/listAD/${userID}`)
  
 .then(response => {
const VeiculData = response.data;
 const UserData = response.data;

console.log(VeiculData)
 setYear(VeiculData.year);
setKms(VeiculData.kms);
setBrand(VeiculData.Marca)
 setFuel(VeiculData.Combustivel)
setModel(VeiculData.Modelo)
 setPrice(VeiculData.price)
 setPower(VeiculData.power)
 setNumSeats(VeiculData.numSeats)
 setLocalidade(VeiculData.Localidade)
setImage(VeiculData.image)
setCategory(VeiculData.categoryName)
 setSubCategory(VeiculData.SubcategoryName)
setDate(VeiculData.publishAD_date)
setStreamChatUserId(UserData.streamChatUserId)
 })
 .catch(error => {
 console.log(error);
 });
}, []);

  return (
    <Helmet title={brand}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={image} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{model}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {price}.00 €
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({year} )
                  </span>
                </div>

                <p className="section__description">
                  {Localidade}
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
                    {kms}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {power}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {fuel}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {numSeats}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {category}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {Subcategory}
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {date}
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
  );
};

export default CarDetails;
