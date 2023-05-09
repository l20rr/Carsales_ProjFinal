import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
import { NavLink, Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
} from "react-bootstrap";

const cookies = new Cookies();
function Anuncios() {
    const [Ads , setAds] = useState([])

  const email = cookies.get('email')

  useEffect(() => {
    async function fetchAds() {
      const response = await api.get('/publi/listAllAD');
      setAds(response.data);
    }
    fetchAds();
  }, []);

 
  async function handleDelete(publishADID) {
    console.log('Deleting user with ID:', publishADID);
    try {
      const response = await api.delete(`/vehicle/vehicle/${publishADID}`);
      if (response.status === 200) {
        console.log('User deleted successfully')
      }
      
  
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }

  if (email != 'admin@gmail.com') return <Home />;
  return (
    <Container>
      <div className="d-grid gap-3">
      <Card.Header className="d-grid gap-2">
      <Card.Title as="h1">Admin Page</Card.Title>
      <Card.Title as="h3">Anuncios de Clientes</Card.Title>
      </Card.Header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoria</th>
              <th>Matricula</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
            </tr>
          </thead>
          <tbody>
            {Ads.map(Ad => (
              <tr key={Ad.vehicleID}>
                <td>{Ad.vehicleID}</td>
                <td>{Ad.categoryName}</td>
                <td>{Ad.license}</td>
                <td>{Ad.brand}</td>
                <td>{Ad.model}</td>
                <td>{Ad.year}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(Ad.vehicleID)}  >Eliminar</Button>{' '}
                  <Link to={`/editV/${Ad.vehicleID}`}><Button variant="primary" >Editar</Button></Link>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
  
}

export default Anuncios;