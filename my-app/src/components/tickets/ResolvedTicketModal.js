import React from 'react'
import { Button, ButtonToolbar, Modal } from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
    
    return (
     <Modal
       {...props}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
           Resolved Tickets - {props.resolvedTickets.length}
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <h4>Good Job Team</h4>
         <table className="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">Code No</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Department</th>
                    <th scope="col">Employees</th>
                    <th scope="col">Message</th>
                    <th scope="col">Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.resolvedTickets.map((ticket) => {
                            return (
                                <tr key={ticket._id}>
                                    <th scope="row">{ ticket.code }</th>
                                    <td>{ ticket.customer ? ticket.customer.name : 'NA' }</td>
                                    <td>{ ticket.department ? ticket.department.name : 'NA' }</td>
                                    <td>{ ticket.employee ? ticket.employee.name : 'NA' }</td>
                                    <td>{ ticket.message }</td>
                                    <td>{ ticket.priority }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
         </table>       
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={props.onHide}>Close</Button>
       </Modal.Footer>
     </Modal>
   );
 }

 function ModalTickets(props) {
    const [modalShow, setModalShow] = React.useState(false);
 
   return (
     <ButtonToolbar>
       <Button variant="success"  size="sm" onClick={() => setModalShow(true)}>
         show Resolved Tickets
       </Button>
 
       <MyVerticallyCenteredModal
         resolvedTickets = {props.resolvedTickets}
         show={modalShow}
         onHide={() => setModalShow(false)}
       />
     </ButtonToolbar>
   );
 }

 export default ModalTickets