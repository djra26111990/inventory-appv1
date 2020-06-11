import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'

export default class NavbarComponent extends Component {

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Sistema de Inventario</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Productos</Nav.Link>
            <Nav.Link href="/create">Crear producto nuevo</Nav.Link>
            <Nav.Link href="/user">Crear nuevo usuario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}