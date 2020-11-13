import React, { Component } from "react";
import {
  Card,
  Col,
  Button,
  Row,
  CardGroup,
  Accordion,
  Form,
  ButtonGroup,
  Modal,
  ListGroup,
  Tab,
  Nav
} from "react-bootstrap";
import { FaHamburger, FaDumbbell } from "react-icons/fa";
import { MealTypes } from "../models/mealTypes";
import { connect } from "react-redux";
import { addMeal, getMeals, deleteMeal, createUserWorkout, addUserWorkout, toggleWorkoutModal,
  deleteWorkout } from "../actions/clientActions";
import "../assets/css/client.scss";
import WorkoutModal from '../views/workout-modal'
export class WorkoutDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MealType: "",
      Calories: "",
      Description: "",
      showMealModal: false,
      showWorkoutModal: false
    };
  }

  componentWillMount() {
    let temp = 0;
    this.props.workouts.workouts.forEach((node) => {
      temp += node.exercises.length;
    });
    this.setState({ TotalExercises: temp });
    temp = 0;
    this.props.meals.meals.forEach((node) => {
      temp += Number(node.calories);
    });
    this.setState({ TotalCalories: Number(temp) });
  }

  render() {
    return (
      <div style={{width:"100%", height: "90%"}}>
        <h3>Meals </h3>
        <Row>        
            <CardGroup>
              {this.renderMealList()}
            </CardGroup>
            <Button variant="success" onClick={this.handleCloseMealModal}>Add</Button>
        </Row>
        <br/>
        <h3>Workouts</h3>
        <Row>
          <CardGroup>
            {this.renderWorkoutList()}
          </CardGroup>
          <Button variant="success" onClick={this.props.toggleWorkoutModal}>Add</Button>
        </Row>
        {this.renderAddMealModal()}
        <WorkoutModal/>
      </div>
    );
  }

  renderWorkoutList = () => {
    let items = []
    this.props.workouts.workouts.forEach((obj,ind) =>{
      for(let i = 0; i < obj.dates.length; i++){
        if(new Date(obj.dates[i]).toLocaleDateString() === this.props.selectedDay){
          items.push(
            <Card bg="dark" text="light" style={{width: "250px"}}>
              <Card.Header>
                <h5><span><FaDumbbell/> {obj.name}</span></h5>
              </Card.Header>
              <Card.Body>
                <Card.Text style={{fontSize: "14px"}}>
                  Type: <strong> {obj.type} </strong><br/>
                  Intensity: <strong>{obj.intensity}</strong><br/>
                  Duration: <strong>{obj.duration}</strong><br/>
                  Sets: <strong>{obj.sets}</strong><br/>
                  Exercises: <br/>
                    {obj.exercises.map((exe) => {
                      return <span><strong>{exe.name} - {exe.interval} </strong><br/></span>
                    })}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="danger" onClick={() => this.deleteWorkout(obj.name)}>Delete</Button>
              </Card.Footer>
            </Card>
          )
        }
      }
    })
    return items
  }

  renderMealList = () => {
    let items = [];
    this.props.meals.meals.forEach((obj, ind) => {
      if (new Date(obj.date).toLocaleDateString() === this.props.selectedDay) {
        items.push(
              <Card bg="dark" text="light" style={{width: "250px"}}>
                  <Card.Header>
                    <h5><span><FaHamburger /></span> {obj.mealType}</h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                    Description: {obj.description}.<br/>
                    Calories: {obj.calories}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="danger" onClick={() => this.DeleteMeal(ind)}>Delete</Button>
                  </Card.Footer>
              </Card>
        );
      }
    });
    return items;
  };

  renderAddMealModal = () => {
    return(
      <Modal size="md" show={this.state.showMealModal} onHide={this.handleCloseMealModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Add Meal</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Row>
                  <Form.Label>Meal Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="MealType"
                    onChange={this.handleInputChange}
                    defaultValue="Choose..."
                  >
                    <option>Choose...</option>
                    {MealTypes.map((obj, index) => {
                      return <option key={index}>{obj.type}</option>;
                    })}
                  </Form.Control>
                </Form.Row>
                <Form.Row>
                  <Form.Label>Calories</Form.Label>
                  <Form.Control
                    name="Calories"
                    onChange={this.handleInputChange}
                    type="number"
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="Description"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseMealModal}>
            Close
          </Button>
          <Button variant="success" onClick={() => this.AddMeal()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  deleteWorkout = name =>{
    let data = {
      name: name,
      date: this.props.selectedDay
    }
    this.props.deleteWorkout(data)
  }

  createWorkout = () =>{

  }

  AddMeal = () => {
    var newMeal = [];
    newMeal.calories = this.state.Calories;
    newMeal.mealType = this.state.MealType;
    newMeal.description = this.state.Description;
    newMeal.date = this.props.selectedDay;
    this.props.addMeal(newMeal);
    let cal = Number(this.state.TotalCalories) + Number(newMeal.calories);
    this.setState({ TotalCalories: Number(cal) });
    this.setState({ show: !this.state.showMealModal });
  };

  DeleteMeal = (index) => {
    var array = [...this.props.meals.meals];
    var num1 = Number(array[index].calories);
    var num2 = Number(this.state.TotalCalories);
    var total = num2 - num1;
    this.setState({ TotalCalories: total });
    this.props.deleteMeal(array[index]);
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCloseMealModal = () => {
    this.setState({ showMealModal: !this.state.showMealModal });
  }
}

const mapStateToProps = (state) => ({
  meals: state.meals,
  selectedDay: state.selectedDay,
  workouts: state.workouts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMeals: () => dispatch(getMeals()),
    addMeal: (meal) => dispatch(addMeal(meal)),
    deleteMeal: (meal) => dispatch(deleteMeal(meal)),
    addWorkout: workout => dispatch(addUserWorkout(workout)),
    createWorkout: workout => dispatch(createUserWorkout(workout)),
    toggleWorkoutModal : () => dispatch(toggleWorkoutModal()),
    deleteWorkout: workout => dispatch(deleteWorkout(workout))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDay);
