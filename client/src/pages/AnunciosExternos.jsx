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
      setAnuncio(response.data);
    }
    fetchUsers();
  }, []);
  

  
  



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
              <th>ID</th>
              <th>Descricao</th>
              <th>Imagem</th>
              <th>Link At</th>
              <th>Serviço</th>
            </tr>
          </thead>
          <tbody>
            {anuncios.map(an => (
              <tr key={an.anuncianteId}>
                <td>{an.anuncianteId}</td>
                <td>{an.descricao}</td>
                <td>{an.imagem}</td>
                <td>{an.link}</td>
                <td>{an.nivelServico}</td>
                <td>
                  <Button variant="danger" >Eliminar</Button>{' '}
                  <Link ><Button variant="primary">Editar</Button></Link>
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