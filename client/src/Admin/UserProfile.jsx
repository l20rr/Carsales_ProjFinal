import { useState, useEffect }  from "react";
import  SideBar from "./SideBar";
import Table from 'react-bootstrap/Table';
import { useParams, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus} from '@fortawesome/free-solid-svg-icons'
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { StreamChat } from 'stream-chat';
import api from '../services/api';
import Register from "../components/Header/Register"
import Form from 'react-bootstrap/Form';




// react-bootstrap components
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
  
} from 'mdb-react-ui-kit';


import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

const cookies = new Cookies();
const authToken = cookies.get("token");

const apiKey = 'vxwzb46w7drg';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        userID: cookies.get('userID'),
        fullname: cookies.get('fullname'),
        name: cookies.get('email'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}

function UserProfile() {

  const cookies = new Cookies();

  const fullname = () => cookies.get('fullname');
  const email = () => cookies.get('email');

  const [modalOpenA, setModalOpenA] = useState(false);
  const [modalOpenB, setModalOpenB] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  

  const toggleModalChange = () => {
    setModalOpenA(!modalOpenA);
  }

  const toggleModalAdd = () => {
    setModalOpenB(!modalOpenB);
  }

  const togglePasswordModal = () => {
    setPasswordModalOpen(!passwordModalOpen);
  };

  const toggleEmailModal = () => {
    setEmailModalOpen(!emailModalOpen);
  };

    const handleClickA = () => {
      toggleModalChange();
      
    }

    const handleClickB = () => {
      toggleModalAdd();
      
    }

    const authToken = cookies.get("token");

    const logout = () => {
      cookies.remove("token");
      cookies.remove('userId');
      cookies.remove('fullname');
      cookies.remove('email');
      cookies.remove('hashedPassword');
      cookies.remove('invoiceID');
      localStorage.clear();
      window.location.reload();
      window.location.href= '/home';
  }




  const [locality , setLocality] = useState(null);
  const [telem , setTelem] = useState(null);
  const [birthdate , setBirthdate] = useState(null);
  const [emaill, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedUserId , setSelectedUserId] = useState('');
  const userId = cookies.get('userId');
  const userID = cookies.get('userID');
    
  const { id } = useParams();

  
  useEffect(() => {
    const storedData = localStorage.getItem(`userData_${userID}`);
    if (storedData) {
      const {locality, telem, birthdate } = JSON.parse(storedData);
      setLocality(locality);
      setTelem(telem);
      setBirthdate(birthdate);
    }
  }, [userID]);

  useEffect(() => {
    if (locality && telem && birthdate) {
      localStorage.setItem(`userData_${userID}`, JSON.stringify({ locality, telem, birthdate }));
    }
  }, [locality, telem, birthdate, userID]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get('cl/client/'+userID);
        setSelectedUserId(response.data.id)
        setLocality(response.data.locality);
        setTelem(response.data.telem);
        setBirthdate(response.data.birthdate);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [userID]);


  async function handleDeleteAccount(id, streamChatUserId) {
    const response = await api.delete(`/auth/Users/${id}/${streamChatUserId}`);
      const cookies = new Cookies();
      try {
        cookies.remove("token", { path: '/register' });
        cookies.remove("userID", { path: '/register' });
        cookies.remove("userId", { path: '/register' });
        cookies.remove("fullname", { path: '/register' });
        cookies.remove("email", { path: '/register' });
        cookies.remove("hashedPassword", { path: '/register' });
        localStorage.clear();
      } catch (error) {
        console.error('Error removing cookies:', error);
      }
    }

    /*const handleDeleteAccount = (id) => {
      fetch(`http://localhost:3000/auth/Users/${id}`, {
        method: 'DELETE'
       
      })
      console.log
      .then(response => {
        if (response.ok) {
          console.log('User deleted successfully');
          logout(true);
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });  }

      */
  useEffect(() => {
    api.get(`/auth/Users/${id}`)
      .then(response => {
        const UserData = response.data;
        setEmail(UserData.email)
        setPassword(UserData.password)
       
        console.log(UserData)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [Ads , setAds] = useState([])


  useEffect(() => {
    async function fetchAds() {
      const response = await api.get(`/cl/listclient/${userID}`);
      setAds(response.data);
    }
    fetchAds();
  }, []);

  if(!authToken) return <Register />

  async function handleSubmit(e) {
    e.preventDefault();
   
    const data = {
      locality: locality,
      telem: telem,
      birthdate: birthdate,
      
    };

      await api.put(`/cl/${userID}`,data);
      window.location.href= '/UserProfile';
  }

  

  async function changePassword(e) {
    e.preventDefault();

    const userData = {
      email:emaill ,
      password: password,

    }

    document.cookie = `email=${emaill};`;

    await api.put(`/auth/users/${userID}`, userData);
    window.location.href= '/UserProfile';

  }

  

  async function handleDelete(publishADID) {
    console.log('Deleting user with ID:', publishADID);
    try {
      const response = await api.delete(`/vehicle/vehicle/${publishADID}`);
      if (response.status === 200) {
        console.log('User deleted successfully')
      }
      
  
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  }

  return (
    <>

    {/* Adicionar dados do Utilizador */}

    
      <MDBModal isOpen={modalOpenB} toggle={toggleModalAdd}>
        <MDBModalHeader toggle={toggleModalAdd}>Definições da conta</MDBModalHeader>
        <MDBModalBody>
        <Form >
            <MDBInput type="number" required value={telem} onChange={e => setTelem(e.target.value)} label="Telemóvel" />
            <MDBInput type="date" required value={birthdate} onChange={e => setBirthdate(e.target.value)} label="Data de nascimento" />
            <MDBInput type="text" required value={locality} onChange={e => setLocality(e.target.value)} label="Morada" />
            <MDBInput type="hidden" value={userID} />
            
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleModalAdd}>Cancelar</MDBBtn>
            <MDBBtn color="primary" onClick={handleSubmit}  >Adicionar</MDBBtn>
          </MDBModalFooter>
        </Form>
        </MDBModalBody>
        
      </MDBModal>
    

    {/* Alterar dados do Utilizador */}

    <div>
      <MDBModal isOpen={modalOpenA} toggle={toggleModalChange}>
        <MDBModalHeader toggle={toggleModalChange}>Definições da conta</MDBModalHeader>
        <MDBModalBody>
      <DialogActions sx={{ flexDirection: 'column', gap: 2, my: 2 }}>
      { (
        <MDBBtn onClick={togglePasswordModal}>
          Mudar Password
        </MDBBtn>
        )}
        <MDBBtn onClick={toggleEmailModal}>
          Mudar Email
        </MDBBtn>
        <MDBBtn onClick={() => setDeleteConfirmationModalOpen(true)} >
          Apagar  Conta
        </MDBBtn>
      </DialogActions>
        </MDBModalBody>
      </MDBModal>
    </div>

    {/* Alterar Password */}

    <form >
      <MDBModal isOpen={passwordModalOpen} toggle={togglePasswordModal}>
        <MDBModalHeader toggle={togglePasswordModal}>Alterar Password</MDBModalHeader>
      <DialogContent dividers>
        
          <MDBInput label="Insira a nova password" type="password" required value={password} onChange={e => setPassword(e.target.value)} name="password"  />
          
      </DialogContent>
      <DialogActions>
        <MDBBtn  color="primary" onClick={changePassword} >Alterar</MDBBtn>
      </DialogActions>
      </MDBModal>
    </form>

    {/* Alterar Email */}

    <form >
      <MDBModal isOpen={emailModalOpen} toggle={toggleEmailModal}>
        <MDBModalHeader toggle={toggleEmailModal}>Alterar Email</MDBModalHeader>
      <DialogContent dividers>
        
          <MDBInput label="Insira o novo email" type="text" required value={emaill} onChange={e => setEmail(e.target.value)} name="email"  />
          
      </DialogContent>
      <DialogActions>
        <MDBBtn  color="primary" onClick={changePassword} >Alterar</MDBBtn>
      </DialogActions>
      </MDBModal>
    </form>

    {/* Apagar conta */}

    <form >
      <MDBModal isOpen={deleteConfirmationModalOpen} toggle={() => setDeleteConfirmationModalOpen(false)}>
        <MDBModalHeader toggle={() => setDeleteConfirmationModalOpen(false)}>Tem a certeza que quer apagar a sua conta?</MDBModalHeader>
        <MDBModalBody>
          <p>Todos os seus dados e conversas serão perdidos permanentemente.</p>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setDeleteConfirmationModalOpen(false)}>Cancelar</MDBBtn>
          <MDBBtn class='deleteButton' color="danger" onClick={() => handleDeleteAccount(userID, userId)}>Apagar</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </form>

    {/* Perfil do Utilizador */}

    <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '1500px' }}>
          <div style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-3">
              <MDBRow>
                <MDBCol>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                      <p className="text-muted mb-1">{fullname()}</p>
                      
                      <div className="d-flex justify-content-center mb-2">
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Nome completo:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{fullname()}
                            <div onClick={handleClickA} style={{ float: 'right', cursor: 'pointer' }}><FontAwesomeIcon icon={faPencil} /></div>
                            <div onClick={handleClickB} style={{ float: 'right', cursor: 'pointer', marginRight: '15px' }}><FontAwesomeIcon icon={faPlus} /></div>
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{email()}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Telemóvel:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{telem}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Data de Nascimento:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{birthdate}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Morada:</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{locality}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <MDBContainer>
            <form>
              <h3>Os seus anúncios</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Matricula</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano/Mês fabrico</th>
            </tr>
          </thead>
          <tbody>
            {Ads.map(Ad => (
              <tr key={Ad.ID}>
                <td>{Ad.license}</td>
                <td>{Ad.brand}</td>
                <td>{Ad.model}</td>
                <td>{Ad.year}</td>
                <td>
                  <MDBBtn color="danger" onClick={() => handleDelete(Ad.ID)}  >Eliminar</MDBBtn>{' '}
                  <Link to={`/editV/${Ad.ID}`}><MDBBtn variant="primary" >Editar</MDBBtn></Link>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </form>
            </MDBContainer>

          </div>
        </div>
      </div></>
  );
}

export default UserProfile;