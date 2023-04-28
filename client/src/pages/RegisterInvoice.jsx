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
  const {publishadID} = useParams()
  const {purchaseID} = useParams()
  const [email, setEmail] = useState('');
  const [NIF, setNIF] = useState('');
  const [invoice_date, setInvoiceDate] = useState(moment().format('YYYY-MM-DD'));
  const [postalCode, setPostalCode] = useState('');
  const [creditCardDate, setCreditCardDate] = useState('');
  const [creditCard, setCreditCard] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: email,
      invoice_date: invoice_date,
      NIF: NIF,
      Postal_code: postalCode,
      amount: 40,
      tax_amount: 0.28,
      total: 900,
      purchaseID: purchaseID
    };

    try {
      const response = await api.post('/in/invoice', data);
      const invoiceID = response.data.id
      cookies.set('invoiceID',invoiceID)

      const paymentdata = {
        creditCard:creditCard,
        creditCardDate:creditCardDate,
        invoiceID:invoiceID,
      }
      const responsepay = await api.post('/pay/payment', paymentdata);

      const priority = {
        publishadID:publishadID,
        invoiceID:invoiceID,
        priorityAD_date:moment().format('YYYY-MM-DD'),
      }
      const responsepri = await api.post('/pri/priorityadvert', priority);
    } catch (error) {
      console.log(error);
      alert('Erro ao registrar fatura!');
    }
  }
  

  return (
    <div style={{ display: "flex", margin: "0 auto", padding: 30, height: 800 }}>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Fatura</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Email</label>
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
                        <label>Código Postal</label>
                        <Form.Control
                          id='postalCode'
                          type='number'
                          required
                          value={postalCode}
                          onChange={e => setPostalCode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Data da compra</label>
                        <Form.Control
                          value={invoice_date}
                          onChange={e => setInvoiceDate(moment().format('YYYY-MM-DD'))}
                          type='date'
                          disabled
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr />
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
                        <label>creditCardDate</label>
                        <Form.Control
                          id='creditCardDate'
                          value={creditCardDate}
                          type='date'
                          required
                          onChange={e => setCreditCardDate(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>creditCard</label>
                        <Form.Control
                          id='creditCard'
                          value={creditCard}
                          type='number'
                          required
                          onChange={e => setCreditCard(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>




                  </Row>
                  <br />
                  <Button
                    className="btn-fill pull-left"
                    type="submit"
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
