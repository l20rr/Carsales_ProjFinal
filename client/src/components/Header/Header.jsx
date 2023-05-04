import React, { useEffect, useRef, useState } from "react";



import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";


import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import api from '../../services/api'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';


const cookies = new Cookies();
const email = cookies.get('email');

let navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "Sobre",
  },
  {
    path: "/cars",
    display: "Veiculos",
  },
  {
    path: "/contact",
    display: "Contatos",
  },
];

if (email === "admin@gmail.com") {
  navLinks = [
    {
      path: "/AdminUsers",
      display: "Utilizadores",
    },
    {
      path: "/anuncios",
      display: "Anúncios",
    },
  ];
}


const Header = () => {
  const menuRef = useRef(null);

  const cookies = new Cookies();

  const authToken = cookies.get("token");

  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('userID');
    cookies.remove('fullname');
    cookies.remove('email');
    cookies.remove('hashedPassword');
    
    window.location.reload();
    window.location.href= '/home'
}

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const fullname = () => cookies.get('fullname');
  

return (
 
    <header className="header">
      
      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Pesquisa" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
            
            <Col lg="5" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
              
              {
              authToken ?
              
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" size="sm" idx="sm">
                    <i class="ri-user-line"></i> A tua conta 
                  </Dropdown.Toggle>

                <Dropdown.Menu variant="dark" >
                  <Dropdown.Header>Bem vindo,{' '}<span style={{ color: 'white', fontWeight: 'bold' }}>{fullname()}.</span></Dropdown.Header>
                  <Dropdown.Header>A tua conta</Dropdown.Header>
                  <Dropdown.Item href="Admin">Geral</Dropdown.Item>
                  <Dropdown.Item href="/chat">Mensagens</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Favoritos</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
      
              :

              <Link to="register" className=" d-flex align-items-center gap-1" >
                <Button variant="outline-secondary" size="sm"> <i class="ri-user-line"></i> A tua conta</Button>
              </Link>

              }  

              </div>
            </Col>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;

