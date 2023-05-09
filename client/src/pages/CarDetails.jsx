import React, {useState ,useEffect } from "react";
import api from "../services/api";
import { Container, Row, Col, Button } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';

const cookies = new Cookies();


const authToken = cookies.get("token");
const userId = cookies.get('userId');
const apiKey = 'vxwzb46w7drg';

const chatClient = new StreamChat(apiKey);

const createChannel = async (otherUserId) => {
  // autenticar usuário
  await chatClient.setUser(
    {
      id: userId,
    },
    authToken,
  );

  // obter informações do usuário com quem você quer iniciar um chat
  const otherUser = await chatClient.queryUsers({ id: otherUserId });

  // criar canal de chat
  const channel = chatClient.channel('messaging', {
    members: [userId, otherUserId].sort(),
  });

  await channel.create();

  // retornar o ID do canal para que você possa redirecionar o usuário para a página de chat
  return channel.id;
};

const GoMassage = async (otherUserId) => {
  const channelId = await createChannel(otherUserId);
  window.location.href = `/chat/${channelId}`;
};


const CarDetails = () => {
  const [Ads, setAds] = useState([]);
  const [otherUserId, setOtherUserId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAd() {
      const response = await api.get(`/publi/listAD/${id}`);
      console.log(response);
      setAds(response.data);
      setOtherUserId(response.data[0].streamChatUserId);
    }
    fetchAd();
  }, [id]);


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
   {
    Ads.map(Ad => (
    <div key={Ad.id}>
      
      <Helmet title={Ad.brand}>
      <section>
        <Container>
          <Row>
            <h1>Usuário: {Ad.fullname}</h1>
            <Col  lg="6">
            <Slider {...settings} className="hero__slider">
                   <div className="car__img_detalhe">
                    <img src={`http://localhost:3000/uploads/${Ad.image}`} alt="" />
                  <Container>
                
                  </Container>
                   </div>

                   <div className="car__img_detalhe">
                    <img src={`http://localhost:3000/uploads/${Ad.image2}`} alt="" />
                  <Container>
                
                  </Container>
                   </div>

                   <div className="car__img_detalhe">
                    <img src={`http://localhost:3000/uploads/${Ad.image3}`} alt="" />
                  <Container>
                
                  </Container>
                   </div>
                  </Slider>
            </Col>
            <Col  lg="6">
              <div className="car__info">
                <h2 className="section__title">{Ad.brand}-{Ad.model}</h2>
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
                    </span>
                    ({Ad.year} )
                  </span>
                </div>
                <p className="section__description">
                  {Ad.description}
                </p>
                <div className=" d-flex align-items-center mt-4" style={{ columnGap: "4rem" }}>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-roadster-line"style={{ color: "#f9a826" }}></i>{" "}{Ad.categoryName}
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-steering-2-fill" style={{ color: "#f9a826" }}></i>{" "}{Ad.SubcategoryName}
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-dashboard-3-line" style={{ color: "#f9a826" }}></i>{" "}{Ad.kms}{" Kms"}
                  </span>
                </div>
                <div className=" d-flex align-items-center mt-4" style={{ columnGap: "2.8rem" }}>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-gas-station-fill" style={{ color: "#f9a826" }}></i>{" "}{Ad.fuel}
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-settings-2-line" style={{ color: "#f9a826" }}></i>{" "}{Ad.power}{" kWs"}
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-timer-flash-line" style={{ color: "#f9a826" }}></i>{" "} {Ad.num_seats}{" Lugares"}
                  </span>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "} {Ad.locality}
                  </span>
                </div>
              </div>
            </Col>
          
        </Row>
        <Row>
            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
              <Button color="info" onClick={() => GoMassage(otherUserId)}>Messagem</Button>
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
