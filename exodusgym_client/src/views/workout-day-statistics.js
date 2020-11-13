import React, { Component } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { connect } from "react-redux";
import { getMeals } from "../actions/clientActions";
import { Row, Col, Button } from "react-bootstrap";
import '../assets/css/client.scss'

export class WorkoutDayStatistics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{width: "1200px", height: "700px"}}>
        <Row>
          <Col><h3>Diet Statistics</h3></Col>
          <Col><h3>Workout Statistics</h3></Col>
        </Row>
        <Row>
        <LineChart
            width={600}
            height={400}
            data={this.mealStatistics()}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#119405" />
          </LineChart>

          <LineChart
            width={600}
            height={400}
            data={this.workoutStatistics()}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="caloriesBurnt"
              name="Calories Burnt"
              stroke="#119405"
            />
          </LineChart>
        </Row>
      </div>
    );
  }
  workoutStatistics = () =>{
    let workouts = [...this.props.workouts.workouts]
    let statistics = []
    for(let i = 0; i < workouts.length; i++){
      for(let j = 0; j < workouts[i].dates.length; j++){
        let randomNum = Math.floor((Math.random() * 10) + 19)
        console.log("Rng: "+ randomNum)
        let caloriesBurnt = Number(workouts[i].exercises.length * randomNum)
        statistics.push({
          caloriesBurnt: Number(caloriesBurnt),
          date:  workouts[i].name+ " " + workouts[i].dates[j]
        })
      }
    }
    return statistics.sort((a,b) => new Date(a.date).getDate() - new Date(b.date).getDate())
                     .sort((a,b) => new Date(a.date).getMonth() - new Date(b.date).getMonth())
  }
  mealStatistics = () =>{
    let filteredDates = Array.from(new Set(this.props.meals.meals.map(obj => obj.date)))
    let statistics = []
    for(let i = 0; i < filteredDates.length; i++){
      let totalCalories = Number(0)
      this.props.meals.meals.forEach(node => {
        if(node.date === filteredDates[i])
          totalCalories += Number(node.calories)
      })
      statistics.push({
        date: filteredDates[i],
        calories: Number(totalCalories)
      })
    }
    return statistics.sort((a,b) => new Date(a.date).getDate() - new Date(b.date).getDate())
  }
}
const mapStateToProps = (state) => ({
  meals: state.meals,
  workouts: state.workouts
});
const mapDispatchToProps = (dispatch) => {
  return {
    getMeals: () => dispatch(getMeals()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutDayStatistics);
