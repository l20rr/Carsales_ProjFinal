import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";
import ava03 from "../../assets/all-images/ava-3.jpg";
import ava04 from "../../assets/all-images/ava-4.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
        "Comprei meu primeiro carro nesta loja e fiquei impressionado com a qualidade do atendimento e 
        dos veículos disponíveis. Foi uma experiência de compra excepcional, e
         estou muito satisfeito com a minha escolha. Recomendo esta loja a todos que procuram um carro de qualidade
          e um atendimento diferenciado."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Mario</h6>
         
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        "Encontrei o carro dos meus sonhos nesta loja e não poderia estar mais feliz! A equipe foi muito atenciosa 
        e prestativa durante todo o processo de compra, e o veículo foi entregue exatamente como eu esperava. 
        Recomendo esta loja para quem busca um carro de qualidade e um serviço excepcional."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Maria</h6>
       
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        "Fiz uma compra nesta loja e fiquei impressionado com a facilidade e segurança do processo. 
        Tive acesso a uma ampla seleção de veículos e pude comparar preços e modelos antes de tomar minha decisão.
         A entrega foi rápida e o carro estava em perfeitas condições. 
        Certamente voltarei a comprar nesta loja."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">José</h6>
          
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        "Esta loja online superou todas as minhas expectativas. O site é fácil de usar, os preços são competitivos e 
        o atendimento é excelente. Comprei meu carro sem sair de casa e tive uma experiência de compra incrível. 
        Recomendo esta loja a todos que desejam comprar um carro com praticidade e segurança."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Ana</h6>
         
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
