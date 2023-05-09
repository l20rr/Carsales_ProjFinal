import React, { useState} from 'react';
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection2 from "../components/UI/BecomeDriverSection2";
import { Link } from "react-router-dom";
import CarItemSearch from '../components/UI/CarItemSearch';
import FindCarForm from "../components/UI/FindCarForm";

const CarListing = () => {

  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (responseData) => {
    setSearchResults(responseData);
    setShowSearchResults(true);
  };

  return (
    <Helmet title="Cars">
      
      <CommonSection title="Veículos" />
      <section className="p-3 hero__slider-section">
        <div className="hero__form">
            <Container>
              <Row className="form__row">
                <Col lg="1" md="1">
                  
                </Col>

                <Col lg="10" md="10">
                <FindCarForm onSubmit={handleSubmit} />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      <section>
      <BecomeDriverSection2 />
        <Container>
          <Row className="mb-4">
            <Col lg="12">
            <button className="btn-cadastrar" style={{marginTop:'50px'}}>
            <Link style={{textDecoration:'none', color:'white'}} to="registerCategory" className=" d-flex align-items-center gap-1 btn-cadastrar">
                  Cadastrar veículo
                </Link>
            </button>
            <button className="btn-cadastrar" style={{ marginTop: '50px', backgroundColor: 'gray' }} onClick={() => window.location.reload()}>
              ver todos
            </button>
            <br/>
            </Col>
          </Row>
          {showSearchResults ? (
        <section>
          <Container>
            <Row>
              <CarItemSearch Ads={searchResults} />
            </Row>
          </Container>
        </section>
      ) : (
        <section>
          <Container>
            <Row>
              <CarItem />
            </Row>
          </Container>
        </section>
      )}
         </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
