import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import customersReducer from '../reducers/customersReducer'
import departmentReducer from '../reducers/departmentReducer'
import employeeReducer from '../reducers/employeeReducer'
import ticketReducer from '../reducers/ticketReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        customers: customersReducer,
        departments: departmentReducer,
        employees: employeeReducer,
        tickets: ticketReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore