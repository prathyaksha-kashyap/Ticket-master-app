import React from 'react'
import { connect } from 'react-redux'
import EmployeeForm from './EmployeeForm'
import { startAddEmployee } from '../../actions/employee'

function EmployeeNew(props) {
    const handleSubmit = (employee) => {
        props.dispatch(startAddEmployee(employee, props))
    }
    return (
        <div className="container mt-5">
            <h2>Add Employee</h2>
            <EmployeeForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(EmployeeNew)