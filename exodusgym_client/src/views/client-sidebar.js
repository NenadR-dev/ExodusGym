import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Image,
  Modal,
  Row,
  Col,
  Container,
} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/images/exodus-logo.png";
import LoginModal from "./login-modal";
import { getUserRole, postLogoutRequest } from "../actions/homepageActions";
import { connect } from "react-redux";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "../assets/css/client.scss";
import {
  FaTachometerAlt,
  FaHome,
  FaList,
  FaSun,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";

export class ClientSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  render() {
    var bodyHandler = this.props.bodyHandler;
    return (
      <>
        <ProSidebar breakPoint="md">
          <Menu iconShape="square">
            <MenuItem icon={<FaHome />}>Dashboard</MenuItem>
            <SubMenu title="My Journal" icon={<FaHeart />}>
              <MenuItem>Diet plan</MenuItem>
              <MenuItem>Workout plan</MenuItem>
            </SubMenu>
            <MenuItem icon={<FaSun/>}>TestComponent</MenuItem>
          </Menu>
        </ProSidebar>
      </>
    );
  }

  handleShow = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUserRole: () => dispatch(getUserRole()),
    postLogoutRequest: () => dispatch(postLogoutRequest()),
  };
};

export default connect(null, mapDispatchToProps)(ClientSidebar);
