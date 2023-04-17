import React,{useState}from 'react';
import { Link } from "react-router-dom";
import api from '../services/api'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';

import Register from "../components/Header/Register"

const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'cd4bcsnrt3ej';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        fullname: cookies.get('fullname'),
        name: cookies.get('email'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}


function RegisterCategory() {
  const [categoryName , setCategoryName] = useState('');
  
  if(!authToken) return <Register />
  function handleSelectChange(event) {
    setCategoryName(event.target.value);
  }


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post('/cat/addCat', { categoryName });
      console.log(response.data); // ou faça algo com a resposta do servidor
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ display: 'block', 
    width: 900,
    marginLeft: 500,
    marginTop:200, 
    padding: 30 ,
    height:600}}>
      <Form>
    



    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Categoria</Form.Label>
        <Form.Select defaultValue="ecolha a categoria..." value={categoryName} onChange={handleSelectChange}>
          <option value={'Mota'} id='Mota'  >Mota</option>
          <option value={'Carro'} id='Carro'>Carro</option>
          <option value={'Autocaravana'} id='Autocaravana'>AutoCaravana</option>
        </Form.Select>
      </Form.Group>
    </Row>
    <Button variant="primary"  onClick={handleSubmit} style={{ display: 'flex', 
    marginLeft: 800,
  
   }}>
    <Link to="RegisterSub" className=" d-flex align-items-center gap-1"  style={{
   
   textDecoration: 'none',
   color:'white'
    }}>
    next
              </Link>
           
    </Button>
   

  </Form>
  </div>
  );
}


export default RegisterCategory;