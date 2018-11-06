import React, { Component } from 'react';
import './viewEmployee.css';
import { findSingleEmployee, updateEmployee, deleteEmployee } from '../../employee.services';
import Modal from 'react-modal';

class ViewEmployee extends Component {
  constructor(props){
    super(props);
    this.state = {
        employee: '',
        editModalOpen: false,
        deleteModalOpen: false
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

  editOpenModal(){
    this.setState({ editModalOpen: true });
  }
  editCloseModal(){
      this.setState({ editModalOpen: false });
  }
  deleteOpenModal(){
      this.setState({ deleteModalOpen: true });
  }
  deleteOpenModal(){
      this.setState({ deleteModalOpen: true });
  }

  render() {
      console.log(this.state.employee);
      const { id, first_name, last_name, email, phone, salary } = this.state.employee;
    return (
      <div className='view-wrap'>
        <div className='view-header'>
            <h2>{first_name}&nbsp;{last_name}</h2>
            <div>
                <button className='edit'>Edit</button>
                <button className='delete'>Delete</button>
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

        <Modal>

        </Modal>
      </div>
    );
  }
}

export default ViewEmployee;