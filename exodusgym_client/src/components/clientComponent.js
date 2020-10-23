import React, {Component} from 'react'
import { Image} from 'react-bootstrap'
import { ClientNavbar } from '../views/client-navbar'
import { ClientSidebar } from '../views/client-sidebar'
import '../assets/css/client.scss'
import logo from "../assets/images/exodus-logo.png"
class ClientComponent extends Component{

    constructor(props){
        super(props)

    }
    render(){
        return(
            <>
            <ClientNavbar/>
            <div className="app">
            <ClientSidebar/>
            {/*here u enter other components*/}
            <Image
              alt=""
              src={logo}
              width="530"
              heigth="230"
              className="d-inline-block align-top"
              roundedCircle 
            />
            </div>
            </>
        )
    }
}

export default ClientComponent