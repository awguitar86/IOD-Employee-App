import React, { Component } from 'react';
import './employees.css';
import {Link} from 'react-router-dom';

class EmployeeItem extends Component {
  render() {
    const { id, firstName, lastName, email, phone, salary } = this.props;
    return (
        <tr className="employee-item">
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>${salary}</td>
            <td><Link to={`/viewemployee/${id}`}>View</Link></td>
        </tr>
    );
  }
}

export default EmployeeItem;