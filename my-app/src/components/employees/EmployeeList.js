import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRemoveEmployee } from '../../actions/employee'

function EmployeeList(props) {
    const handleRemove = (id) => {
        if(window.confirm('Are you Sure?')) {
            props.dispatch(startRemoveEmployee(id))
        }
    }

    return (
        <div className="container mt-5">
            <h2>Employees - {props.employees.length} </h2>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Dept</th>
                    <th scope="col">Show</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.employees.map((employee, index) => {
                            return (
                                <tr key={employee._id}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{ employee.name }</td>
                                    <td>{ employee.email }</td>
                                    <td>{ employee.mobile }</td>
                                    <td>{ employee.department && employee.department.name }</td>
                                    <td><Link to={`/employees/show/${employee._id}`} className="btn btn-primary">Show</Link></td>
                                    <td><Link to={`/employees/${employee._id}`} className="btn btn-secondary">Edit</Link></td>
                                    <td><button className="btn btn-danger" onClick={ () => {
                                        handleRemove(employee._id)
                                    }} >Remove</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/employees/new">Add Employee</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmployeeList)