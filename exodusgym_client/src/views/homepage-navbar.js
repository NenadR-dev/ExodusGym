import React, { Component } from "react"
import {Navbar, Nav, Form, FormControl, Button, NavDropdown, Image, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/images/exodus-logo.png"

export class HomepageNavbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false
        }
    }
  render() {
    var bodyHandler = this.props.bodyHandler
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="/home">
            <Image alt=""
                 src={logo}
                 width="30"
                 heigth="30"
                 className="d-inline-block align-top"/>{''}
            ExodusGym
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link onClick={() => bodyHandler("Body")}>Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Button variant="outline-success" onClick={() => bodyHandler("Register")}>Sign Up</Button>
            <Button variant="outline-success" onClick={this.handleShow}>Sign In</Button>
        </Navbar.Collapse>
        </Navbar>
        <Modal bg="dark" show={this.state.showModal} onHide={this.handleShow}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleShow}>
                        Close
                    </Button>
                    <Button variant="outline-success" onClick={this.handleShow}>
                        Login
                    </Button>
                    </Modal.Footer>
        </Modal>
      </>
    );
  }

  handleShow = () => {
      this.setState({
          showModal: !this.state.showModal
      })
  }
}

export default HomepageNavbar;
