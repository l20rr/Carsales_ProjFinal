import React,{useState}from 'react';
import api from '../../services/api'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Register() {
  
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [confPassword , setConfPassword] = useState('');

  async function handleSubmit(){

    const data = {
      name:name, 
      email:email,
       password:password,
        confPassword:confPassword
    }
      
      console.log(data)

      if(name!==''&&email!==''&&password!==''&&confPassword!==''){
        const response = await api.post('/auth/',data);

        if(response.status===200){
          window.location.href='/home'
        }else{
          alert('Erro ao cadastrar o usuário!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }

     

  }
    
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' 
          id='name' 
          type='text' 
          required 
          value={name} 
          onChange={e => setName(e.target.value)}
          />

          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' 
          required
          id="email" 
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          />

          <MDBInput wrapperClass='mb-4' label='Password' size='lg'
          required 
          id='password' 
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
          <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' 
          id='confPassword' 
          type='password'
          value={confPassword}
          onChange={e => setConfPassword(e.target.value)}
          />

          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'  onClick={handleSubmit}>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;