import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <Link to={'anuncioadm'} ><Button variant="primary">cadastrar</Button></Link>
   
    <form>
      <div>
        <h1>Admin Page</h1>
        <br />
        <br />
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>descricao</th>
              <th>imagem</th>
              <th>link At</th>
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
    </form>
    </>
  );
  
}

export default AnunciosExternos;