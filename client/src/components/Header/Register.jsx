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

import { useForm, Controller } from 'react-hook-form';

const clientId = "574474093326-klu8iamgt3rupvjhnstb3o5jcju58h9l.apps.googleusercontent.com"

const cookies = new Cookies();

const initialState = {
    fullname: '',
    email: '',
    password: '',
    confPassword: '',
}

const Register = () => {

    const { handleSubmit, control, formState: { errors }, watch } = useForm({ defaultValues: initialState });

    const password = watch('password');

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    const [locality , setLocality] = useState('');
    const [telem , setTelem] = useState('');
    const [birthdate , setBirthdate] = useState('');
    const [fullname, setFullname] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (data) => {
        const { email, password, fullname, locality, birthdate, telem } = data;
        try {
          let userId, userID, hashedPassword, token; // Define the variables
      
          if (isSignup) {
            const { data: { token: signupToken, userId: signupUserId, userID: signupUserID, hashedPassword: signupHashedPassword } } = await api.post('/auth/signup', {
              email, password, fullname,
            });
      
            hashedPassword = signupHashedPassword; // Assign the values
            userId = signupUserId;
            userID = signupUserID;
            token = signupToken
            cookies.set('fullname', fullname);
          } else {
            const { data: { token: loginToken, userId: loginUserId, userID: loginUserID, fullname: loginFullname}} = await api.post('/auth/login', {
              email, password, fullname,
            });
            console.log(loginFullname);
            userId = loginUserId; // Assign the values
            userID = loginUserID;
            token = loginToken
            setFullname(loginFullname);
            cookies.set('fullname', loginFullname || fullname);
          }
      
          cookies.set('token', token);
          cookies.set('email', email);
          
          cookies.set('userId', userId);
          cookies.set('userID', userID);
      
          if (isSignup && locality !== '' && telem !== '' && birthdate !== '') {
            const clientData = {
              locality: locality,
              telem: telem,
              birthdate: birthdate,
              userID: userID,
            };
      
            await api.post('/cl/userData', clientData);
          }
      
          window.location.reload();
          window.location.href = '/home';
        } catch (error) {
          console.log(error);
          if (isSignup) {
            setError(error.response.data.message);
          } else {
            setError("Email ou password incorretos.");
          }
        }}
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
            <form onSubmit={handleSubmit(handleFormSubmit)}>
            {isSignup && (
              <div>
                <label>Nome</label>
                <Controller
                  name="fullname"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Nome/Apelido obrigatório',
                    
                  }}
                  render={({ field }) => (
                    <>
                      <MDBInput
                        wrapperClass='mb-3'
                        size='medium'
                        htmlFor="fullname"
                        placeholder='Nome + Apelido *'
                        id='fullname'
                        value={fullname}
                        type='text'
                        {...field}
                        label={errors.fullname ? errors.fullname.message : ''}
                        labelClass={errors.fullname ? 'error-label' : 'default-label'}
                        
                      />
                    </>
                  )}
                />
                
                </div>
              )}
                  <div>
                  <label>Email</label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Email obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Email inválido!',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <MDBInput
                          wrapperClass='mb-3'
                          size='medium'
                          htmlFor="email"
                          placeholder='exemplo@mail.com'
                          id='email'
                          type='text'
                          {...field}
                          label={errors.email ? errors.email.message : ''}
                          labelClass={errors.email ? 'error-label' : 'default-label'}
                         
                        />
                      </>
                    )}
                  />
                  
                </div>
                <label>Palavra-passe</label>
                <div>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Password obrigatório',
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,12}$/i,
                        message: 'Password inválida!',
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <MDBInput
                          wrapperClass='mb-3'
                          size='medium'
                          htmlFor="password"
                          placeholder='<6,A,a,nº,simb($*&@#)'
                          id='password'
                          type='password'
                          {...field}
                          label={errors.password ? errors.password.message : ''}
                          labelClass={errors.password ? 'error-label' : 'default-label'}
                          
                        />
                      </>
                    )}
                  />
                  {!isSignup && error && <p className="error-message">{error}</p>} 
                </div>
                {isSignup && (
              <div>
                <label>Confirmar palavra-passe</label>
                <Controller
                  name="confPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Confirmar password obrigatório',
                    validate: (value) =>
                      value === password || 'Passwords não correspondem',
                    
                  }}
                  render={({ field }) => (
                    <>
                      <MDBInput
                        wrapperClass='mb-3'
                        size='medium'
                        htmlFor="confPassword"
                        placeholder='Confirmar password *'
                        id='confPassword'
                        type='password'

                        {...field}
                        label={errors.confPassword ? errors.confPassword.message : ''}
                        labelClass={errors.confPassword ? 'error-label' : 'default-label'}
                        
                      />
                    </>
                  )}
                />
                
                </div>
              )}
               {isSignup && (
              <div>
                <label>Telemóvel</label>
                <Controller
                  name="telem"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Telemóvel obrigatório',
                    pattern: {
                      value: /^\d{9}$/i,
                      message: 'Número de telemóvel inválido!',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <MDBInput
                        wrapperClass='mb-3'
                        size='medium'
                        htmlFor="telem"
                        placeholder='9 digitos'
                        id='telem'
                        type='number'
                        value={telem}
                        onChange={(e) => setTelem(e.target.value)}
                        {...field}
                        label={errors.telem ? errors.telem.message : ''}
                        labelClass={errors.telem ? 'error-label' : 'default-label'}
                        
                      />
                    </>
                  )}
                />
                
                </div>
              )}
              {isSignup && (
              <div>
                <label>Data de aniversário</label>
                <Controller
                  name="birthdate"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Data de nascimento obrigatório' }}
                  render={({ field }) => (
                    <>
                      <MDBInput
                        wrapperClass='mb-3'
                        size='medium'
                        htmlFor="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        id='birthdate'
                        type='date'
                        {...field}
                        label={errors.birthdate ? errors.birthdate.message : ''}
                        labelClass={errors.birthdate ? 'error-label' : 'default-label'}
                        
                      />
                    </>
                  )}
                />
                
                </div>
              )}
              {isSignup && (
              <div>
                <label>Localidade</label>
                <Controller
                  name="locality"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Cidade obrigatório' }}
                  render={({ field }) => (
                    <>
                      <MDBInput
                        wrapperClass='mb-3'
                        size='medium'
                        htmlFor="locality"
                        placeholder='Cidade *'
                        id='locality'
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        type='text'
                        {...field}
                        label={errors.locality ? errors.locality.message : ''}
                        labelClass={errors.locality ? 'error-label' : 'default-label'}
                        
                      />
                    </>
                  )}
                />
                
                </div>
              )}
              <div className='d-flex flex-row justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
              </div>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm" className="button-text" type="submit"> 
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