import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
import { Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

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
                  <Button variant="danger" onClick={() => handleDelete(Ad.ID)}  >Eliminar</Button>{' '}
                  <Link to={`/editV/${Ad.ID}`}><Button variant="primary" >Editar</Button></Link>
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