import React from 'react'
import { connect } from 'react-redux'

class TicketForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            code: props.code || '',
            customer: props.customer ? props.customer._id : '',
            department: props.department ? props.department._id : '',
            employee: props.employee ? props.employee._id : '',
            priority: props.priority || '',
            message: props.message || ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code: this.state.code,
            customer: this.state.customer,
            department: this.state.department,
            employee: this.state.employee,
            priority: this.state.priority,
            message: this.state.message
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
                    <label htmlFor="code">Code</label>
                    <input type="text" className="form-control" id="code" placeholder="Code" name="code" value={this.state.code} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="customer">Customer</label>
                    <select className="form-control" id="customer" name="customer" value={this.state.customer} onChange={this.handleChange } >
                        <option>select</option>
                        {
                            this.props.customers.map(customer => {
                                return <option key={customer._id} value={customer._id}>{ customer.name }</option>
                            })
                        }
                    </select>
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
                <div className="form-group">
                    <label htmlFor="employee">Employee</label>
                    <select className="form-control" id="employee" name="employee" value={this.state.employee} onChange={this.handleChange } >
                        <option>select</option>
                        {
                            this.props.employees.map(employee => {
                                return <option key={employee._id} value={employee._id}>{ employee.name }</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" placeholder="Message" name="message" value={this.state.message} onChange={this.handleChange} />
                </div>
                <div>
                    <p>Priority</p>
                    <input type="radio" id="high" name="priority" value="high" checked={this.state.priority === 'high'} onChange={this.handleChange} className="mr-2" />
                    <label htmlFor="high">High</label><br/>
                    <input type="radio" id="medium" name="priority" value="medium" checked={this.state.priority === 'medium'} onChange={this.handleChange} className="mr-2" />
                    <label htmlFor="medium">Medium</label><br/>
                    <input type="radio" id="low" name="priority" value="low" checked={this.state.priority === 'low'} onChange={this.handleChange} className="mr-2" />
                    <label htmlFor="low">Low</label>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers,
        departments: state.departments,
        employees: state.employees
    }
}

export default connect(mapStateToProps)(TicketForm)