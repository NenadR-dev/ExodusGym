import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import homepageReducer from './reducers/homepageReducer'
import MealsReducer from './reducers/mealsReducer'
import DayReducer from './reducers/dayReducer'
import WorkoutReducer from './reducers/workoutReducer'
import NotificationReducer from './reducers/notificationReducer'
import WorkoutModalReducer from './reducers/workoutModalReducer'

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools (...enhancers)
  const allReducers = combineReducers({
      homepage: homepageReducer,
      meals: MealsReducer,
      selectedDay: DayReducer,
      workouts: WorkoutReducer,
      notification: NotificationReducer,
      workoutModal: WorkoutModalReducer
  });


  const store = createStore(allReducers, preloadedState, composedEnhancers)

  return store
}