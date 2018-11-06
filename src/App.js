import React, { Component } from 'react';
import './App.css';
import Employees from './Components/Employees/Employees';
import {Route} from 'react-router-dom';
import ViewEmployee from './Components/ViewEmployee/ViewEmployee';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Employees} />
        <Route path='/viewemployee/:id' component={ViewEmployee}/>
      </div>
    );
  }
}

export default App;
