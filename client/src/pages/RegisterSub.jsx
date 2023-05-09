import React,{useState,useEffect}from 'react';
import api from '../services/api'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom';
import EXCategory from '../components/UI/EXCategory';
import Register from "../components/Header/Register"
import AdminAnuncio from './adminAnuncio';
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
function RegisterSub() {
  const [SubcategoryOptions, setSubCategoryOptions] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const {IDCategory} = useParams()

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get('subcat/subAll/'+IDCategory)
      setSubCategoryOptions(response.data);
    }
    fetchCategories();
  }, []);

  if (!authToken) return <Register />;

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = `/cars/registerCategory/registerSub/registerVhicle/${selectedSubCategory}`;
  }
  
  const email = cookies.get('email');
if (email === "admin@gmail.com") return <AdminAnuncio/>

  return (
    <div className="container" style={{ width: '100vw',height: '80vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
  <Form style={{ width: '100vw', margin:'50px' }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Sub-categoria</Form.Label>
            <Form.Select
              defaultValue=""
              value={selectedSubCategory}
              onChange={(event) => setSelectedSubCategory(event.target.value)}
            >
              <option value="">Escolha a sub-categoria...</option>
              {SubcategoryOptions.map((category) => (
                <option key={category.ID} value={category.ID}>
                  {category.SubcategoryName}
                </option>
              ))}
            </Form.Select>
            <br/>
            <br/>
            <Button variant="primary" onClick={handleSubmit}>Selecionar</Button>
          </Form.Group>
        </Row>
      </Form>
      <EXCategory/>
    </div>
  );
}

export default RegisterSub;