import React, {Component} from 'react'
import {Navbar, Nav, Form, FormControl, Button, NavDropdown, Image, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {postLoginRequest } from '../actions/homepageActions'

class LoginModal extends Component{
    constructor(props){
        super(props)
        this.state={
            username: "",
            password: ""
        }
    }
    
    render(){
        return(
            <>
                <Modal bg="dark" show={this.props.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <Button variant="outline-success" onClick={() => this.props.postLoginRequest(this.state)}>
                        Login
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    closeModal = () =>{
        this.setState({username: ""})
        this.setState({password: ""})
        this.props.handleShow()
    }

    //target name must be the same as the this.state name
    handleInputChange = (e) => {
        //console.log(e.target.name + " " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        postLoginRequest: (data) => dispatch(postLoginRequest(data)),
    };
  };

export default connect(null,mapDispatchToProps)(LoginModal)