import React, { Component } from 'react';
import './employees.css';

class EmployeeItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { id, firstName, lastName, email, phone, salary } = this.props;
    return (
      <tr className="employee-item">
          <td>{id}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{salary}</td>
      </tr>
    );
  }
}

export default EmployeeItem;