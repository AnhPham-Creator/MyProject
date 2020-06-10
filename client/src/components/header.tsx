import React, { Component } from 'react';
//import './style.css';

class header extends Component {
    render() {
        return (
            <div className="table-title" >
                <div className="row">
                    <div className="col-sm-6">
                        <h2>List <b>Users</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <a href="#addUser" className="btn btn-success" data-toggle="modal"><i
                            className="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default header;
