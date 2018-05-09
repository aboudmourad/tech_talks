import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Register from './components/registration';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <hr/><br/>
        <Register />
      </div>
    );
  }
}

export default App;
