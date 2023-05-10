import React,{ useState, useEffect }from 'react';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
  } from 'mdb-react-ui-kit';
  import Button from 'react-bootstrap/Button';
  import Cookies from 'universal-cookie';
function RegisterBO() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    const cookies = new Cookies();
    event.preventDefault();
    let userId, userID, token;
  
    if (email !== "admin@gmail.com") { // Verifica se o e-mail é diferente do endereço correto
      alert("Você não tem permissão para entrar.");
      return; // Impede a submissão do formulário
    }
  
    const { data: { token: loginToken, userId: loginUserId, userID: loginUserID}} = await axios.post('http://localhost:3000/auth/login', {
      email, password,
    });
  
    userId = loginUserId; // Assign the values
    userID = loginUserID;
    token = loginToken
  
    cookies.set('token', token);
    cookies.set('email', email);
  
    cookies.set('userId', userId);
    cookies.set('userID', userID);
    window.location.href = `/AdminUsers`;
  };

  return (
    <MDBContainer className="d-flex align-items-center justify-content-center vh-100">
      <MDBCard className="w-50">
        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
            />
            <MDBInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3"
            />
           
            <MDBBtn color="primary" className="mb-3" type="submit">
              Login
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterBO;