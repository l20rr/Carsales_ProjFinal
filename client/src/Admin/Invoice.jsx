import  SideBar from "./SideBar";
import React,{useState , useEffect}from 'react';
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
const Invoice = () => {

  
  const userId = cookies.get('userId');
  const userID = cookies.get('userID');
  const fullname = cookies.get('fullname');
  const invoiceID = cookies.get('invoiceID')
  const [email, setEmail] = useState('');
  const [NIF, setNif] = useState('');
  const[invoice_date, setInvoice_date] = useState('')
  const [Postal_code, setPostal_code] = useState('')
  const [amount, setAmount] = useState('')
  const [total,setTotal] = useState('')
  const [creditCardDate, setCreditCardDate] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [locality, setLocality] = useState('');
  const [telem , setTelem] = useState('');

  useEffect(() => {
    api.get(`/in/Invoice/${invoiceID}`)
      .then(response => {
        const invoiceData = response.data;
        setEmail(invoiceData.email);
        setNif(invoiceData.NIF);
        setInvoice_date(invoiceData.invoice_date)
        setPostal_code(invoiceData.Postal_code)
        setAmount(invoiceData.amount)
        setTotal(invoiceData.total)
      })
      .catch(error => {
        console.log(error);
      });
  }, [invoiceID]);

  useEffect(() => {
    api.get(`/pay/Pay/${invoiceID}`)
      .then(response => {
        const CardData = response.data;
        setCreditCardDate(CardData.CredCard_date)
        setCreditCard(CardData.CredCard)
        console.log(CardData)
      })
      .catch(error => {
        console.log(error);
      });
  }, [invoiceID]);

  useEffect(() => {
    api.get(`/cl/client/${userID}`)
      .then(response => {
        const CliData = response.data;
        setTelem(CliData.telem)
        setLocality(CliData.locality)
        console.log(CliData)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{display: 'flex'}}>
    < SideBar/>
    <div style={{margin:'100px auto',width:'70%'}}>
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
                        <label>Nome</label>
                        <Form.Control
                        value={fullname}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Endereço</label>
                        <Form.Control
                       type="text" 
                       value={locality}
                       disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>tel</label>
                        <Form.Control
                        type="number"
                      value={telem}
                      disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr/>
                  <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                         value={email}
                         disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Código Postal</label>
                        <Form.Control
                        value={Postal_code}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Data da compra</label>
                        <Form.Control
                         value={invoice_date}
                         disabled
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
                          value={NIF}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Preço</label>
                        <Form.Control
                          value={amount}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Preço (IVA)</label>
                        <Form.Control
                          value={total}
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                  <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>validade cartao</label>
                        <Form.Control
                        value={creditCardDate}
                        disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Num cartao</label>
                        <Form.Control
                         value={creditCard}
                         disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                 
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br/>
      <Button>Imprimir</Button>
      <br/>
      <br/>
      <Button>Enviar por email</Button>
    </div>

    </div>
    

  );
};

export default Invoice;