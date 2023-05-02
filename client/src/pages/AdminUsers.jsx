import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
import { Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

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

  async function handleDelete(id) {
    console.log('Deleting user with ID:', id);
    try {
      const response = await api.delete(`/auth/Users/${id}`);
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
    <form>
      <div>
        <h1>Admin Page</h1>
        <br />
        <br />
        
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
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>Eliminar</Button>{' '}
                  <Link to={`/edit/${user.id}`}><Button variant="primary">Editar</Button></Link>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </form>
  );
  
}

export default AdminUsers;