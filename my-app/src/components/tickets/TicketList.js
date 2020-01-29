import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRemoveTicket, startEditTicket, editTicket } from '../../actions/ticket'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import Chart from 'react-google-charts'
import ModalTickets from './ResolvedTicketModal'


class TicketList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resolvedTickets : [],
        }
    }
    
     handleRemove = (id) => {
        if(window.confirm('Are you Sure?')) {
              this.props.dispatch(startRemoveTicket(id))
        }      
    }

    handleResolve = (ticket) => {
        console.log('resolved',ticket)
        const formData = {
            isResolved : true
        }    
        
        axios.put(`http://localhost:3333/tickets/${ticket._id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
           .then((resposne) => {
               console.log(resposne.data)
               const ticket = resposne.data
               this.props.dispatch(editTicket(ticket))
               this.setState((prevState) => {
                   return {
                       resolvedTickets : prevState.resolvedTickets.concat(ticket)
                   }
                })
           })
           .catch(err => console.log(err))                                                   
    }
     
    render () {
        //chart data
        const options = {
            title: "Ticket Priority",
            pieHole: 0.4,
            is3D: false
          }
    
        const low = this.props.tickets.filter((ticket) => {return ticket.priority == 'low'}).length
        const high = this.props.tickets.filter((ticket) => {return ticket.priority == 'high'}).length
        const medium = this.props.tickets.filter((ticket) => {return ticket.priority == 'medium'}).length
          
        const data = [
            ["Priority", "Tickets per Category"],
            ["High", high],
            ["Medium", medium],
            ["Low", low]
        ]
        
        const data2 = [
        ['Task', 'Hours per Day'],
        ['unresolved', this.props.tickets.length],
        ['resolved', this.state.resolvedTickets.length],
        ] 
    
        return (
            <div className="container mt-5">
                <div class="row mb-2">
                <h2 class="col-md-10 ">Tickets - {this.props.tickets.length} resolved - {this.state.resolvedTickets.length}  </h2>
                <ModalTickets resolvedTickets={this.state.resolvedTickets}/>
                </div>  
                
                <table className="table table-hover">
                    <thead>
                        <tr class="table-info">
                        <th scope="col">Code No</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Department</th>
                        <th scope="col">Employees</th>
                        <th scope="col">Message</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Show</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                        this.props.tickets.map((ticket) => {
                                return (
                                    <tr key={ticket._id}>
                                        <th scope="row" >{ ticket.code }</th>
                                        <td>{ ticket.customer ? ticket.customer.name : 'NA' }</td>
                                        <td>{ ticket.department ? ticket.department.name : 'NA' }</td>
                                        <td>{ ticket.employee ? ticket.employee.name : 'NA' }</td>
                                        <td>{ ticket.message }</td>
                                        <td>{ ticket.priority }</td>
                                        <td><Link to={`/tickets/show/${ticket._id}`} className="btn btn-primary">Show</Link></td>
                                        <td><Link to={`/tickets/${ticket._id}`} className="btn btn-secondary">Edit</Link></td>
                                        <td class ="mr-1"><button className="btn btn-danger" onClick={ () => {
                                        this.handleRemove(ticket._id)
                                        }} >Remove</button></td>
                                        <td> <input type ="checkbox" onClick ={() => {this.handleResolve(ticket)}}/> <label>Resolve</label> </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
    
                <div className="row mb-5">  
                    <Link to="/tickets/new" class="col-md-6">Add Ticket</Link> 
                </div>        
                
                <Container>
                        <Row>
                        <Col md="6">
                        <Chart
                        chartType="ScatterChart"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                        legendToggle
                        />
                        </Col>
                        
                        <Col md="6">
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={data2}
                            options={{
                                title: 'Tickets',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </Col> 
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets.filter((ticket) => ticket.isResolved == false)
        }
    }

export default connect(mapStateToProps)(TicketList)