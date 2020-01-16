import React from 'react'
import { connect } from 'react-redux'
import CustomerForm from './CustomerForm'
import { startEditCustomer } from '../../actions/customers'
import _ from 'lodash'

function CustomerEdit(props) {
    const handleSubmit = (customer) => {
        props.dispatch(startEditCustomer(customer, props))
    }
    return (
        <div className="container mt-5">
            <h2>Edit Customer</h2>
            {!_.isEmpty(props.customer) && <CustomerForm handleSubmit={handleSubmit} {...props.customer} />}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        customer: state.customers.find(customer => customer._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(CustomerEdit)