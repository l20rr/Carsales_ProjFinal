import React from "react";
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
export default function  Registeradverts() {
  return (
    <div style={{backgroundColor:"#000d6b", height:1000}}>
      
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