import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { todoReducer } from './reducers/todo'

const rootReducer = combineReducers({
  app: todoReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))