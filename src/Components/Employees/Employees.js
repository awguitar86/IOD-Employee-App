import React, { Component } from 'react';
import './employees.css';
import Modal from 'react-modal';
import { findEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../employee.services';
import EmployeeItem from './EmployeeItem';
import {Link} from 'react-router-dom';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    }
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    this.refresh();
  }

  refresh(){
    findEmployees().then( res => {
      this.setState({ employees: res.data });
      console.log(res.data);
    });
  }



  render() {
    console.log(this.state.employees);
    const employees = this.state.employees;
    const displayEmployees = employees.map(employeeItem => {
      const index = employees.indexOf(employeeItem);
      return (<EmployeeItem
                  key={`employee${index}`}
                  index={index}
                  id={employeeItem.id}
                  firstName={employeeItem.first_name}
                  lastName={employeeItem.last_name}
                  email={employeeItem.email}
                  phone={employeeItem.phone}
                  salary={employeeItem.salary}
      />)
    })
    return (
      <div className="employee-wrap">
        <div className='header'>
          <h2>Employee Details</h2>
          <Link to='/addemployee'><button>Add New Employee</button></Link>
        </div>
        <hr/>
        <div className='employee-body'>
          <table>
            <thead>
              <tr className='table-header'>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {displayEmployees}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Employees;