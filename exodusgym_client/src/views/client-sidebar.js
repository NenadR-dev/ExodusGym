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
  FaHome,
  FaDumbbell,
  FaHeart,
  FaBookOpen,
  FaToggleOn,
  FaToggleOff
} from "react-icons/fa";

export class ClientSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      collapsed: false,
      toggled: false
    };
  }

  handleToggle = () => {
    this.setState({toggled: !this.state.toggled})
  }

  handleCollapse = () => {
    this.setState({collapsed: !this.state.collapsed})
  }
  render() {
    return (
        <ProSidebar style={{heigth: "1400px"}} breakPoint="md" collapsed={this.state.collapsed} toggled={this.state.toggled} onToggle={this.handleToggle}>
          <SidebarHeader>
          <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {this.state.collapsed ? <FaToggleOff onClick={this.handleCollapse}/> : <FaToggleOn onClick={this.handleCollapse}/>}
        </div>
          </SidebarHeader>
          <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<FaHome />} onClick={() => this.props.toggleDayInfo("Calendar")}>Dashboard</MenuItem>
            <SubMenu title="My Journal" icon={<FaBookOpen />}>
              <MenuItem onClick={() => this.props.toggleDayInfo("Statistics")}>Statistics</MenuItem>
            </SubMenu>
            <MenuItem icon={<FaDumbbell/>} onClick={() => this.props.toggleDayInfo("PurchaseWorkout")}>Workouts</MenuItem>
          </Menu>
          </SidebarContent>
        </ProSidebar>
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
