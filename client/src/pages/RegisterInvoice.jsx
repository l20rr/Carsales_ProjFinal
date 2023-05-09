import React,{useState}from 'react';
import api from '../services/api';
import AdminAnuncio from './adminAnuncio';
// react-bootstrap components
import {

  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import moment from 'moment';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom'

const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'vxwzb46w7drg';
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
  const [PostalCode, setPostalCode] = useState('');
  const [creditCardDate, setCreditCardDate] = useState('');
  const [creditCard, setCreditCard] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: email,
      invoice_date: invoice_date,
      NIF: NIF,
      Postal_code: PostalCode,
      amount: 11,
      tax_amount: 0.28,
      total: 40,
      purchaseID: purchaseID
    };

    try {
      const response = await api.post('/in/invoice', data);
      const invoiceID = response.data.ID
      cookies.set('invoiceID', invoiceID, {
        path: '/',
        expires: new Date('9999-12-31'),
      });

      
      const paymentdata = {
        CredCard:creditCard,
        CredCard_date:creditCardDate,
        invoiceID:invoiceID,
      }
      const responsepay = await api.post('/pay/payment', paymentdata);
      console.log(responsepay)

      const priority = {
        publishadID:publishadID,
        invoiceID:invoiceID,
        priorityAD_date:moment().format('YYYY-MM-DD'),
      }
      const responsepri = await api.post('/pri/priorityadvert', priority);

      window.location.href = '/home'

    } catch (error) {
      console.log(error);
      alert('Erro ao registrar fatura!');
    }
  }
  

if (email === "admin@gmail.com") return <AdminAnuncio/>

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
                          value={PostalCode}
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
                        <label>Numero Fiscal (NIF)</label>
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
                        <label>Validade do cartão de crédito</label>
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
                        <label>Número de cartão de crédito</label>
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
