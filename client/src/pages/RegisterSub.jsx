import React,{useState,useEffect}from 'react';
import api from '../services/api'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {useParams} from 'react-router-dom';

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

  return (
    <div className="container">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              defaultValue=""
              value={selectedSubCategory}
              onChange={(event) => setSelectedSubCategory(event.target.value)}
            >
              <option value="">Escolha a categoria...</option>
              {SubcategoryOptions.map((category) => (
                <option key={category.ID} value={category.ID}>
                  {category.SubcategoryName}
                </option>
              ))}
            </Form.Select>
            <Button variant="primary" onClick={handleSubmit}>Ir para a URL</Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

export default RegisterSub;