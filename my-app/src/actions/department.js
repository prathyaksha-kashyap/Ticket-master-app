import axios from "../config/axios"

export const setDepartments = (departments) => {
    return {
        type: 'SET_DEPARTMENTS',
        payload: departments
    }
}

export const startSetDepartments = () => {
    return (dispatch) => {
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                dispatch(setDepartments(response.data))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const addDepartment = (department) => {
    return {
        type: 'ADD_DEPARTMENT',
        payload: department
    }
}

export const startAddDepartment = (formData, props) => {
    return (dispatch) => {
        axios.post('/departments', formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(addDepartment(response.data))
                    props.history.push('/departments')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }   
}

export const editDepartment = (customer) => {
    return {
        type: 'EDIT_DEPARTMENT', 
        payload: customer
    }
}

export const startEditDepartment = (formData, props) => {
    return (dispatch) => {
        axios.put(`/departments/${props.match.params.id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    dispatch(editDepartment(response.data))
                    props.history.push('/departments')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const removeDepartment = (id) => {
    return {
        type: 'REMOVE_DEPARTMENT',
        payload: id
    }
}

export const startRemoveDepartment = (id) => {
    return (dispatch) => {
        axios.delete(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then(() => {
                dispatch(removeDepartment(id))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}