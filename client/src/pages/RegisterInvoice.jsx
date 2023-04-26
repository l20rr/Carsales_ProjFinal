import React,{useState,useEffect}from 'react';
import api from '../services/api';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";
import moment from 'moment';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom'
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
function RegisterInvoice() {
  const [email, setEmail] = useState(cookies.get('email'));
  const [NIF, setNIF] = useState('');
  const [invoice_date, setinvoice_date] = useState(moment().format('YYYY-MM-DD'));
  const [Postal_code, setPostalCode] = useState('');
  const [CredCard_date, setCredCard_date] = useState('');
  const [CredCard, setCredCard] = useState('');


  if(!authToken) return <Register />
  
  async function handleSubmit() {
    const data = {
      email: email,
      NIF: NIF,
      invoice_date: invoice_date,
      Postal_code: Postal_code,
      CredCard: CredCard,
      amount: 40,
      toal: 40 * 0.23,
      tax_amount: 9.2,
      purchaseID: 1
    };
  
    try {
      const response = await api.post('/in/invoice', data);
  
      const invoiceID = response.data.id;
  
      const paymentData = {
        CredCard_date: CredCard_date,
        CredCard: CredCard,
        invoiceID: invoiceID
      };
  
      await api.post('/pay/payment', paymentData);
  
     
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar!');
    }
  }



  return (
    <div style={{ display:"flex",
        margin:"0 auto",
    padding: 30,
    height:800}}>
   
  
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Fatura</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                  <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>email</label>
                        <Form.Control
                          id='email' 
                          value={email}
                          type='email'
                          required
                         
                          onChange={e => setEmail(e.target.value)} 
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                 
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                             id='PostalCode' 
                             type='number'
                             required
                            value={Postal_code}
                             onChange={e => setPostalCode(e.target.value)} 
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Data de compra</label>
                        <Form.Control
                        value={invoice_date}
                       
                        onChange={e => setinvoice_date(moment().format('YYYY-MM-DD'))} 
                        disabled
                        
                        type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 <hr/>
                 <Row>
                  <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>NIF</label>
                        <Form.Control
                             id='NIF' 
                             value={NIF}
                             type='number'
                             required
                            
                             onChange={e => setNIF(e.target.value)} 
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                 
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Num Cartão</label>
                        <Form.Control
                             id='CredCard' 
                             value={CredCard}
                             type='number'
                             required
                            
                             onChange={e => setCredCard(e.target.value)} 
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Data de validade</label>
                        <Form.Control
                            id='CredCard_date' 
                           value={CredCard_date}
                            type='date'
                            required 
                           
                            onChange={e => setCredCard_date(e.target.value)} 
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br/>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    
                  >
                    voltar
                  </Button>
                  <Button
                    className="btn-fill pull-left"
                    onClick={handleSubmit}
                    
                  >
                    Enviar
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
  </div>
  );
}

export default RegisterInvoice;
