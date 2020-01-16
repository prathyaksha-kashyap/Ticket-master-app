import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function CustomerShow(props) {
    console.log(props.customer)
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
                    <div className="card-header">Name: {props.customer.name}</div>
                    <div className="card-body">
                        <h5 className="card-title">Email: {props.customer.email}</h5>
                        <p className="card-text">Mobile: {props.customer.mobile}</p>
                    </div>
                 </div> 
           </div>
           </div>
            <div >
                <Link to={`/customers/${props.customer._id}`} className="btn btn-secondary mr-3">Edit</Link>
                <Link to="/customers" className="btn btn-secondary "  >back</Link>
             </div> 
                          
            
        </div>
    )
}

const matchStateToProps = (state,props) => {
    return { customer : state.customers.find((customer) => {
        return customer._id == props.match.params.id
    })}
}

export default connect(matchStateToProps)(CustomerShow)