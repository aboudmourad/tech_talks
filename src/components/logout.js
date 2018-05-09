import React, { Component } from 'react';
import axios from 'axios';



class Logout extends Component {
    componentDidMount() {
        axios.get('/api/logout')
  .then(function (response) {
    console.log(response);
    window.location.href ='/';
  })
  .catch(function (error) {
    console.log(error);
  });
}

    render() {
        return (
            <div>
                <p>Loggin Out...</p>
            </div>
        );
    }
}

export default Logout;
