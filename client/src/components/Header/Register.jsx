import React,{ useState, useEffect }from 'react';
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
import Button from 'react-bootstrap/Button';
import { GoogleLogin } from 'react-google-login';
import { FaGoogle } from 'react-icons/fa';
import { gapi } from 'gapi-script';
import "../../styles/register.css";

const clientId = "574474093326-klu8iamgt3rupvjhnstb3o5jcju58h9l.apps.googleusercontent.com"

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
    const [locality , setLocality] = useState('');
    const [telem , setTelem] = useState('');
    const [birthdate , setBirthdate] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        const { email, password } = form;

        

        const { data: { token, userId, userID, hashedPassword, fullname } } = await api.post(`${isSignup ? '/auth/signup' : '/auth/login/'}`, {
            email, password, fullname: form.fullname,
        });

        cookies.set('token', token);
        cookies.set('email', email);
        cookies.set('fullname', fullname);
        cookies.set('userId', userId);
        cookies.set('userID', userID);

        

        if(isSignup) {
            cookies.set('hashedPassword', hashedPassword);
        }

        const clientData = {
          locality: locality,
          telem: telem,
          birthdate: birthdate,
          userID: userID,
        };
        if(isSignup && form.locality!=='' && form.telem!=='' && form.birthdate!=='') {
          await api.post('/cl/userData', clientData);
        }

        window.location.reload();
        window.location.href= '/home'
    }
  
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleGoogleSuccess = async (res) => {
      const { tokenId } = res;
    
      const { data: { token, userId, userID, email, name } } = await api.post('/auth/google/', {
        tokenId: tokenId,
      });
    
      
      cookies.set('token', token);
      cookies.set('email', email);
      cookies.set('fullname', name);
      cookies.set('userId', userId);
      cookies.set('userID', userID);
    
      
      window.location.reload();
      window.location.href= '/home'
    };
    
    const handleGoogleFailure = (error) => {
      console.log(error);
    };

   
  return (
  <div class="page-container">
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3 formulario'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <div className="text-uppercase text-center mb-5">
            <h2>{isSignup ? 'Registar' : 'Entrar'}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <MDBInput wrapperClass='mb-2' size='medium' htmlFor="fullname" label='Nome/Apelido'  
                required 
                id='fullname' 
                type='text' 
                name='fullname'
                
                onChange={handleChange}
                />
              )}
                <MDBInput wrapperClass='mb-2' size='medium' htmlFor="email" label='Email' 
                required
                id='email' 
                type='email'
                name='email'
                
                onChange={handleChange}
                />
              
                <MDBInput wrapperClass='mb-2' size='medium' htmlFor="password" label='Password' 
                required 
                id='password' 
                type='password'
                name='password'
                
                onChange={handleChange}
                />

              {isSignup && (
                <MDBInput wrapperClass='mb-2' size='medium' htmlFor="confPassword" label='Repete a password' 
                required 
                id='confPassword' 
                type='password'
                name='confPassword'
                
                onChange={handleChange}
              />
              )}
               {isSignup && (
                  <MDBInput  wrapperClass='mb-2' size='medium' type="number" required value={telem} onChange={(e) => setTelem(e.target.value)} label="Telemóvel" />
              )}
              {isSignup && (
                  <MDBInput type="date" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} label="Data de nascimento" />
              )}
              {isSignup && (
                <MDBInput wrapperClass='mb-2' size='medium' type="text" required value={locality} onChange={(e) => setLocality(e.target.value)} label="Morada" />
              )}
              <div className='d-flex flex-row justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
              </div>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm"> 
                  <span className="button-text">{isSignup ? 'Registar' : 'Entrar'}</span>
                </Button>
              <div class="hr-container">
                <span class="hr-line"></span>
                <span class="hr-text">OU</span>
                <span class="hr-line"></span>
              </div>
               <GoogleLogin
                  clientId={clientId}
                  buttonText="Login with Google"
                  onSuccess={handleGoogleSuccess}
                  onFailure={handleGoogleFailure}
                  cookiePolicy={'single_host_origin'}
                  render={(renderProps) => (
                  <Button variant="outline-danger" size="sm" onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-btn">
                    <FaGoogle className="google-icon" /> <span className="button-text">Continuar com o Google</span>
                  </Button>
              )}
              />
            </div>
            </form>
          <div className='auth__form-container_fields-account'>
            <p className="custom-text">
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
  </div>
  );
}

export default Register;