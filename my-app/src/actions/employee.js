import axios from "../config/axios"

export const setEmployees = (employees) => {
    return {
        type: 'SET_EMPLOYEES',
        payload: employees
    }
}

export const startSetEmployees = () => {
    return (dispatch) => {
        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                const employees = response.data
                dispatch(setEmployees(employees))
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const addEmployee = (employee) => {
    return {
        type: 'ADD_EMPLOYEE',
        payload: employee
    }
}

export const startAddEmployee = (formData, props) => {
    return (dispatch) => {
        axios.post('/employees', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(addEmployee(response.data))
                    props.history.push('/employees')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const editEmployee = (employee) => {
    return {
        type: 'EDIT_EMPLOYEE', 
        payload: employee
    }
}

export const startEditEmployee = (formData, props) => {
    return (dispatch) => {
        axios.put(`/employees/${props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(editEmployee(response.data))
                    props.history.push('/employees')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const removeEmployee = (id) => {
    return {
        type: 'REMOVE_EMPLOYEE',
        payload: id
    }
}

export const startRemoveEmployee = (id) => {
    return (dispatch) => {
        axios.delete(`/employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then(() => {
                dispatch(removeEmployee(id))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}