import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function DepartmentShow(props) {
    console.log(props.department)
    const width = {
        maxWidth: '50rem',
    }
    return (
        <div className = "container">
           <div className = "row">
                <h2 className ="ml-2">Department Details :</h2>
           </div>
           <div className ="row mt-1">
                <div className="col-md-3 col-md-offset-4">
                    <div className="card text-white bg-primary mb-3" style ={width}>
                    <div className="card-header">Name: {props.department.name}</div>
                 </div> 
           </div>
           </div>
           <div>
            <Link to={`/departments/${props.department._id}`} className="btn btn-secondary mr-2">Edit</Link>   
            <Link to="/departments" className="btn btn-secondary">back</Link>
           </div>
                           
            
        </div>
    )
}

const matchStateToProps = (state,props) => {
    return { department : state.departments.find((department) => {
        return department._id == props.match.params.id
    })}
}

export default connect(matchStateToProps)(DepartmentShow)