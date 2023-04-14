import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { Link } from "react-router-dom";

const CarListing = () => {
  return (
    <Helmet title="Cars">
      <CommonSection title="veículo" />

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
