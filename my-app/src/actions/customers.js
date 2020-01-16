import axios from "../config/axios"

export const setCustomers = (customers) => {
    return {
        type: 'SET_CUSTOMERS',
        payload: customers
    }
}

export const startSetCustomers = () => {
    return (dispatch) => {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                const customers = response.data
                dispatch(setCustomers(customers))
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer
    }
}

export const startAddCustomer = (formData, props) => {
    return (dispatch) => {
        axios.post('/customers', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(addCustomer(response.data))
                    props.history.push('/customers')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const editCustomer = (customer) => {
    return {
        type: 'EDIT_CUSTOMER', 
        payload: customer
    }
}

export const startEditCustomer = (formData, props) => {
    return (dispatch) => {
        axios.put(`/customers/${props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(editCustomer(response.data))
                    props.history.push('/customers')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const removeCustomer = (id) => {
    return {
        type: 'REMOVE_CUSTOMER',
        payload: id
    }
}

export const startRemoveCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                dispatch(removeCustomer(id))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}