import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import { NavLink, Link, useParams } from 'react-router-dom';
import  SideBar from "./SideBar";
import { StreamChat } from 'stream-chat';

import {
  MDBContainer,
  MDBBtn,
} from 'mdb-react-ui-kit';

const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'vxwzb46w7drg';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
      id: cookies.get('userID'),
      fullname: cookies.get('fullname'),
      name: cookies.get('email'),
      hashedPassword: cookies.get('hashedPassword'),
  }, authToken)
}


function Fav() {
    const [Ads, setAds] = useState([]);
    const userID = cookies.get('userID');


    useEffect(() => {
      async function fetchAds() {
          const response = await api.get(`fav/favorites/${userID}`)
        setAds(response.data);
      }
      fetchAds();
    }, []);
    
  
    const settings = {
      fade: true,
      speed: 2000,
      autoplaySpeed: 3000,
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
    };
    
    return (
      <>
     
    <div style={{display:'flex', margin:'0 auto'}}>
    <SideBar/>
    <MDBContainer>
            <form>
              <h3>Os seus Favoritos</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Matricula</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano/Mês fabrico</th>
            </tr>
          </thead>
          <tbody>
            {Ads.map(ad => (
              <tr key={ad.ID}>
                <td>{ad.license}</td>
                <td>{ad.brand}</td>
                <td>{ad.model}</td>
                <td>{ad.year}</td>
                <td>
                  <Link to={`/cars/${ad.vehicleID}`}><button style={{padding:'10px', color:'#000', border:'none', backgroundColor:'yellow'}} >Detalhes</button></Link>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </form>
            </MDBContainer>
        </div>
      </>
    );
        }

export default Fav;