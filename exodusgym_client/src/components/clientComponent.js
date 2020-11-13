import React, {Component} from 'react'
import { ClientNavbar } from '../views/client-navbar'
import { ClientSidebar } from '../views/client-sidebar'
import '../assets/css/client.scss'
import {connect } from 'react-redux'
import Footer from '../views/footer'
import CalendarView from '../views/calendar-view'
import  PurchaseWorkoutView  from '../views/purchase-workout-view'
import WorkoutDay from '../views/workout-day-view'
import WorkoutDayStatistics  from '../views/workout-day-statistics'
import NotificationView from '../views/notification-view'
class ClientComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            toggle: "Calendar"
        }
    }
    render(){
        return(
            <>
            <NotificationView/>
            <ClientNavbar/>
            <div className="app" style={{heigth: "1400px"}}>
            <ClientSidebar toggleDayInfo={this.toggleDayInfo}/>
            <main>
                {this.renderBody()}
            </main>
            </div>
            </>
        )
    }

    renderBody = () => {
        switch(this.state.toggle){
            case "Calendar":
                return <CalendarView toggleDayInfo={this.toggleDayInfo}/>
            case "Diet":
                return <WorkoutDay toggleDayInfo={this.toggleDayInfo}/>
            case "PurchaseWorkout":
                return <PurchaseWorkoutView toggleDayInfo={this.toggleDayInfo}/>
            case "Statistics":
                return <WorkoutDayStatistics toggleDayInfo={this.toggleDayInfo}/>
            default:
                return <div>ERROR</div>
        }
    }

    toggleDayInfo = data =>{
        this.setState({toggle: data})
    }
}

export default connect(null,null)(ClientComponent)