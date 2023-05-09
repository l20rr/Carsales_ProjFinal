import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { CardBody } from 'reactstrap';


const cookies = new Cookies();
const authToken = cookies.get('token');

const apiKey = 'vxwzb46w7drg';
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    fullname: cookies.get('fullname'),
    name: cookies.get('email'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken);
}

function AdminAnuncio() {
  const [anuncianteId, setAnuncianteId] = useState(1); // começa com id 1
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [link, setLink] = useState('');
  const [nivelServico, setNivelServico] = useState(1); // começa como normal

   async function handleSubmit() {
    const formData = new FormData();
    formData.append('anuncianteId', anuncianteId);
    formData.append('descricao', descricao);
    formData.append('imagem', imagem);
    formData.append('link', link);
    formData.append('nivelServico', nivelServico);

    try {
      const response = await axios.post('http://localhost:3002/anuncios/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
    window.location.href = '/anExternos'

    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar!');
    }
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImagem(event.target.files[0]);
    }
  };
  

  return (
    <Container className="d-grid gap-3">
      <Card.Header>
      <Card.Title as="h3">Introduza os dados</Card.Title>
      </Card.Header>
      <CardBody>
        <Form encType="multipart/form-data" className="d-grid gap-3">
          <Form.Group as={Row}>
            <Form.Control
                type="number"
                style={{ display: 'none' }}
                value={anuncianteId}
                onChange={(e) => setAnuncianteId((prevId) => prevId + 1)}
            />
            <Form.Label column sm="2">Descrição:</Form.Label>
            <Col className="pl-1" md="8">
            <Form.Control type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col className="ms-5" md="7">
            <Form.Control type="file" onChange={handleImageChange} className="filetype" />
            <img alt="preview image" src={imagem ? URL.createObjectURL(imagem) : null} style={{ width: "35vw", height: "40vh", margin:'20px' }} />     
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Link:
            </Form.Label>
            <Col className="pl-1" md="8">
              <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Nível de serviço:
            </Form.Label>
            <Col className="pl-1" md="8">
              <Form.Control as="select" value={nivelServico} onChange={(e) => setNivelServico(parseInt(e.target.value))}>
                <option value={1}>Normal</option>
                <option value={2}>Bom</option>
                <option value={3}>Muito bom</option>
                <option value={4}>Premium</option>
              </Form.Control>
            </Col>
          </Form.Group >
          <Col className="pl-1" md="8">
          <Button type="submit" onClick={handleSubmit}>Submeter</Button>
          </Col>
        </Form>
      </CardBody>
    </Container>
  );
}

export default AdminAnuncio;