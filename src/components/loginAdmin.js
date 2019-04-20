import React, { Component } from 'react';
import axios from "axios";



class LoginAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
          loginErrors: {},
          matchingPassword: null,
          loginEmail: "",
          loginPassword: ""
        }
        this.updateInputField = this.updateInputField.bind(this);
        this.sendFrom = this.sendFrom.bind(this);
      }

      updateInputField(event){
        this.setState({[event.target.name] : event.target.value})
      }

      sendFrom(event){
        event.preventDefault();
        axios.post('/api/loginAdmin', {
            email : this.state.loginEmail,
            password: this.state.loginPassword
        }).then((response) => {
            console.log(response);
            window.location.href="/";
        })
        .catch((error)=>{
            console.log(error.response.data.message);
            // this.setState({loginErrors : "Server Error"});
            this.setState({loginErrors: error.response.data.errors, matchingPassword :error.response.data.message });
        });
        
      }
    
    render() {
        return (
            <div>
                
                
                
                <form>
                   <div className="loginPage">
                   <h3><strong>Do you Have an account? Please Login</strong></h3>
                 <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" name="loginEmail" value={this.state.loginEmail} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                  <h3 style={{color:"red"}}>{this.state.loginErrors && this.state.loginErrors.email && <p>{this.state.loginErrors.email.msg} </p> }</h3>
                </div>
                <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                 <input type="password" name="loginPassword" value={this.state.loginPassword} onChange={this.updateInputField} className="form-control" id="exampleInputPassword1" placeholder="Password"/><br/>
                 <h3 style={{color:"red"}}>{this.state.loginErrors && this.state.loginErrors.password && <p>{this.state.loginErrors.password.msg} </p> }</h3>
                 <h3 style={{color:"red"}}>{this.state.matchingPassword}  </h3>

                <button type="submit" onClick={this.sendFrom} className="btn btn-primary">Submit</button>
                 </div>
                 </div>
              </form>
            </div> 
                
        );
    }
}

export default LoginAdmin;
