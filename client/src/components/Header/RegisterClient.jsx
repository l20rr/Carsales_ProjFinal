import React,{useState}from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import "../../styles/header.css";
import api from '../../services/api'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

const cookies = new Cookies();



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
          const response = await api.post('/cl/userData',data);
  
          if(response.status===201){
            toggleModalAdd();
          }else{
            alert('Erro ao cadastrar !');
          }
        }else{
          alert('Por favor, preencha todos os dados!');
        }
      }
    
  
    return (
      <>      
          <MDBModalHeader>Definições da conta</MDBModalHeader>
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
          
      
        </>
        )
}

export default RegisterClient;