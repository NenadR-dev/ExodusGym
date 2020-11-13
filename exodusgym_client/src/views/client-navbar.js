import React, { Component } from "react"
import {Navbar, Nav, NavDropdown, Image, OverlayTrigger } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/images/exodus-logo.png"
import {postLogoutRequest } from '../actions/homepageActions'
import {connect} from 'react-redux';
import NotificationView from "./notification-view";

export class ClientNavbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false
        }
    }
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/client">
            ExodusGym
            </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <div>
          <Image
                alt=""
                src={logo}
                width="30"
                heigth="30"
                className="d-inline-block align-top"
                roundedCircle 
              />
          </div>
            <br/>
          <Nav>
              <NavDropdown title="Hello user" id="basic-nav-dropdown">
                <NavDropdown.Item>Account</NavDropdown.Item>
                <NavDropdown.Item>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => this.props.postLogoutRequest()}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
      postLogoutRequest : () => dispatch(postLogoutRequest())
  };
};

export default connect(null,mapDispatchToProps)(ClientNavbar);
