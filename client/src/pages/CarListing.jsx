import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { Link } from "react-router-dom";
import FindCarForm from "../components/UI/FindCarForm";

const CarListing = () => {
  return (
    <Helmet title="Cars">
      
      <CommonSection title="Veículos" />
      <section className="p-3 hero__slider-section">
        <div className="hero__form">
            <Container>
              <Row className="form__row">
                <Col lg="1" md="1">
                  
                </Col>

                <Col lg="10" md="10" sm="12">
                  <FindCarForm />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
            <button className="btn-cadastrar">
            <Link to="registerCategory" className=" d-flex align-items-center gap-1 btn-cadastrar">
                  Cadastrar veículo
                </Link>
            </button>
            
            </Col>
          
            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
