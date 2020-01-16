import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function EmployeeShow(props) {
    console.log(props.employee)
    const width = {
        maxWidth: '20rem',
    }
    return (
        <div className = "container">
           <div className = "row">
                <h2 className ="ml-2">Employee Details :</h2>
           </div>
           <div className ="row mt-1">
                <div className="col-md-3 col-md-offset-4">
                    <div className="card text-white bg-primary mb-3" style ={width}>
                    <div className="card-header">Name: {props.employee.name}</div>
                    <div className="card-body">
                        <h5 className="card-text ">Email: {props.employee.email}</h5>
                        <p className="card-text">Mobile: {props.employee.mobile}</p>
                        <p className="card-text">Department: {props.employee.department.name}</p>
                    </div>
                 </div> 
           </div>
           </div>
           <div>
                <Link to={`/employees/${props.employee._id}`} className="btn btn-secondary mr-2">Edit</Link>
                <Link to="/employees" className="btn btn-secondary" >back</Link>
           </div>
                            
        </div>
    )
}

const matchStateToProps = (state,props) => {
    return { employee : state.employees.find((employee) => {
        return employee._id == props.match.params.id
    })}
}

export default connect(matchStateToProps)(EmployeeShow)