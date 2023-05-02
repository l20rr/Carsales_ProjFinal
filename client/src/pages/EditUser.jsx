import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import api from '../services/api';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom'
import Register from "../components/Header/Register"
import DatePicker, { DateObject } from "react-multi-date-picker";
import Home from './Home';
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

const EditUser = () => {
    const emailAdm = cookies.get('email')
   const [email, setEmail] = useState('')
   const[fullname, setFullname] = useState('')
   const [password, setPassword] = useState('')
   const [locality , setLocality] = useState('');
   const [telem , setTelem] = useState('');
   const [birthdate , setBirthdate] = useState('');
    
    const { id } = useParams();
  
    useEffect(() => {
        api.get(`/cl/client/${id}`)
          .then(response => {
            const CliData = response.data;
            setTelem(CliData.telem)
            setLocality(CliData.locality)
            setBirthdate(CliData.birthdate)
            console.log(CliData)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    
      useEffect(() => {
        api.get(`/auth/Users/${id}`)
          .then(response => {
            const UserData = response.data;
            setEmail(UserData.email)
            setFullname(UserData.fullname)
           
            console.log(UserData)
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
   
  
   
    
    if(!authToken) return <Register />
    
  if (emailAdm != 'admin@gmail.com') return <Home />;
 
  async function handleSubmit(e) {
    e.preventDefault();
    const Userdata = {
        fullname:fullname ,
        email:email ,
        password: password,
    };

    try {
    
      const response = await api.put(`/auth/users/${id}`, Userdata);
      const invoiceID = response.data.ID
    
      const clientData = {
        locality: locality,
        telem: telem,
        birthdate: birthdate,
      };

        await api.put(`/cl/${id}`, clientData);
    


    } catch (error) {
      console.log(error);
      alert('Erro ');
    }
  }

    if (!authToken) return <Register />;
  
    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
  <div style={{ width: '100%', maxWidth: 900, padding: 30 }}>
    <h1>Editar dados do user: {fullname}</h1>
  <Form>
  <Row className="mb-3">
              <Form.Group  controlId="formGridCity">
                  <Form.Label>Email</Form.Label>
                  <Form.Control id='email'
                    type='text'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                </Form.Group>
  </Row>
  <Row className="mb-3">
                <Form.Group  controlId="formGridCity">
                  <Form.Label>Nome completo</Form.Label>
                  <Form.Control id='fullname'
                    type='text'
                    required
                    value={fullname}
                    onChange={e => setFullname(e.target.value)} />
                </Form.Group>
  </Row>
  <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Password</Form.Label>
                          <Form.Control id='password'
                            type='text'
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        </Form.Group>        
                        
  </Row>
  <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Morada</Form.Label>
                          <Form.Control id='locality'
                            type='text'
                            required
                            value={locality}
                            onChange={e => setLocality(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>Tel</Form.Label>
                          <Form.Control id='telem'
                            type='tel'
                            required
                            value={telem}
                            onChange={e => setTelem(e.target.value)} />
                        </Form.Group>
  </Row>
  <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Data </Form.Label>
                          <Form.Control id='birthdate'
                            type='date'
                            required
                            value={birthdate}
                            onChange={e => setBirthdate(e.target.value)} />
                        </Form.Group>
            
                      </Row>
                     
                    <Button variant="primary" onClick={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end' }}>Editar</Button>
              </Form>
            </div>
            </div>
          );
  
  
};

export default EditUser;