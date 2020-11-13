import React, { Component } from "react";
import { Modal, Button, Tab, Row, Col, Nav, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  addUserWorkout,
  createUserWorkout,
  toggleWorkoutModal,
} from "../actions/clientActions";
import { templateWorkout } from "../models/workouts";

let exercise = []

export class WorkoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      intensity: "Begginer",
      type: "Individual",
      dates: [],
      sets: "",
      duration: "",
      description: "",
      exercises: [],
      selectedWorkout: "Choose...",
      exerciseNum: 1,
      method: "Add"
    };
  }

  componentDidMount(){
      exercise = []
  }

  render() {
    return (
      <Modal
        onHide={this.props.toggleWorkoutModal}
        show={this.props.workoutModal}
        size="md"
      >
        <Modal.Header>
          <h3>Workouts</h3>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first" onClick={() => this.setState({method: "Add"})}>Add</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" onClick={() => this.setState({method: "Create"})}>Create</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Form>
                      <Form.Row>
                        <Form.Label>Select workout</Form.Label>
                        <Form.Control
                          as="select"
                          name="selectedWorkout"
                          onChange={this.handleInputChange}
                          defaultValue="Choose..."
                        >
                          <option>Choose...</option>
                          {this.props.workouts.workouts.map((obj, ind) => {
                            return <option key={ind}>{obj.name}</option>;
                          })}
                        </Form.Control>
                      </Form.Row>
                    </Form>
                    {this.getWorkoutInfo()}
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Form>
                      <Form.Row>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          placeholder="Name"
                        />
                      </Form.Row>
                      <Form.Row>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                          name="description"
                          value={this.state.description}
                          onChange={this.handleInputChange}
                          placeholder="Description"
                        />
                      </Form.Row>
                      <Form.Row>
                        <Form.Label>Intensity:</Form.Label>
                        <Form.Control
                          as="select"
                          name="intensity"
                          value={this.state.intensity}
                          onChange={this.handleInputChange}
                        >
                          <option key="Begginer">Begginer</option>
                          <option key="Intermidiate">Intermidiate</option>
                          <option key="Hard">Hard</option>
                        </Form.Control>
                      </Form.Row>
                      <Form.Row>
                        <Form.Label>Type:</Form.Label>
                        <Form.Control
                          as="select"
                          name="type"
                          value={this.state.type}
                          onChange={this.handleInputChange}
                        >
                          <option key="Individual">Individual</option>
                          <option key="Group">Group</option>
                        </Form.Control>
                      </Form.Row>
                      <Form.Row>
                        <Form.Label>Sets:</Form.Label>
                        <Form.Control
                          name="sets"
                          value={this.state.sets}
                          onChange={this.handleInputChange}
                          placeholder="Sets"
                        />
                      </Form.Row>
                      <Form.Row>
                        <Form.Label>
                          Duration <small>(approx) in minutes</small>:
                        </Form.Label>
                        <Form.Control
                          name="duration"
                          value={this.state.duration}
                          onChange={this.handleInputChange}
                          placeholder="Duration"
                        />
                      </Form.Row>
                      <Form.Label>Exercises: </Form.Label>
                      {this.insertExerciseForm()}
                      <Button
                          variant="success"
                          onClick={() => this.setState({exerciseNum: this.state.exerciseNum+1})}
                        >
                          Add
                        </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.toggleWorkoutModal}>
            Close
          </Button>
          <Button variant="success" onClick={this.handleAddCall}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  insertExerciseForm = () => {
    let form = []
    exercise.push({
        name: "",
        interval: ""
    })
    for(let i = 0; i < this.state.exerciseNum; i++){
        form.push(
            <Form.Row>
            <Form.Group as={Col} md="5">
              <Form.Label>Name</Form.Label>
              <Form.Control id={i} type="text" placeholder="Name" name="exerciseName" onChange={this.addExercise}/>
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Label>Interval</Form.Label>
              <Form.Control id={i} type="text" placeholder="Interval" name="interval" onChange={this.addExercise}/>
            </Form.Group>
          </Form.Row>
        )
    }
    return form
  };

  handleAddCall = () => {
    for(let i = 0; i < exercise.length; i++){
      if(exercise[i].name === '' || exercise[i].interval === ''){
        exercise.splice(i,1)
      }
    }
    if(this.state.method === 'Add'){
      this.addWorkout()
    }else{
      this.createUserWorkout()
    }
  }

  createUserWorkout = () =>{
    let data = templateWorkout
    data.name = this.state.name
    data.description = this.state.description
    data.type = this.state.type
    data.intensity = this.state.intensity
    data.duration = this.state.duration
    data.sets = this.state.sets
    data.dates = []
    data.dates.push(this.props.selectedDay)
    data.exercises = []
    exercise.forEach(obj =>{
      if(obj.name !== '' && obj.interval !== '')
        data.exercises.push(obj)
    })
    this.props.createWorkout(data)
    this.props.toggleWorkoutModal()
  }

  addExercise = event =>{
    let index = Number(event.target.id)
    if(event.target.name === "interval")
        exercise[index].interval = event.target.value
    else
        exercise[index].name = event.target.value
    
    exercise.forEach(obj => {
          console.log(obj.name)
          console.log(obj.interval)
      })
  }

  addWorkout = () => {
    let data = {
      name: this.state.selectedWorkout,
      date: this.props.selectedDay,
    };
    this.props.addWorkout(data);
    this.props.toggleWorkoutModal();
  };
  getWorkoutInfo = () => {
    let info = [];
    let index = 0;
    let workout = this.props.workouts.workouts.map((obj, ind) => {
      if (obj.name === this.state.selectedWorkout) {
        index = ind;
        return obj;
      }
    });
    if (workout[index] !== undefined) {
      info.push(
        <div>
          <br />
          <p>
            Type: <strong>{workout[index].type}</strong>
          </p>
          <p>
            Intensity: <strong>{workout[index].intensity}</strong>
          </p>
          <p>
            Sets: <strong>{workout[index].sets}</strong>
          </p>
          <p>
            Duration: <strong>{workout[index].duration}</strong>
          </p>
          <p>Exercises: </p>
          {workout[index].exercises.map((obj, ind) => {
            return (
              <p key={ind}>
                <strong>
                  {obj.name} - {obj.interval}
                </strong>
              </p>
            );
          })}
        </div>
      );
    } else {
      info.push(<></>);
    }
    return info;
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
}
const mapStateToProps = (state) => ({
  selectedDay: state.selectedDay,
  workouts: state.workouts,
  workoutModal: state.workoutModal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addWorkout: (workout) => dispatch(addUserWorkout(workout)),
    createWorkout: (workout) => dispatch(createUserWorkout(workout)),
    toggleWorkoutModal: () => dispatch(toggleWorkoutModal()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutModal);
