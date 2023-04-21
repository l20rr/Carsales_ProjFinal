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
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  
  const { subcategoryID } = useParams();

  useEffect(() => {
    async function fetchSubcategory() {
    try {
    const response = await api.get('subcat/subcat/' +subcategoryID);
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
  const data = {
  license:license,
  year:year,
  kms:kms,
  brand:brand,
  model:model,
  fuel:fuel,
  description:description,
  price:price,
  power:power,
  num_seats: numSeats,
  image:image,
  subcategoryID:selectedSubcategory,
  };
  if (
    license !== '' &&
    year !== '' &&
    kms !== '' &&
    brand !== '' &&
    model !== '' &&
    fuel !== '' &&
    price !== '' &&
    power !== '' &&
    numSeats !== ''
  ) {
    try {
      const response = await api.post('/vehicle/addvehicle', data);
      if (response.status === 200) {
        window.location.href = '/Registeradverts';
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar!');
    }
  } else {
    alert('Por favor, preencha todos os dados!');
  }
  }
  
  function handleImageChange(event) {
  if (event.target.files && event.target.files[0]) {
  setImage(URL.createObjectURL(event.target.files[0]));
  }
  }
  
  if (!authToken) return <Register />;

    return (
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
<div style={{ width: '100%', maxWidth: 900, padding: 30 }}>
<Form>
<Row className="mb-3">
<div>
<h2>
{selectedSubcategory.SubcategoryName} {selectedSubcategory.categoryID}
</h2>
</div>
              <Form.Group as={Col}>
                <Form.Label>Brand</Form.Label>
                <Form.Control id='name'
                  type='text'
                  required
                  value={brand}
                  onChange={e => setBrand(e.target.value)} />
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Model</Form.Label>
                <Form.Control id='model'
                  type='text'
                  required
                  value={model}
                  onChange={e => setModel(e.target.value)} />
              </Form.Group>
              <br/>
              <div>
               <input type="file" onChange={handleImageChange} className="filetype" />
                <img alt="preview image" src={image}/>
            </div>

            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>description</Form.Label>
                <Form.Control id='description'
                  type='text'
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)} />
              </Form.Group>
            </Row>
  
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>License</Form.Label>
                <Form.Control id='license'
                  type='text'
                  required
                  value={license}
                  onChange={e => setLicense(e.target.value)} />
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Year</Form.Label>
                <Form.Control id='year'
                  type='number'
                  required
                  value={year}
                  onChange={e => setYear(e.target.value)} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>kms rodados</Form.Label>
                <Form.Control id='kms'
                  type='number'
                  required
                  value={kms}
                  onChange={e => setKms(e.target.value)} />
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>fuel</Form.Label>
                <Form.Control id='fuel'
                  type='text'
                  required
                  value={fuel}
                  onChange={e => setFuel(e.target.value)} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Price</Form.Label>
                <Form.Control id='price'
                  type='number'
                  required
                  value={price}
                  onChange={e => setPrice(e.target.value)} />
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Power</Form.Label>
                <Form.Control id='power'
                  type='number'
                  required
                  value={power}
                  onChange={e => setPower(e.target.value)} />
              </Form.Group>
  
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>num seats</Form.Label>
                <Form.Control id='num_seats'
                  type='number'
                  required
                  value={numSeats}
                  onChange={e => setNumSeats(e.target.value)} />
              </Form.Group>
            </Row>


            <Button variant="primary" onClick={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end' }}>next</Button>
    </Form>
    </div>
    </div>
  );
}

export default RegisterVhicle;

