import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
} from "react-bootstrap";

const cookies = new Cookies();
function AdminUsers() {
  const [users, setUsers] = useState([]);

  const email = cookies.get('email')

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get('/auth/AllUsers');
      setUsers(response.data);
    }
    fetchUsers();
  }, []);
  
  async function handleDelete(id,streamChatUserId) {
    console.log('Deleting user with ID:', id);
    try {
      const response = await api.delete(`/auth/Users/${id}/${streamChatUserId}`);
      if (response.status === 200) {
        console.log('User deleted successfully')
      }
      setUsers(users.filter(user => user.id !== id));
      console.log(`User with ID ${id} has been deleted`);
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }
  
  



  if (email != 'admin@gmail.com') return <Home />;
  return (
    <Container>
      <div className="d-grid gap-3">
      <Card.Header className="d-grid gap-2">
      <Card.Title as="h1">Admin Page</Card.Title>
      <Card.Title as="h3">Clientes</Card.Title>
      </Card.Header>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(user.id, user.streamChatUserId)}>Eliminar</Button>{' '}
                  <Link to={`/edit/${user.id}`}><Button variant="primary">Editar</Button></Link>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
  
}

export default AdminUsers;