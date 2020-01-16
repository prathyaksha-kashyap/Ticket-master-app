import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import Home from './components/common/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'
import { startRemoveUser } from './actions/user'
import CustomersList from './components/customers/CustomersList'
import CustomerNew from './components/customers/CustomerNew'
import CustomerEdit from './components/customers/CustomerEdit'
import DepartmentList from './components/departments/DepartmentList'
import DepartmentNew from './components/departments/DepartmentNew'
import DepartmentEdit from './components/departments/DepartmentEdit'
import EmployeeList from './components/employees/EmployeeList'
import EmployeeNew from './components/employees/EmployeeNew'
import EmployeeEdit from './components/employees/EmployeeEdit'
import TicketList from './components/tickets/TicketList'
import TicketNew from './components/tickets/TicketNew'
import TicketEdit from './components/tickets/TicketEdit'
import CustomerShow from './components/customers/CustomerShow'
import DepartmentShow from './components/departments/DepartmentShow'
import EmployeeShow from './components/employees/EmployeeShow'
import TicketShow from './components/tickets/TicketShow'

function App(props) {
  
  const handleLogout = () => {
    props.dispatch(startRemoveUser())
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3000/">Ticket Master</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {
              _.isEmpty(props.user) ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/register">Register</Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/customers">Customers</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/departments">Departments</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/employees">Employees</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tickets">Tickets</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/">Logout</Link>
                  </li>
                </React.Fragment>
              )
            }
          </ul>
        </div>
      </nav>

      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
        
        <Route path="/customers" component={CustomersList} exact={true} />
        <Route path="/customers/new" component={CustomerNew} />
        <Route path="/customers/show/:id" component={CustomerShow} />
        <Route path="/customers/:id" component={CustomerEdit} />
        
        <Route path="/departments" component={DepartmentList} exact={true} />
        <Route path="/departments/new" component={DepartmentNew} />
        <Route path="/departments/show/:id" component={DepartmentShow} />
        <Route path="/departments/:id" component={DepartmentEdit} />
        
        <Route path="/employees" component={EmployeeList} exact={true} />
        <Route path="/employees/new" component={EmployeeNew} />
        <Route path="/employees/show/:id" component={EmployeeShow} />
        <Route path="/employees/:id" component={EmployeeEdit} />
        
        <Route path="/tickets" component={TicketList} exact={true} />
        <Route path="/tickets/new" component={TicketNew} />
        <Route path="/tickets/show/:id" component={TicketShow} />
        <Route path="/tickets/:id" component={TicketEdit} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)