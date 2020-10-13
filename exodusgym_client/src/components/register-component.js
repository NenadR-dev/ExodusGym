import React, {Component} from 'react'
import { Container, Form, Col , Row, Image, Button} from 'react-bootstrap'
import '../assets/css/homepage.css'

export class RegisterComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
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
                                <Form.Control required type="email" placeholder="Enter email"/>
                                <Form.Control.Feedback>enter email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8" controlId="fromGridUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required placeholder="Username"/>
                                <Form.Control.Feedback>Enter username</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="fromGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Enter Password"/>
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
                                <Form.Control required  placeholder="Firstname"/>
                                <Form.Control.Feedback>enter Firstname</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="fromGridLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control required  placeholder="Lastname"/>
                                <Form.Control.Feedback>Enter Lastname</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="fromGridDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control required type="date" placeholder="Date of birth"/>
                                <Form.Control.Feedback>enter Date of Birth</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="fromGridImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control required type="file" onChange={this.onImageChange}/>
                                <Form.Control.Feedback>enter Image</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="outline-success" type="submit">Register</Button>
                    </Form>
                    </Col>
                    <Col className="centered">
                        <Image src={this.state.image} width="350" heigth="200" roundedCircle />   
                    </Col>
                </Row>           
            </Container>
        )
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
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }



}

export default RegisterComponent