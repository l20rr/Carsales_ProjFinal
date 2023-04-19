import React from "react";
import  SideBar from "./SideBar";

import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { useState, useEffect } from 'react';

import { StreamChat } from 'stream-chat';
import api from '../services/api';
import Register from "../components/Header/Register"
import Form from 'react-bootstrap/Form';

// react-bootstrap components
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';


import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

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

function UserProfile() {

  const cookies = new Cookies();

  const fullname = () => cookies.get('fullname');
  const email = () => cookies.get('email');

  const [modalOpenA, setModalOpenA] = useState(false);
  const [modalOpenB, setModalOpenB] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [tel, setTel] = useState('');

  const toggleModalChange = () => {
    setModalOpenA(!modalOpenA);
  }

  const toggleModalAdd = () => {
    setModalOpenB(!modalOpenB);
  }

  const togglePasswordModal = () => {
    setPasswordModalOpen(!passwordModalOpen);
  };

    const handleClickA = () => {
      toggleModalChange();
      
    }

    const handleClickB = () => {
      toggleModalAdd();
      
    }

  const [locality , setLocality] = useState('');
  const [telem , setTelem] = useState('');
  const [birthdate , setBirthdate] = useState('');
  const [userID, setUserID] = useState(null);

  useEffect(() => { 
        const userIDFromCookies = getUserIDFromCookies(); 
        setUserID(userIDFromCookies); 
      }, []);

  if(!authToken) return <Register />

  async function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
      locality: locality,
      telem: telem,
      birthdate: birthdate,
      userId: userID
    };
      
      console.log(data);

      if(locality!==''&&telem!==''&&birthdate!==''){
        const response = await api.post('/userData',data);

        if(response.status===200){
          window.location.href='/home'
        }else{
          alert('Erro ao cadastrar !');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }
    }
    function getUserIDFromCookies() {
    const cookies = document.cookie.split(';'); 
    for (let i = 0; i < cookies.length; i++) { 
      const cookie = cookies[i].trim(); 
      if (cookie.startsWith('userId=')) { 
        return cookie.substring('userId='.length, cookie.length); 
      } } 
      return null; 
    }

    

  return (
    <>

    {/* Adicionar dados do Utilizador */}

    
      <MDBModal isOpen={modalOpenB} toggle={toggleModalAdd}>
        <MDBModalHeader toggle={toggleModalAdd}>Definições da conta</MDBModalHeader>
        <MDBModalBody>
        <Form >
            <MDBInput type="number" required value={telem} onChange={e => setTelem(e.target.value)} label="Telemóvel" />
            <MDBInput type="date" required value={birthdate} onChange={e => setBirthdate(e.target.value)} label="Data de nascimento" />
            <MDBInput type="text" required value={locality} onChange={e => setLocality(e.target.value)} label="Morada" />
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleModalAdd}>Cancelar</MDBBtn>
            <MDBBtn color="primary" onClick={handleSubmit}  >Adicionar</MDBBtn>
          </MDBModalFooter>
        </Form>
        </MDBModalBody>
        
      </MDBModal>
    

    {/* Alterar dados do Utilizador */}

    <div>
      <MDBModal isOpen={modalOpenA} toggle={toggleModalChange}>
        <MDBModalHeader toggle={toggleModalChange}>Definições da conta</MDBModalHeader>
        <MDBModalBody>
      <DialogActions sx={{ flexDirection: 'column', gap: 2, my: 2 }}>
      { (
        <Button onClick={togglePasswordModal}>
          Mudar Password
        </Button>
        )}
        <Button >
          Mudar Email
        </Button>
        <Button >
          Apagar  Conta
        </Button>
      </DialogActions>
        </MDBModalBody>
      </MDBModal>
    </div>

    {/* Alterar Password */}

    <form >
      <MDBModal isOpen={passwordModalOpen} toggle={togglePasswordModal}>
        <MDBModalHeader toggle={togglePasswordModal}>Alterar Password</MDBModalHeader>
      <DialogContent dividers>
        
          <MDBInput type="text" name="fullname" label="Antiga password" />
          <MDBInput type="text" name="fullname" label="Nova password" />
      </DialogContent>
      <DialogActions>
        <MDBBtn color="primary" type="submit" form="change-name-form">Alterar</MDBBtn>
      </DialogActions>
      </MDBModal>
    </form>

    {/* Perfil do Utilizador */}

    <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '1500px' }}>
          <div style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-3">
              <MDBRow>
                <MDBCol>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                      <p className="text-muted mb-1">Full Stack Developer</p>
                      <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                      <div className="d-flex justify-content-center mb-2">
                      </div>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBCard className="mb-4 mb-lg-0">
                    <MDBCardBody className="p-0">
                      <MDBListGroup flush className="rounded-3">
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon fas icon="globe fa-lg text-warning" />
                          <MDBCardText>https://mdbootstrap.com</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                          <MDBCardText>mdbootstrap</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                          <MDBCardText>@mdbootstrap</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                          <MDBCardText>mdbootstrap</MDBCardText>
                        </MDBListGroupItem>
                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                          <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                          <MDBCardText>mdbootstrap</MDBCardText>
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Nome completo:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{fullname()}
                            <div onClick={handleClickA} style={{ float: 'right', cursor: 'pointer' }}><FontAwesomeIcon icon={faPencil} /></div>
                            <div onClick={handleClickB} style={{ float: 'right', cursor: 'pointer', marginRight: '15px' }}><FontAwesomeIcon icon={faPlus} /></div>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{email()}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Telemóvel:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted"></MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Data de Nascimento:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted"></MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Morada:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted"></MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>

                  <MDBRow>
                    <MDBCol md="6">
                      <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                          <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                          <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                          </MDBProgress>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBCard className="mb-4 mb-md-0">
                        <MDBCardBody>
                          <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                          <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                          </MDBProgress>

                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                          </MDBProgress>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>

          </div>
        </div>
      </div></>
  );
}

export default UserProfile;