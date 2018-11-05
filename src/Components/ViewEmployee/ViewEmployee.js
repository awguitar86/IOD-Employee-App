import React, { Component } from 'react';
import './viewEmployee.css';
import { findSingleEmployee } from '../../employee.services';

class ViewEmployee extends Component {
  constructor(props){
    super(props);
    this.state = {
        employee: ''
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    findSingleEmployee(id)
        .then( res => {
            this.setState({ employee: res.data[0] });
            console.log(res.data);
        })
  }

  render() {
      console.log(this.state.employee);
      const { id, first_name, last_name, email, phone, salary } = this.state.employee;
    return (
      <div className='view-wrap'>
        <div className='view-header'>
            <h2>{first_name}&nbsp;{last_name}</h2>
            <div>
                <h3>Edit</h3>
                <h3>Delete</h3>
            </div>
        </div>
        <div className='view-body'>
            <div className='left'>
                <p><strong>Employee ID:</strong> {id}</p>
                <p><strong>Email:</strong> {email}</p>
            </div>
            <div className='right'>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Salary:</strong> ${salary}</p>
            </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployee;