import React from 'react'
import { connect } from 'react-redux'
import CustomerForm from './CustomerForm'
import { startAddCustomer } from '../../actions/customers'

function CustomerNew(props) {
    const handleSubmit = (customer) => {
        props.dispatch(startAddCustomer(customer, props))
    }
    return (
        <div className="container mt-5">
            <h2>Add Customer</h2>
            <CustomerForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(CustomerNew)