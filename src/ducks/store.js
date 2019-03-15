import { createStore, combineReducers } from 'redux'
import reducer from './reducer'
import indicatorsReducer from './indicatorsReducer'
import statsReducer from './statsReducer'

export default createStore(combineReducers({reducer, indicatorsReducer,statsReducer }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())