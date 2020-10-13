import React, {Component} from 'react'
import {Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class Footer extends Component{
    render(){
        return(
            <>
                <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
                <Button variant="outline-success">Register</Button>
                <Button variant="outline-success">Login</Button>
                </Navbar>                
            </>
        )
    }
}

export default Footer