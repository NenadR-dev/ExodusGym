import React, {Component} from 'react'
import Footer from '../views/footer'
import HomepageNavbar from '../views/homepage-navbar'
import RegisterComponent from './registerComponent'
import '../assets/css/homepage.css'
export class HomepageComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            bodyState: "Body"
        }
    }
    render(){
        let body;
        if(this.state.bodyState == "Body"){
            body = <p>HELLO BODY</p>
        } else if(this.state.bodyState == "Register"){
            body = <RegisterComponent/>
        } else{
            body = <p>Last else</p>
        }
        return(
            <>
                <div className="homepage">
                    <HomepageNavbar bodyHandler={this.bodyHandler}/>
                    {body}
                    <Footer/>
                </div>
            </>
        )
    }

    bodyHandler = (changedState) => {
        this.setState({
            bodyState: changedState
        })
    }
}