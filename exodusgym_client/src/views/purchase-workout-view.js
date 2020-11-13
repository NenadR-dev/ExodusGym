import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Carousel, Card, Modal } from "react-bootstrap";
import yogaImg from "../assets/images/YogaWorkout.jpg";
import hiitImg from "../assets/images/HiitWorkout.jpg";
import spartanImg from "../assets/images/SpartanWorkout.jpg";
import * as dateFns from "date-fns";
import '../assets/css/client.scss'
import { purchaseWorkout } from "../actions/clientActions";
import {hiitWorkout, spartanWorkout, yogaWorkout} from '../models/workouts'

const testWorkout = {
  name: "TEST",
  description: "This is a test",
  intensity: "Moderate",
  type: "Group",
  date: new Date("11-28-2020").toLocaleDateString(),
  exercises: [
    {
      description: "Pushups",
    },
    {
      desctiption: "Situps",
    },
  ],
};



export class PurchaseWorkoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      workout: []
    };
  }

  render() {
    return (
      <div style={{width: "1200px", height: "700px"}}>
        {this.renderCarousel()}
        <br />
        <h2>More workouts coming soon. . .</h2>
        {this.state.show ? this.renderModal() : <></>}
      </div>
    );
  }

  handleClose = () => {
    this.setState({ show: !this.state.show });
  };

  showDetails = data => {
    switch (data){
      case "Hiit":
        this.setState({workout: hiitWorkout})
        break
      case "Spartan":
        this.setState({workout: spartanWorkout})
        break
      case "Yoga":
        this.setState({workout: yogaWorkout})
        break
      default: 
        this.setState({workout: testWorkout})
    }
    this.setState({show: !this.state.show})
  }

  purchaseWorkout = name => {
    //Here we add a Month 
    let workoutDates = []
    let currentDate = new Date()
    let startDate = new Date()
    let endDate = new Date()
    endDate.setMonth(startDate.getMonth() + 1)
    console.log(endDate.getDay())
    for(let i = 0; i < 31; i++){
      if(name === hiitWorkout.name){
        if(currentDate.getDay() === 1 || currentDate.getDay() === 3 || currentDate.getDay() === 5){
          workoutDates.push(currentDate.toLocaleString())
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }
      else if(name === spartanWorkout.name){
        if(currentDate.getDay() === 2 || currentDate.getDay() === 4 || currentDate.getDay() === 6){
          workoutDates.push(currentDate.toLocaleString())
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }
      else{
        if(currentDate.getDay() === 1 || currentDate.getDay() === 3 || currentDate.getDay() === 5){
          workoutDates.push(currentDate.toLocaleString())
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }

    }
    switch (name){
      case hiitWorkout.name:{
        hiitWorkout.dates = workoutDates
        hiitWorkout.dates.forEach(node => console.log(node))
        this.props.addWorkout(hiitWorkout)
        break
      }
      case spartanWorkout.name:{
        spartanWorkout.dates = workoutDates
        this.props.addWorkout(spartanWorkout)
        break
      }
      case yogaWorkout.name:{
        yogaWorkout.dates = workoutDates
        this.props.addWorkout(yogaWorkout)
        break
      }
      default:{
        console.log("ERROR")
      }
    }
    this.handleClose()
  }

  renderModal = () => {
    return (
      <Modal size="md" show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Workout: <strong>{this.state.workout.name}</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.state.workout.description}</p>
          <p>Intensity: <strong>{this.state.workout.intensity}</strong></p>
          <p>Duration: <strong>{this.state.workout.duration}</strong></p>
          <p>Sets: <strong>{this.state.workout.sets}</strong></p>
          <p>Type: <strong>{this.state.workout.type} training</strong></p>
          <p>Exercises: </p>
          {this.state.workout.exercises.map((exercise => {
            return(
              <p><strong>{exercise.name} - {exercise.interval}</strong></p>
            );
          }))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => this.purchaseWorkout(this.state.workout.name)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  renderCarousel = () => {
    return (
      <div>
        <Carousel>
          <Carousel.Item interval={5000}>
            <img className="d-block w-100" src={hiitImg} alt="First workout" />
            <Carousel.Caption>
              <h3>Hiit Workout</h3>
              <p>
                Hiit is a great way to lose weight and boost your overall health
              </p>
              <br />
              <Button variant="success" onClick={() => this.showDetails("Hiit")}>
                Buy
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={spartanImg}
              alt="Second workout"
            />
            <Carousel.Caption>
              <h3>Spartan workout</h3>
              <p>An intense fullbody training system</p>
              <br />
              <Button variant="success" onClick={() => this.showDetails("Spartan")}>Buy</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img className="d-block w-100" src={yogaImg} alt="Third workout" />
            <Carousel.Caption>
              <h3>Yoga Workout</h3>
              <p>Physical, mental and spiritual practices</p>
              <br />
              <Button
                variant="success"
                onClick={() => this.showDetails("Yoga")}
              >
                Buy
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  };
}
const mapStateToProps = (state) => ({
  workouts: state.workouts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addWorkout: (workout) => dispatch(purchaseWorkout(workout)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseWorkoutView);
