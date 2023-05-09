import React from "react";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";
import CarItemPremium from "../components/UI/CarItemPremium"
import Cookies from "universal-cookie";
import AdminUsers from "./AdminUsers";
const Home = () => {
  const cookies = new Cookies();
  const email = cookies.get('email');
  if (email === "admin@gmail.com") return <AdminUsers/>

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Filtre a pesquisa de anuncios</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    
      
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Encontre aqui</h6>
              <h2 className="section__title">Melhores ofertas</h2>
            </Col>

           
              <CarItemPremium/>
           
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">O que nossos clientes dizem</h6>
              <h2 className="section__title">Comentários</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

    </Helmet>
  );
};

export default Home;
