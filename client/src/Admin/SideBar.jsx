import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Link } from 'react-router-dom';

function SideBar() {
  return (
    <div style={{ display: 'flex', height: '80vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#000d6b">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
        
            <Link to="/tables" >
              <CDBSidebarMenuItem icon="heart">Favoritos</CDBSidebarMenuItem>
            </Link >
            <Link to="/UserProfile" >
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </Link >
            <Link to="/Faturas" >
              <CDBSidebarMenuItem icon="chart-line">Faturas</CDBSidebarMenuItem>
            </Link >
            <Link to="/analytics" >
              <CDBSidebarMenuItem icon="comment">Chat</CDBSidebarMenuItem>
            </Link >
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
              <Link to="/home">
              <CDBSidebarMenuItem  icon="sign-out-alt" >Sair</CDBSidebarMenuItem>
            </Link >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default  SideBar;