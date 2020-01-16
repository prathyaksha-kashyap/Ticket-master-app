import React from 'react'
import { connect } from 'react-redux'
import DepartmentForm from './DepartmentForm'
import { startEditDepartment } from '../../actions/department'
import _ from 'lodash'

function DepartmentEdit(props) {
    const handleSubmit = (department) => {
        props.dispatch(startEditDepartment(department, props))
    }
    return (
        <div className="container mt-5">
            <h2>Edit department</h2>
            {!_.isEmpty(props.department) && <DepartmentForm handleSubmit={handleSubmit} {...props.department} />}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        department: state.departments.find(department => department._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(DepartmentEdit)