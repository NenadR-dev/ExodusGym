import React, {Component} from 'react'
import { Container, Form, Col , Row, Image, Button} from 'react-bootstrap'
import '../assets/css/homepage.css'
import { connect } from 'react-redux'
import { postRegisterRequest } from '../actions/homepageActions'

export class RegisterComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            date: "",
            image: ""
        }
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col className="centered">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="8" controlId="fromGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" value={this.state.email} onChange={this.handleInputChange} name="email" placeholder="Enter email"/>
                                <Form.Control.Feedback>enter email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8" controlId="fromGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required placeholder="Username" value={this.state.username} onChange={this.handleInputChange} name="username"/>
                                <Form.Control.Feedback>Enter username</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="fromGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter Password"/>
                                <Form.Control.Feedback>enter email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="fromGridConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required type="password" placeholder="Confirm Password"/>
                                <Form.Control.Feedback>Enter username</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="fromGridFirstname">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control required name="firstname" value={this.state.firstname} onChange={this.handleInputChange} placeholder="Firstname"/>
                                <Form.Control.Feedback>enter Firstname</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="fromGridLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control required name="lastname" value={this.state.lastname} onChange={this.handleInputChange}  placeholder="Lastname"/>
                                <Form.Control.Feedback>Enter Lastname</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="fromGridDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control required type="date" name="date" value={this.state.date} onChange={this.handleInputChange} placeholder="Date of birth"/>
                                <Form.Control.Feedback>enter Date of Birth</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="fromGridImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control required type="file" onChange={this.onImageChange}/>
                                <Form.Control.Feedback>enter Image</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="outline-success" type="submit" onClick={this.sendData}>Register</Button>
                    </Form>
                    </Col>
                    <Col className="centered">
                        <Image src={this.state.image} width="350" heigth="200" roundedCircle />   
                    </Col>
                </Row>           
            </Container>
        )
    }

    sendData = (event) => {
        this.props.postRegisterRequest(this.state)
        event.preventDefault()
        event.stopPropagation()
    }

    //Loads selected image and shows it on page
    onImageChange= (event) =>{
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }

    //target name must be the same as the this.state name
    handleInputChange = (e) => {
        console.log(e.target.name + " " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postRegisterRequest: (data) => dispatch(postRegisterRequest(data)),
    };
  };

export default connect(null,mapDispatchToProps)(RegisterComponent)