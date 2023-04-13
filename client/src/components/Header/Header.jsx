import React, { useEffect, useRef, useState } from "react";



import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";


import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);

  const cookies = new Cookies();

  const authToken = cookies.get("token");

  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('fullname');
    cookies.remove('email');
    cookies.remove('hashedPassword');

    window.location.reload();
}

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

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
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
            
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">

              {
              authToken ?
              
                <button to="register" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"onClick={logout}></i> Logout
                </button>
              
              :
              
                <Link to="register" className=" d-flex align-items-center gap-1" >
                  <i class="ri-user-line" ></i> Entrar/Registar
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
