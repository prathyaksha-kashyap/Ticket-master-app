import React from 'react'
import { connect } from 'react-redux'

class EmployeeForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.name ? props.name : '',
            email: props.email ? props.email : '',
            mobile: props.mobile ? props.mobile : '',
            department: props.department ? props.department._id : ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: this.state.department
        }
        this.props.handleSubmit(formData)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="mobile" className="form-control" id="mobile" placeholder="Mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select className="form-control" id="department" name="department" value={this.state.department} onChange={this.handleChange } >
                        <option>select</option>
                        {
                            this.props.departments.map(department => {
                                return <option key={department._id} value={department._id}>{ department.name }</option>
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments
    }
}

export default connect(mapStateToProps)(EmployeeForm)