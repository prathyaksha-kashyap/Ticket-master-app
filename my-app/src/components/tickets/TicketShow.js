import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function TicketShow(props) {
   console.log(props.ticket)
    const width = {
        maxWidth: '50rem',
    }
    return (
        <div className = "container">
           <div className = "row">
                <h2 className ="ml-2">Customer Details :</h2>
           </div>
           <div className ="row mt-1">
                <div className="col-md-3 col-md-offset-4">
                    <div className="card text-white bg-primary mb-3" style ={width}>
                    <div className="card-header">customer: {props.ticket.customer.name}</div>
                    <div className="card-header">employee: {props.ticket.employee.name}</div>
                    <div className="card-header">department: {props.ticket.department.name}</div>
                    <div className="card-header">priority: {props.ticket.priority}</div>
                    <div className="card-body">
                        <p className="card-text">message: {props.ticket.message}</p>
                    </div>
                 </div> 
           </div>
           </div>
           <Link to="/tickets">back</Link>
                          
            
        </div>
    )
}

const matchStateToProps = (state,props) => {
    return { ticket : state.tickets.find((ticket) => {
        return ticket._id == props.match.params.id
    })}
}

export default connect(matchStateToProps)(TicketShow)