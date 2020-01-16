import React from 'react'
import { connect } from 'react-redux'
import TicketForm from './TicketForm'
import { startEditTicket } from '../../actions/ticket'
import _ from 'lodash'

function TicketEdit(props) {
    const handleSubmit = (ticket) => {
        props.dispatch(startEditTicket(ticket, props))
    }
    return (
        <div className="container mt-5">
            <h2>Edit Ticket</h2>
            {!_.isEmpty(props.ticket) && <TicketForm handleSubmit={handleSubmit} {...props.ticket} />}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        ticket: state.tickets.find(ticket => ticket._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(TicketEdit)