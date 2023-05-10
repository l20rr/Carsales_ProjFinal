import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import api from '../services/api';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom'

import AdminAnuncio from './adminAnuncio';
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


function RegisterVhicle() {
  

  const [license, setLicense] = useState('');
  const [year, setYear] = useState('');

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [power, setPower] = useState('');
  const [numSeats, setNumSeats] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);

  const [brandValid, setBrandValid] = useState(true);
  const [modelValid, setModelValid] = useState(true);
  

  const brandRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  const modelRegex = /^[a-zA-Z0-9\s]+$/;


  const [negotiable, setNegotiable] = useState('');
  const [fuel, setFuel] = useState("");

  const [licenseValid, setLicenseValid] = useState(true);

  const [kms, setKms] = useState('');
  const [error, setError] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);

  const handleKmsChange = (event) => {
    const inputValue = event.target.value;
    const re = /^[0-9\b]+$/;
    if (inputValue < 0 || !(event.target.value === '' || re.test(event.target.value))) {
      setError('O valor não pode ser negativo!');
    } else {
      setError('');
      setKms(inputValue);
    }
  };

  const handleDescriptionBlur = () => {
    if (description === '') {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };



  const handleSeatsChange = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setNumSeats(event.target.value)
    }
  }


  const handlePriceChange = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setPrice(event.target.value)
    }
  }

  const handlePowerChange = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setPower(event.target.value)
    }
  }

  



  const handleLicenseChange = (event) => {
    setLicense(event.target.value);
    setLicenseValid(true);
  };

  const handleLicenseBlur = () => {
    const regex = /^(\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}\s\d{2}\s[A-Z]{2})$/;
    setLicenseValid(regex.test(license));
  };

  const handleFuelChange = (event) => {
    setFuel(event.target.value);
  };

  const handleNegotiableChange = (event) => {
    setNegotiable(event.target.value);
  };

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
              formData.append('negotiable', negotiable);
              formData.append('num_seats', numSeats);
              formData.append('subcategoryID', selectedSubcategory);
              formData.append('images', image);
              formData.append('images', image2);
              formData.append('images', image3);
            
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
              }
            };
            const handleImageChange2 = (event) => {
              if (event.target.files && event.target.files[0]) {
                setImage2(event.target.files[0]);
              }
            };
            const handleImageChange3 = (event) => {
              if (event.target.files && event.target.files[0]) {
                setImage3(event.target.files[0]);
              }
            };
            
            if (!authToken) return <Register />;
            
            const email = cookies.get('email');
          if (email === "admin@gmail.com") return <AdminAnuncio/>


          
  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrand(value);
    setBrandValid(brandRegex.test(value));
  };

  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
    setModelValid(modelRegex.test(value));
  };


  return (
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: 900, padding: 30 }}>
          <h2>Por favor, preencha todos os campos obrigatórios (*) para que possamos processar a seu cadastro. Obrigado!</h2>
        <Form  encType="multipart/form-data">
              <Row className="mb-4">
              <Form.Group controlId="formGridCity">
                <Form.Label>Marca *</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  required
                  value={brand}
                  onChange={handleBrandChange}
                  isInvalid={!brandValid}
                />
                <Form.Control.Feedback type="invalid">
                  Insira uma marca válida.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group controlId="formGridCity">
                <Form.Label>Modelo *</Form.Label>
                <Form.Control
                  id="model"
                  type="text"
                  required
                  value={model}
                  onChange={handleModelChange}
                  isInvalid={!modelValid}
                />
                <Form.Control.Feedback type="invalid">
                  Insira um modelo válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
              <Row className="mb-4">
                <Form.Group controlId="formGridCity">
                  <Form.Control type="file" onChange={handleImageChange} className="filetype" />
                  <img alt="preview image" src={image ? URL.createObjectURL(image) : null} style={{ width: "35vw", height: "40vh", margin:'20px' }} />     
                </Form.Group>
                <Form.Group controlId="formGridCity">
                  <Form.Control type="file" onChange={handleImageChange2} className="filetype" />
                  <img alt="preview image" src={image2 ? URL.createObjectURL(image2) : null} style={{ width: "35vw", height: "40vh", margin:'20px' }} />       
                </Form.Group>
                <Form.Group controlId="formGridCity">
                  <Form.Control type="file" onChange={handleImageChange3} className="filetype" />
                  <img alt="preview image" src={image3 ? URL.createObjectURL(image3) : null} style={{ width: "35vw", height: "40vh", margin:'20px' }} />       
                </Form.Group>
              </Row>   
            <Row className="mb-4">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Matricula *</Form.Label>
                        <Form.Control id='license'
                          type="text"
                          value={license}
                          onChange={handleLicenseChange}
                          onBlur={handleLicenseBlur}
                          className={licenseValid ? '' : 'invalid'}
                          />
                      </Form.Group>  
                      {!licenseValid && (
                      <div className="error-message"  style={{ color: 'red' }}>
                        Insira uma matrícula válida (00-AA-00 ou AA 00 AA).
                      </div>
                    )}      
                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Mês e Ano *</Form.Label>
                        <Form.Control id='year' 
                          type='month'
                          required
                          value={year}
                          onChange={e => setYear(e.target.value)} />
                      </Form.Group>
                      </Row>
                      <Row className="mb-4">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Kms rodados *</Form.Label>
                        <Form.Control id='kms'
                         pattern="[0-9]*"
                          type="number"
                          required
                          value={kms}
                          onChange={handleKmsChange}
                          min="0"
                          />
                      </Form.Group>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <Form.Group className="select__group" as={Col} controlId="formGridCity">
                      <Form.Label>Combustível *</Form.Label>
                        <Form.Select value={fuel} onChange={handleFuelChange}>
                          <option value="" disabled>
                            Escolha um...
                          </option>
                          <option value="Gasolina">Gasolina</option>
                          <option value="Gasoleo">Gasóleo</option>          
                            <option value="Híbrido">Híbrido</option>
                            <option value="Elétrico">Elétrico</option>
                            <option value="GPL">GPL</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="select__group" as={Col} controlId="formGridCity">
                        <Form.Label>Negociável? *</Form.Label>
                          <Form.Select value={ negotiable } onChange={handleNegotiableChange}>
                        <option value="" disabled>
                         Escolha se é ou não
                        </option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>          
                          </Form.Select>
                          </Form.Group>
                        </Row>
                        <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Preço *</Form.Label>
                        <Form.Control id='price'
                              type='number'
                          required
                          value={price}
                          onChange={handlePriceChange}
                          pattern="[0-9]*"
                          placeholder="Digite o preço" />
                        <Form.Control.Feedback type="invalid">
                          Insira apenas números positivos.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Potência (Kwatts) *</Form.Label>
                        <Form.Control id='power'
                              type='number'
                          required
                          value={power}
                          onChange={handlePowerChange}
                          pattern="[0-9]*"
                          placeholder="Digite a potência" />
                        <Form.Control.Feedback type="invalid">
                          Insira apenas números positivos.
                        </Form.Control.Feedback>
                      </Form.Group>
          
                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Numero de lugares *</Form.Label>
                        <Form.Control id='num_seats'
                          type='number'
                          required
                          pattern="[0-9]*"
                          value={numSeats}
                          onChange={handleSeatsChange} />
                      </Form.Group>  
                    </Row>
                    <Row className="mb-4">
                    <Form.Group controlId="description">
                      <Form.Label>Descrição *</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleDescriptionBlur}
                        style={{ borderColor: descriptionError ? 'red' : '' }}
                      />
                      {descriptionError && (
                        <Form.Text style={{ color: 'red' }}>
                          Este campo é obrigatório.
                        </Form.Text>
                      )}
                    </Form.Group>
                    </Row>
                  <Button variant="primary" onClick={handleSubmit}  style={{ display: 'flex', justifyContent: 'flex-end' }}>Seguinte</Button>
            </Form>
          </div>
          </div>
        );
}

export default RegisterVhicle;