import React, { Component } from "react"
import {Navbar, Nav,   Button, NavDropdown, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/images/exodus-logo.png"
import LoginModal from "./login-modal";
import { getUserRole, postLogoutRequest } from '../actions/homepageActions'
import {connect} from 'react-redux';

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
            <Nav.Link onClick={() => this.props.getUserRole()}>Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => this.props.postLogoutRequest()}>Action</NavDropdown.Item>
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
        <LoginModal showModal={this.state.showModal} handleShow={this.handleShow}/>
      </>
    );
  }

  handleShow = () => {
      this.setState({
          showModal: !this.state.showModal
      })
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      getUserRole: () => dispatch(getUserRole()),
      postLogoutRequest : () => dispatch(postLogoutRequest())
  };
};

export default connect(null,mapDispatchToProps)(HomepageNavbar);
