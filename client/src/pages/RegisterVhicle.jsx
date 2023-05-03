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
function RegisterVhicle() {
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
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  
  const { subcategoryID } = useParams();

  useEffect(() => {
    async function fetchSubcategory() {
    try {
    const response = await api.get('subcat/subcat/' + subcategoryID);
    setSelectedSubcategory(response.data.ID)
    console.log(response.data);
    } catch (error) {
    console.error(error);
    }
    }
    fetchSubcategory();
  }, []);
    
  
  if(!authToken) return <Register />
  async function handleSubmit() {
    const formData = new FormData();
    formData.append('license', license);
    formData.append('year', year);
    formData.append('kms', kms);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('fuel', fuel);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('power', power);
    formData.append('num_seats', numSeats);
    formData.append('subcategoryID', selectedSubcategory);
    formData.append('image', image);
    formData.append('image2', image2);
    formData.append('image3', image3);
  
    try {
      const response = await api.post('/vehicle/addvehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      const vehicleID = response.data.id;
      window.location.href = `/Registeradverts/${vehicleID}`;
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar!');
    }
  }
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImage2(event.target.files[0]);
      setImage3(event.target.files[0]);
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
            <Form.Group controlId="formGridCity">
                <Form.Control type="file" onChange={handleImageChange} className="filetype" multiple/>   
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
                          type='month'
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
                  <Button variant="primary" onClick={handleSubmit}  style={{ display: 'flex', justifyContent: 'flex-end' }}>next</Button>
            </Form>
          </div>
          </div>
        );
}

export default RegisterVhicle;