import React from 'react'
import { connect } from 'react-redux'
import TicketForm from './TicketForm'
import { startAddTicket } from '../../actions/ticket'

function TicketNew(props) {
    const handleSubmit = (ticket) => {
        props.dispatch(startAddTicket(ticket, props))
    }
    return (
        <div className="container mt-5">
            <h2>Add Ticket</h2>
            <TicketForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default connect()(TicketNew)