import React from 'react'
import { connect } from 'react-redux'
import DepartmentForm from './DepartmentForm'
import { startAddDepartment } from '../../actions/department'

function DepartmentNew(props) {
    const handleSubmit = (department) => {
        props.dispatch(startAddDepartment(department, props))
    }
    return (
        <div className="container mt-5">
            <h2>Add Department</h2>
            <DepartmentForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(DepartmentNew)