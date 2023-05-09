import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';

import Col from 'react-bootstrap/Col';
import {useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import api from '../services/api';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import Register from "../components/Header/Register";

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

const EditVei = () => {
const { vehicleID } = useParams();
    const email = cookies.get('email')
    const [license, setLicense] = useState('');
    const [year, setYear] = useState('');
    const [kms, setKms] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [fuel, setFuel] = useState('');
    const [price, setPrice] = useState('');
    const [power, setPower] = useState('');
    const [numSeats, setNumSeats] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');
    
   
 useEffect(() => {
  api.get(`/vehicle/vehicle/${vehicleID}`)
    .then(response => {
      const Veih = response.data;
      console.log(response)
      setLicense(Veih.license)
      setYear(Veih.year)
      setKms(Veih.kms)
      setBrand(Veih.brand)
      setModel(Veih.model)
      setFuel(Veih.fuel)
      setPrice(Veih.price)
      setPower(Veih.power)
      setNumSeats(Veih.num_seats)
      setDescription(Veih.description)
      setId(Veih.id)
    })
    .catch(error => {
      console.log(error);
    });
}, []);

    if(!authToken) return <Register />

    async function handleSubmit() {
      const formData = {
        license:license,
        year:year,
        kms:kms,
        brand:brand,
        model:model,
        fuel:fuel,
        price:price,
        power:power,
        numSeats:numSeats,
        description:description,
      }
     
      try {
        const response = await api.put(`vehicle/vehicle/${id}`, formData);
    
        if(email != 'admin@gmail.com') {
          window.location.href = '/UserProfile'
         }else{
          window.location.href = '/anuncios'
         }
  
      
      } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar!');
      }
  
    };
    
    
    if (!authToken) return <Register />;
  
    return (
        
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: 900, padding: 30 }}>
      <Form  encType="multipart/form-data">
      <Row className="mb-3">
                <Form.Group  controlId="formGridCity">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control id='name'
                      type='text'
                      required
                      value={brand}
                      onChange={e => setBrand(e.target.value)} />
                  </Form.Group>
    </Row>
    <Row className="mb-3">
                  <Form.Group  controlId="formGridCity">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control id='model'
                      type='text'
                      required
                      value={model}
                      onChange={e => setModel(e.target.value)} />
                  </Form.Group>
    </Row>
    
    <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Matricula</Form.Label>
                            <Form.Control id='license'
                              type='text'
                              required
                              value={license}
                              onChange={e => setLicense(e.target.value)} />
                          </Form.Group>        
                          <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Mês e Ano de construção</Form.Label>
                            <Form.Control id='year' 
                              type='date'
                              required
                              value={year}
                              onChange={e => setYear(e.target.value)} />
                          </Form.Group>
    </Row>
    <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Kms rodados</Form.Label>
                            <Form.Control id='kms'
                              type='number'
                              required
                              value={kms}
                              onChange={e => setKms(e.target.value)} />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Combustivel</Form.Label>
                            <Form.Control id='fuel'
                              type='text'
                              required
                              value={fuel}
                              onChange={e => setFuel(e.target.value)} />
                          </Form.Group>
    </Row>
    <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control id='price'
                              type='number'
                              required
                              value={price}
                              onChange={e => setPrice(e.target.value)} />
                          </Form.Group>
              
                          <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Potência (Kwatts)</Form.Label>
                            <Form.Control id='power'
                              type='number'
                              required
                              value={power}
                              onChange={e => setPower(e.target.value)} />
                          </Form.Group>
              
                          <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Numero de lugares</Form.Label>
                            <Form.Control id='num_seats'
                              type='number'
                              required
                              value={numSeats}
                              onChange={e => setNumSeats(e.target.value)} />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Descrição Adicional</Form.Label>
                          <Form.Control id='description'
                            type='text'
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                        </Row>
                      <Button variant="primary"  onClick={handleSubmit}  style={{ display: 'flex', justifyContent: 'flex-end' }}>Editar</Button>
                </Form>
              </div>
              </div>
          );
};

export default EditVei;