import React, { Component } from 'react';
import './employees.css';
import Modal from 'react-modal';
import { findEmployees, createEmployee } from '../../employee.services';
import EmployeeItem from './EmployeeItem';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      salary: '',
      modalOpen: false,
    }
    this.refresh = this.refresh.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    this.refresh();
  }

  refresh(){
    findEmployees().then( res => {
      this.setState({ employees: res.data });
    });
  }

  addEmployee(){
    let { first_name, last_name, email, phone, salary } = this.state;
    let reqBody = { first_name, last_name, email, phone, salary };
    createEmployee(reqBody)
    .then( res => {
      this.refresh();
    })
    .catch( err => {throw err})
    this.closeModal();
  }
  handleInputChange(e){
    const key = e.target.name;
    let newState = this.state[key];
    newState = e.target.value;
    this.setState({ [key]: newState });
  }

  openModal(){
    this.setState({ modalOpen: true });
  }

  closeModal(){
    this.setState({
      modalOpen: false,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      salary: '',
    });
}

  render() {
    let modalStyle = "display:flex; justify-content:center;";
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
          <button onClick={this.openModal}>Add New Employee</button>
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
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Employee"
          modalStyle={modalStyle}
          className="add-modal"
          overlayClassName="add-modal-overlay"
          ariaHideApp={false}
        >
          <div className='add-modal-body'>
            <h3>Add New Employee</h3>
            <p>Please input the values and submit to add the record.</p>

            <input placeholder='First Name' type='text' name='first_name' value={this.state.first_name} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Last Name' type='text' name='last_name' value={this.state.last_name} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Email' type='text' name='email' value={this.state.email} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Phone' type='text' name='phone' value={this.state.phone} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Salary' type='text' name='salary' value={this.state.salary} onChange={ e => { this.handleInputChange(e) }} />
            <div>
              <button className='add-cancel-btn' onClick={this.closeModal}>Cancel</button>
              <button className='submit-btn' onClick={this.addEmployee}>Submit</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Employees;