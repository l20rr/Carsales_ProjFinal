import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";

const cookies = new Cookies();
function AnunciosExternos() {
  const [anuncios, setAnuncio] = useState([]);

  const email = cookies.get('email')

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('http://localhost:3002/anuncios');
      console.log(response.data)
      setAnuncio(response.data);
    }
    fetchUsers();
  }, []);
  
 
  
  async function handleDelete(_id) {
    console.log('Deleting user with ID:', _id);
    try {
      const response = await axios.delete(`http://localhost:3002/anuncios/${_id}`);
      if (response.status === 200) {
        console.log('User deleted successfully');
        window.location.reload(); 
      }
      console.log(`User with ID ${_id} has been deleted`);
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }
  
  



  if (email != 'admin@gmail.com') return <Home />;
  return (
    <>
    <Container>
      <div className="d-grid gap-3">
      <Card.Header className="d-grid gap-2">
      <Card.Title as="h1">Admin Page</Card.Title>
      <Card.Title as="h3">Anuncios Externos</Card.Title>
      </Card.Header>
      <div style={{ display: 'flex', justifyContent:'flex-end' }}>
        <Link to={'anuncioadm'} ><Button  variant="primary">cadastrar</Button></Link>
      </div>
        <Table striped bordered hover>
          <thead>
            <tr>
          
              <th>Descricao</th>
              <th>Imagem</th>
              <th>Link At</th>
              <th>Serviço</th>
            </tr>
          </thead>
          <tbody>
            {anuncios.map(an => (
              <tr key={an.anuncianteId}>
                <td>{an.descricao}</td>
                <td>{an.imagem}</td>
                <td>{an.link}</td>
                <td>{an.nivelServico}</td>
                <td>
                   <Button variant="danger" onClick={() => handleDelete(an._id)}>Eliminar</Button>{' '}
                 
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
    </>
  );
  
}

export default AnunciosExternos;