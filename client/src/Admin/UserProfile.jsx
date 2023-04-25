import React from "react";
import  SideBar from "./SideBar";

import { useParams } from 'react-router-dom';

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
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  

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

    const authToken = cookies.get("token");

    const logout = () => {
      cookies.remove("token");
      cookies.remove('userId');
      cookies.remove('fullname');
      cookies.remove('email');
      cookies.remove('hashedPassword');
      localStorage.clear();
      window.location.reload();
      window.location.href= '/home';
  }




  const [locality , setLocality] = useState(null);
  const [telem , setTelem] = useState(null);
  const [birthdate , setBirthdate] = useState(null);
  const [selectedUserId , setSelectedUserId] = useState('');
  const userId = cookies.get('userId');
  
  useEffect(() => {
    const storedData = localStorage.getItem(`userData_${userId}`);
    if (storedData) {
      const {locality, telem, birthdate } = JSON.parse(storedData);
      setLocality(locality);
      setTelem(telem);
      setBirthdate(birthdate);
    }
  }, [userId]);

  useEffect(() => {
    if (locality && telem && birthdate) {
      localStorage.setItem(`userData_${userId}`, JSON.stringify({ locality, telem, birthdate }));
    }
  }, [locality, telem, birthdate, userId]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get('cl/client/'+userId);
        setSelectedUserId(response.data.id)
        setLocality(response.data.locality);
        setTelem(response.data.telem);
        setBirthdate(response.data.birthdate);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [userId]);


  async function handleDeleteAccount(id) {
    try {
      const response = await api.delete(`/auth/Users/${id}`);
      if (response.status === 200) {
        console.log('User deleted successfully')
        //logout(true)
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('fullname');
        cookies.remove('email');
        cookies.remove('hashedPassword');
        localStorage.clear();    
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    window.location.reload();
    window.location.href= '/home';

 
  }

    /*const handleDeleteAccount = (id) => {
      fetch(`http://localhost:3000/auth/Users/${id}`, {
        method: 'DELETE'
       
      })
      console.log
      .then(response => {
        if (response.ok) {
          console.log('User deleted successfully');
          logout(true);
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });  }

      */
    

  if(!authToken) return <Register />
  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      locality: locality,
      telem: telem,
      birthdate: birthdate,
      userId: userId
    };
    
      
      console.log(data);

      if(locality!==''&&telem!==''&&birthdate!==''){
        const response = await api.put('/cl/userData',data);

        if(response.status===201){
          toggleModalChange();
        }else{
          alert('Erro ao cadastrar !');
        }    
      }else{
        alert('Por favor, preencha todos os dados!'); 
      }
      
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
            <MDBInput type="hidden" value={userId} />
            
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
        <Button onClick={() => setDeleteConfirmationModalOpen(true)} >
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

    {/* Apagar conta */}

    <form >
      <MDBModal isOpen={deleteConfirmationModalOpen} toggle={() => setDeleteConfirmationModalOpen(false)}>
        <MDBModalHeader toggle={() => setDeleteConfirmationModalOpen(false)}>Tem a certeza que quer apagar a sua conta?</MDBModalHeader>
        <MDBModalBody>
          <p>Todos os seus dados e conversas serão perdidos permanentemente.</p>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setDeleteConfirmationModalOpen(false)}>Cancelar</MDBBtn>
          <MDBBtn class='deleteButton' color="danger" onClick={() => handleDeleteAccount(userId)}>Apagar</MDBBtn>
        </MDBModalFooter>
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
                          <MDBCardText className="text-muted">{telem}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Data de Nascimento:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{birthdate}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Morada:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{locality}</MDBCardText>
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