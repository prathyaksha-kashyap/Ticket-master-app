import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRemoveCustomer } from '../../actions/customers'

function CustomersList(props) {
    const handleRemove = (id) => {
        if(window.confirm('Are you Sure?')) {
            props.dispatch(startRemoveCustomer(id))
        }
    }

    return (
        <div className="container mt-5">
            <h2>Customers - {props.customers.length} </h2>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Show</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.customers.map((customer, index) => {
                            return (
                                <tr key={customer._id}>
                                    <th scope="row">{ index + 1 }</th>
                                    <td>{ customer.name }</td>
                                    <td>{ customer.email }</td>
                                    <td>{ customer.mobile }</td>
                                    <td><Link to={`/customers/show/${customer._id}`} className="btn btn-primary">Show</Link></td>
                                    <td><Link to={`/customers/${customer._id}`} className="btn btn-secondary">Edit</Link></td>
                                    <td><button className="btn btn-danger" onClick={ () => {
                                        handleRemove(customer._id)
                                    }} >Remove</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/customers/new">Add Customer</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(CustomersList)