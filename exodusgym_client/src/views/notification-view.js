import React, {Component} from 'react'
import { connect } from "react-redux";
import { hideNotification } from '../actions/clientActions';
import {FaExclamation} from 'react-icons/fa'
import {Popover, Toast} from 'react-bootstrap'
export class NotificationView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let body = []
        if(this.props.notification.show){
            body.push(this.renderNotification())
        }else{
            body.push(<></>)
        }
        return body
    }


    renderNotification = () => {
        return <Toast autohide delay="3000"  style={{ width: "250px", position: "absolute", marginLeft: "1200px",marginTop: "50px", zIndex: "1"}}
         show={this.props.notification.show} onClose={this.props.hideNotification}>
            <Toast.Header>
                <FaExclamation />
                <strong className="mr-auto">Information</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{this.props.notification.message}</Toast.Body>
        </Toast>
    }
}
const mapStateToProps = (state) => ({
    notification: state.notification
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      hideNotification: () => dispatch(hideNotification())
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(NotificationView)