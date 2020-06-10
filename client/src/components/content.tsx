import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import './style.css';
import User from '../class/user';
import DateTimePicker from '../components/datimepicker';

function Content(props: any) {
        const [show, setShow] = useState(false)
        if(props.users.length > 0) {
            var listUser = props.users.map((user: User, i: number) => {
                return ( 
                        <tr key={i}>
                            <td>1</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.tel}</td>
                        </tr>
                )
            })
        }
        return (
            <div className="container">
                <div className="table-title" >
                    
                    <Row>
                        <Col sm={8}><h2><b>List Users</b></h2></Col>
                        <Col sm={4}>
                        <Button className="bt-addnew" variant="primary" onClick={() => setShow(true)}>
                                Add New Employee</Button>
                        </Col>
                    </Row>
                </div>
                <div className="table-list">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Tel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser}
                        </tbody>          
                    </Table>
                </div>
                <div>
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Custom Modal Styling
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                                {DateTimePicker}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" >
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
}

export default Content;