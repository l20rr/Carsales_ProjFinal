import React, { useState, useEffect } from 'react';
import api from '../services/api'
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Home from './Home';
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

  if (email != 'admin@gmail.com') return <Home />;
  return (
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminUsers;