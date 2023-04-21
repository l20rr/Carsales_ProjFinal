import React,{useState}from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import "../../styles/header.css";
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

const cookies = new Cookies();

const initialState = {
    fullname: '',
    email: '',
    password: '',
    confPassword: '',
}

const Register = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        const { email, password } = form;

        

        const { data: { token, userId, hashedPassword, fullname } } = await api.post(`${isSignup ? '/auth/signup' : '/auth/login/'}`, {
            email, password, fullname: form.fullname,
        });

        cookies.set('token', token);
        cookies.set('email', email);
        cookies.set('fullname', fullname);
        cookies.set('userId', userId);
        
        

        if(isSignup) {
            cookies.set('hashedPassword', hashedPassword);
        }

        
        
        

        window.location.reload();
        window.location.href= '/home'
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3 formulario'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <div className="text-uppercase text-center mb-5">
            <h2>{isSignup ? 'Registar' : 'Entrar'}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <MDBInput wrapperClass='mb-4' htmlFor="fullname" label='Your Name' size='lg' 
                required 
                id='fullname' 
                type='text' 
                name='fullname'
                
                onChange={handleChange}
                />
              )}
                <MDBInput wrapperClass='mb-4' htmlFor="email" label='Your Email' size='lg' 
                required
                id='email' 
                type='email'
                name='email'
                
                onChange={handleChange}
                />
              
                <MDBInput wrapperClass='mb-4' htmlFor="password" label='Password' size='lg'
                required 
                id='password' 
                type='password'
                name='password'
                
                onChange={handleChange}
                />
              
              {isSignup && (
                <MDBInput wrapperClass='mb-4' htmlFor="confPassword" label='Repeat your password' size='lg'
                required 
                id='confPassword' 
                type='password'
                name='confPassword'
                
                onChange={handleChange}
              />
              )}
              <div className='d-flex flex-row justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
              </div>
              <button className="btn-cadastrar"> {isSignup ? 'Registar' : 'Entrar'} </button>
            </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup
              ? 'Já estás registado?'
              : 'Ainda não estás registado?'
              }
              <span onClick={switchMode}>
                {isSignup ? 'Entrar' : 'Registar'}
              </span>
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;