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
    const userID = cookies.get('userID');


  useEffect(() => {
    async function fetchAds() {
      const response = await api.get(`/in/listInvoice/${userID}`);
      setAds(response.data);
    }
    fetchAds();
  }, []);


  return (
    <div style={{display: 'flex'}}>
    < SideBar/>
    <form style={{ margin: '50px auto', maxWidth: '800px' }}>
      
        <Table>
          <thead>
            <tr>
              <th>Nº da fatura</th>
              <th>Data da fatura</th>
              <th>Email</th>
              <th>Matricula</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Cartão de Crédito</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Ads.map(Ad => (
              <tr key={Ad.ID}>
                <td>{Ad.ID}</td>
                <td>{Ad.invoice_date}</td>
                <td>{Ad.email}</td>
                <td>{Ad.license}</td>
                <td>{Ad.brand}</td>
                <td>{Ad.model}</td>
                <td>{Ad.CredCard}</td>
                <td>{Ad.total}</td>
                <td>
                  <Link to={`/Invoice/${Ad.ID}`}><Button variant="primary" >Emitir</Button></Link>
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