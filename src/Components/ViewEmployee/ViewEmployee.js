import React, { Component } from 'react';
import './viewEmployee.css';
import { findSingleEmployee, updateEmployee, deleteEmployee } from '../../employee.services';
import Modal from 'react-modal';
import { Redirect, Link } from 'react-router-dom';

class ViewEmployee extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        salary: '',
        editModalOpen: false,
        deleteModalOpen: false,
        deleteRedirect: false
    }
    this.editOpenModal = this.editOpenModal.bind(this);
    this.editCloseModal = this.editCloseModal.bind(this);
    this.deleteOpenModal = this.deleteOpenModal.bind(this);
    this.deleteCloseModal = this.deleteCloseModal.bind(this);
    this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
    this.handleEditEmployee = this.handleEditEmployee.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    findSingleEmployee(id)
        .then( res => {
            this.setState({
              id: res.data[0].id,
              first_name: res.data[0].first_name,
              last_name: res.data[0].last_name,
              email: res.data[0].email,
              phone: res.data[0].phone,
              salary: res.data[0].salary
            });
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
  deleteCloseModal(){
      this.setState({ deleteModalOpen: false });
  }
  cancelEdit(){
    let id = this.state.id;
    findSingleEmployee(id)
      .then( res => {
          this.setState({
            id: res.data[0].id,
            first_name: res.data[0].first_name,
            last_name: res.data[0].last_name,
            email: res.data[0].email,
            phone: res.data[0].phone,
            salary: res.data[0].salary
          });
      })
    this.editCloseModal();
  }

  handleEditEmployee(){
    let { id, first_name, last_name, email, phone, salary } = this.state;
    let reqBody = { first_name, last_name, email, phone, salary };
    updateEmployee(id, reqBody)
      .then( res => {
        if( res.status !== 200 ) {
            console.log(res);
        }
        else {
          findSingleEmployee(id)
            .then( res => {
                this.setState({
                  id: res.data[0].id,
                  first_name: res.data[0].first_name,
                  last_name: res.data[0].last_name,
                  email: res.data[0].email,
                  phone: res.data[0].phone,
                  salary: res.data[0].salary
                });
            })
          this.editCloseModal();
        }
      })
      .catch( err => {throw err})
  }

  handleInputChange(e){
    const key = e.target.name;
    let newState = this.state[key];
    newState = e.target.value;
    this.setState({ [key]: newState });
}

  handleDeleteEmployee(){
    let id = this.state.id;
    deleteEmployee(id)
      .then( res => {
        this.timer = setInterval( this.handleDeleteRedirect.bind(this), 1000 );
      })
      .catch( err => {throw err} );
  }

  handleDeleteRedirect(){
    this.setState({ deleteRedirect: true, deleteModalOpen: false});
    clearInterval(this.timer);
  }

  render() {
      const { id, first_name, last_name, email, phone, salary } = this.state;
      let modalStyle = "display:flex; justify-content:center;";
      if(this.state.deleteRedirect){
        return <Redirect to='/'/>;
      }
    return (
      <div className='view-wrap'>
        <div className='view-header'>
            <h2>{first_name}&nbsp;{last_name}</h2>
            <div>
                <button className='edit' onClick={this.editOpenModal}>Edit</button>
                <button className='delete' onClick={this.deleteOpenModal}>Delete</button>
                <Link to='/'><button className='back'>Back</button></Link>
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

        <Modal
          isOpen={this.state.editModalOpen}
          onRequestClose={this.editCloseModal}
          contentLabel="Edit Employee"
          modalStyle={modalStyle}
          className="edit-modal"
          overlayClassName="edit-modal-overlay"
          ariaHideApp={false}
        >
          <div className='edit-modal-body'>
            <h3>Update Employee</h3>
            <p>Please edit the input values and submit to update the record.</p>

            <input placeholder='First Name' type='text' name='first_name' value={this.state.first_name} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Last Name' type='text' name='last_name' value={this.state.last_name} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Email' type='text' name='email' value={this.state.email} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Phone' type='text' name='phone' value={this.state.phone} onChange={ e => { this.handleInputChange(e) }} />
            <input placeholder='Salary' type='text' name='salary' value={this.state.salary} onChange={ e => { this.handleInputChange(e) }} />
            <div>
              <button className='edit-cancel-btn' onClick={this.cancelEdit}>Cancel</button>
              <button className='submit-btn' onClick={this.handleEditEmployee}>Submit</button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.deleteModalOpen}
          onRequestClose={this.deleteCloseModal}
          contentLabel="Delete Employee"
          modalStyle={modalStyle}
          className="delete-modal"
          overlayClassName="delete-modal-overlay"
          ariaHideApp={false}
        >
          <div className='delete-modal-body'>
            <h3>Are You Sure You Want To Delete This Employee?</h3>
            <div>
              <button className='cancel-btn' onClick={this.deleteCloseModal}>Cancel</button>
              <button className='delete-btn' onClick={this.handleDeleteEmployee}>Delete</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ViewEmployee;