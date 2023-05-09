import React from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="Sobre nós" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                Estamos comprometidos em fornecer uma solução segura e eficaz
                </h2>

                <p className="section__description">
                Nossa seleção de veiculos é extensa e cuidadosamente selecionada para atender às suas necessidades e estilo de vida. Temos desde carros populares até veículos de luxo,
                 todos em excelente estado e prontos para serem entregues em qualquer lugar do país.
                 Com nossa plataforma online fácil de usar, você pode pesquisar, comparar e comprar o carro que 
                 deseja com apenas alguns cliques. Além disso, nosso sistema de financiamento é simples e acessível,
                  tornando o processo de compra ainda mais fácil.
                </p>

                <p className="section__description">
                Nosso compromisso com a qualidade e a satisfação do cliente é inabalável. Trabalhamos duro para garantir que nossos clientes recebam um excelente atendimento e um produto de qualidade, desde o momento da compra até a entrega do veículo.
Seja você um comprador pela primeira vez ou um colecionador experiente, estamos confiantes de que encontrará exatamente o que está procurando em nossa loja de veículos online. Estamos aqui para ajudá-lo em cada passo do caminho, desde a escolha do carro até a entrega à sua porta.
                </p>

            
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    

      <section className="membros">
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Membros</h6>
              <h2 className="section__title">Criadores</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
