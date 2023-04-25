import React,{useState , useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import api from '../services/api';
//import queryString from 'query-string';
import {
  MDBContainer,
  MDBBtnGroup,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBTypography,
  MDBIcon,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom'
import Register from "../components/Header/Register"

const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'cd4bcsnrt3ej';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        fullname: cookies.get('fullname'),
        name: cookies.get('email'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}

export default function  Registeradverts() {


  const clientID = cookies.get('userId');
  const {vehicleID} = useParams()

  async function handleSubmitFree(e) {
    e.preventDefault();

    const data = {
      vehicleID:vehicleID,
      clientID: clientID
    };
    
      
     try {
      api.post('/publi/publishad', data);
  
    
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar!');
    }
  }     

  


  return (
    <div style={{backgroundColor:"#000d6b", height:900}}>
      
      <MDBContainer className="py-5  mb-5 rounded bg-white">
      <div className="text-center">
        <h4 classaName="mb-4">
          <strong>Escolha o tipo de anuncio</strong>
        </h4>

     <br/>
     <br/>
      </div>

      <MDBRow>
        <MDBCol md="2">
        
        </MDBCol>

        <MDBCol md="3">
          <MDBCard border="dark">
            <MDBCardBody className="mx-2">
              <MDBCardTitle className="my-2">Anuncio Basico</MDBCardTitle>
              <p className="text-muted">
                All the essentials for starting a business
              </p>
              <p className="h2 fw-bold">
                Free
                <small className="text-muted" style={{ fontSize: "18px" }}>
                  
                </small>
              </p>
              <MDBBtn
                href="#"
                color="warning"
                className="d-block mb-2 mt-3 text-capitalize"
                onClick={handleSubmitFree}
              >
                Selecionar
              </MDBBtn>
            </MDBCardBody>
            

            <MDBCardFooter>
              <p
                className="text-uppercase fw-bold"
                style={{ fontSize: "12px" }}
              >
                What's included
              </p>
            
              <MDBTypography listUnStyled className="mb-0 px-4">
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                  <small>
               
                  <i class="ri-checkbox-circle-line"></i> Compra e venda
             
                  </small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                  <small>    <i class="ri-checkbox-circle-line"></i> Compra e venda</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                  <small>    <i class="ri-checkbox-circle-line"></i> Compra e venda</small>
                </li>
              </MDBTypography>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
        <MDBCol md="2">
        
        </MDBCol>

        <MDBCol md="3">
          <MDBCard border="dark">
            <MDBCardBody className="mx-2">
              <MDBCardTitle className="my-2">Anuncio Premium</MDBCardTitle>
              <p className="text-muted">
                All the essentials for starting a business
              </p>
              <p className="h2 fw-bold">
                €40
                <small className="text-muted" style={{ fontSize: "18px" }}>
                  /ano
                </small>
              </p>
              <MDBBtn
                href="#"
                color="warning"
                className="d-block mb-2 mt-3 text-capitalize"
              >
                <Link to="RegisterAcout"  style={{textDecoration: 'none',color:'white'}}>
                    Selecionar
              </Link> 
              </MDBBtn>
            </MDBCardBody>

            <MDBCardFooter>
              <p
                className="text-uppercase fw-bold"
                style={{ fontSize: "12px" }}
              >
                What's included
              </p>

              <MDBTypography listUnStyled className="mb-0 px-4">
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> Compra e venda</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> Compra e venda</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> Compra e venda</small>
                </li>
                <li className="mb-3">
                  <MDBIcon fas icon="check" className="text-success me-3" />
                   <small>    <i class="ri-checkbox-circle-line"></i> Compra e venda</small>
                </li>
              </MDBTypography>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
      
    </div>
  );
}