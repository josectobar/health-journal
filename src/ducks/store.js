import { createStore, combineReducers } from 'redux'
import reducer from './reducer'
import indicatorsReducer from './indicatorsReducer'

export default createStore(combineReducers({reducer, indicatorsReducer, }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())