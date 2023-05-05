import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
import { Button } from 'react-bootstrap';

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

 

  if (email != 'admin@gmail.com') return <Home />;
  return (
    <form>
      <div>
        <h1>Admin Page</h1>
        <br />
        <br />
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>year</th>
            </tr>
          </thead>
          <tbody>
            {Ads.map(Ad => (
              <tr key={Ad.ID}>
                <td>{Ad.ID}</td>
                <td>{Ad.brand}</td>
                <td>{Ad.model}</td>
                <td>{Ad.year}</td>
                <td>
                  <Button variant="danger" >Eliminar</Button>{' '}
                  <Button variant="primary">Editar</Button>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </form>
  );
  
}

export default Anuncios;