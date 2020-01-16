import axios from "../config/axios"

export const setTickets = (tickets) => {
    return {
        type: 'SET_TICKETS',
        payload: tickets
    }
}

export const startSetTickets = () => {
    return (dispatch) => {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                const tickets = response.data
                dispatch(setTickets(tickets))
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const addTicket = (ticket) => {
    return {
        type: 'ADD_TICKET',
        payload: ticket
    }
}

export const startAddTicket = (formData, props) => {
    return (dispatch) => {
        axios.post('/tickets', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(addTicket(response.data))
                    props.history.push('/tickets')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const editTicket = (ticket) => {
    return {
        type: 'EDIT_TICKET', 
        payload: ticket
    }
}

export const startEditTicket = (formData, props) => {
    return (dispatch) => {
        axios.put(`/tickets/${props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(editTicket(response.data))
                    props.history.push('/tickets')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const removeTicket = (id) => {
    return {
        type: 'REMOVE_TICKET',
        payload: id
    }
}

export const startRemoveTicket = (id) => {
    return (dispatch) => {
        axios.delete(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then(() => {
                dispatch(removeTicket(id))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}