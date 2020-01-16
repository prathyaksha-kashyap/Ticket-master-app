import React from 'react'
import { connect } from 'react-redux'
import EmployeeForm from './EmployeeForm'
import { startEditEmployee } from '../../actions/employee'
import _ from 'lodash'

function EmployeeEdit(props) {
    const handleSubmit = (employee) => {
        props.dispatch(startEditEmployee(employee, props))
    }
    return (
        <div className="container mt-5">
            <h2>Edit employee</h2>
            {!_.isEmpty(props.employee) && <EmployeeForm handleSubmit={handleSubmit} {...props.employee} />}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        employee: state.employees.find(employee => employee._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(EmployeeEdit)