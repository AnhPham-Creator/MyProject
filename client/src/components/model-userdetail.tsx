import React, { Component } from 'react';
import './style.css';

class modelUserDetail extends Component {
    render() {
        return (
            <div id="detailUser" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" id="name" name="name" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="email" name="email" disabled></input>
                                </div>
                                <div className="form-group">
                                    <label>Birthday</label>
                                    <input type="text" className="form-control" id="birthday" name="birthday" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Tel</label>
                                    <input type="text" className="form-control" id="tel" name="tel" disabled />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select className="form-control" id="roleselect" name="roleselect" disabled>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default modelUserDetail;
