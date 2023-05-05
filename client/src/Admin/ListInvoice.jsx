import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import  SideBar from "./SideBar";

const cookies = new Cookies();
function ListInvoice() {
    const [Ads , setAds] = useState([])
    const clientID = cookies.get('clientID');


  useEffect(() => {
    async function fetchAds() {
      const response = await api.get(`/in/listInvoice/${clientID}`);
      setAds(response.data);
    }
    fetchAds();
  }, []);


  return (
    <div style={{display: 'flex'}}>
    < SideBar/>
    <form>
      
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
                  <Link to={`/editV/${Ad.ID}`}><Button variant="primary" >Editar</Button></Link>
              </td>
              </tr>
            ))}
          </tbody>
        </Table> 
    </form>
    </div>
  );
  
}

export default ListInvoice;