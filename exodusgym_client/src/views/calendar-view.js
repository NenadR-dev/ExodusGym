import React, { Component } from "react";
import * as dateFns from "date-fns";
import '../assets/css/calendar.css'
import '../assets/css/client.scss'
import {Popover, OverlayTrigger, Button, Spinner, Badge} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setDay, getMeals, getWorkouts} from '../actions/clientActions'

export class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    };
  }

  componentWillMount(){
      this.props.fetchMeals()
      this.props.fetchWorkouts()
       
  }
  render() {
    let body = [];
    if(!this.props.meals.loaded && !this.props.workouts.loaded){
      body.push(<Spinner className="spinner" animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>)
    }
    else{
      console.log(this.props.meals.loaded)
      console.log(this.props.workouts.loaded)
      body.push(
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      )
    }
    return body
  }

  renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays = () => {
    const dateFormat = "iiii";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells = () => {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <OverlayTrigger key={day} trigger="click" rootClose={true} placement="bottom" overlay={this.renderPopout(day)}>
            <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {/* Ovde logika za workout plan i diet plan */}
            {this.populateCalendar(day)}
          </div>
          </OverlayTrigger>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }
  
  renderPopout = (day) => {
    const popout = []
    if(dateFns.isSameDay(day,this.state.selectedDate)){
      console.log("Popout: " + day)    
      return(
        <Popover id="popover-basic" style={{width: "200px"}}>
        <Popover.Title as="h3">Day info</Popover.Title>
        <Popover.Content>
          <strong>Total Meals: </strong>{this.getTotalMeals(day)}
          <br/>
          <strong>Workout: </strong>{this.getWorkoutName(day)}
          <br/>
            {this.getInfo(day)}
          <br/>
          <Button variant="success" onClick={() => this.props.toggleDayInfo("Diet")}>Details</Button>
        </Popover.Content>
      </Popover>
      )
    }
    else{
      return <div></div>
    }
  }

  getWorkoutName = day => {
    for(let i = 0; i < this.props.workouts.workouts.length; i++){
      for(let j =0; j< this.props.workouts.workouts[i].dates.length; j++){
        let secondDate =  new Date(this.props.workouts.workouts[i].dates[j]).toLocaleDateString()
        if(this.isSameDay(new Date(day).toLocaleDateString(),secondDate)){
         return this.props.workouts.workouts[i].name
        }
      }
    }
    return "No workouts today"
  }

  getTotalExercises = day =>{
    let count = 0
      for(let i = 0; i < this.props.workouts.workouts.length; i++){
        for(let j =0; j< this.props.workouts.workouts[i].dates.length; j++){
          let secondDate =  new Date(this.props.workouts.workouts[i].dates[j]).toLocaleDateString()
          if(this.isSameDay(new Date(day).toLocaleDateString(),secondDate)){
            this.props.workouts.workouts[i].exercises.map((obj,index) =>{
              count ++
            })
          }
        }
      }
      return count
  }

  getTotalMeals = day =>{
      let count = 0
      this.props.meals.meals.map((node, ind) => {
        if(this.isSameDay(new Date(node.date).toLocaleDateString(),new Date(day).toLocaleDateString()))
          count ++
      })
      return count
  }

  getInfo = day => {
    var d = new Date(String(day))
    for(let i = 0; i < this.props.meals.meals.length; i++){
      if(d.toLocaleDateString() === this.props.meals.meals[i].date)
        {
          return <strong>{this.props.meals.meals[i].calories}</strong>
        }
    }
    return <div></div>
  }

  populateCalendar = day =>{
    var d = new Date(String(day))
    var populate = []
    if(this.getTotalMeals(day) > 0){
      populate.push(
        <><Badge key={this.state.keyInd} variant="success" pill>Meals</Badge><br/></>
      )
    }
    if(this.getTotalExercises(day) > 0){
      populate.push(
        <Badge key={this.state.keyInd} variant="danger" pill>Workout</Badge>
      )
    }
    return populate
  }

  isSameDay = (firstDay, secondDay) =>{
    if(firstDay === secondDay){
      return true
    } else{
      return false
    }
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
    this.props.setDay(day)
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
}
  
const mapStateToProps = state => ({
  selectedDay: state.selectedDay,
  meals: state.meals,
  workouts: state.workouts
})
const mapDispatchToProps = dispatch => {
  return{
    setDay: day => dispatch(setDay(day)),
    fetchMeals: () => dispatch(getMeals()),
    fetchWorkouts: () => dispatch(getWorkouts())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarView);
