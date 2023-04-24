import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { StreamChat } from 'stream-chat';
import Register from "../../components/Header/Register"
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { useState, useEffect } from 'react';

import "../../styles/header.css";
import api from '../../services/api'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,

  MDBCheckbox,
  MDBCardSubTitle,
  MDBModalContent,
  MDBModalDialog
}
from 'mdb-react-ui-kit';




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




const RegisterClient = () => {
    const [locality , setLocality] = useState(null);
    const [telem , setTelem] = useState(null);
    const [birthdate , setBirthdate] = useState(null);
    const [selectedUserId , setSelectedUserId] = useState('');
    const userId = cookies.get('userId');
    
    useEffect(() => {
      const storedData = localStorage.getItem(`userData_${userId}`);
      if (storedData) {
        const { locality, telem, birthdate } = JSON.parse(storedData);
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
    if (!authToken) return <Register />;

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
          const response = await api.post('/cl/userData',data);
  
          if(response.status===201){
            
          }else{
            alert('Erro ao cadastrar !');
          }
        }else{
          alert('Por favor, preencha todos os dados!');
        }
        window.location.href= '/home';
      }
    
  
      return (
        <div className="modal-wrapper">
          <>
            <MDBModalHeader>Definições da conta</MDBModalHeader>
            
            <MDBModalBody>
              <Form>
                <MDBInput type="number" required value={telem} onChange={(e) => setTelem(e.target.value)} label="Telemóvel" />
                <MDBInput type="date" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} label="Data de nascimento" />
                <MDBInput type="text" required value={locality} onChange={(e) => setLocality(e.target.value)} label="Morada" />
                <MDBInput type="hidden" value={userId} />
      
                <MDBModalFooter>
                <MDBBtn color="danger" onClick={handleSubmit}>
                    Cancelar
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={handleSubmit}>
                    Adicionar
                  </MDBBtn>
                 
                </MDBModalFooter>
              </Form>
            </MDBModalBody>
            <MDBModalHeader>Para poder publicar anuncios tem de preencher estes dados</MDBModalHeader>
          </>
      
          <style jsx>{`
            .modal-wrapper {
              height: 100vh;
              width: 100vw;
            }
            Form {
              max-width: 400px;
              width: 100%;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #fff;
            }
          `}</style>
        </div>
      );
      
          }

export default RegisterClient;