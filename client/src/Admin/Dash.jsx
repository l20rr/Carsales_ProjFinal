import {  
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn, } from 'mdb-react-ui-kit';
import  SideBar from "./SideBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Cookies from "universal-cookie";

const Dash = () => {
  const cookies = new Cookies();
  const fullname = () => cookies.get('fullname');
  return (
    <div style={{display: 'flex'}}>
    
    < SideBar/>
    <MDBContainer className="py-3">
            <MDBRow>
                        <h1>Area Pessoal</h1>
                        <h3>  Escolha uma destas opções</h3>
                <MDBRow>  
                        <span><FontAwesomeIcon icon={faArrowLeft} /> As suas preferências</span>       
                </MDBRow>
                <MDBRow><p></p></MDBRow>
                <MDBRow><p></p></MDBRow>
                        <span><FontAwesomeIcon icon={faArrowLeft} /> O seu perfil</span>
                        <MDBRow><p></p></MDBRow>
                <MDBRow><p></p></MDBRow>
                        <span><FontAwesomeIcon icon={faArrowLeft} /> A suas faturas</span>  
                        <MDBRow><p></p></MDBRow>
                <MDBRow><p></p></MDBRow>
                        <span><FontAwesomeIcon icon={faArrowLeft} /> As suas mensagens </span>      
              </MDBRow>
    </MDBContainer>
    <MDBContainer className="py-4">
      <MDBRow>
              <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                      <p className="text-muted mb-1">{fullname()}</p>
                      
                      <div className="d-flex justify-content-center mb-2">
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                </MDBRow>
        </MDBContainer>
    </div>
    

  );
};

export default Dash;