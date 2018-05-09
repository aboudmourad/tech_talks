import React, { Component } from 'react';
import axios from "axios";

class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        errors: {},
        fullName:"",
        description:"",
        email: "",
        password: "",
        confirmPassword: ""
      }

      this.updateInputField = this.updateInputField.bind(this);
      this.sendFrom = this.sendFrom.bind(this);
    }
   
    updateInputField(event){
      this.setState({[event.target.name] : event.target.value})
    }
  
    //NOTE NOTE NOTE we need to link the proxy of back-end to the front-end check the proxy in the package.json
    sendFrom(event){
      event.preventDefault();
      console.log(this.state);
      // this.setState({errors:""});
      // if(this.state.password !== this.state.confirmPassword) {
      //   this.setState({errors: "Password Does not match"});
      // } else {
        axios.post('/api/register/', {
          fullName:this.state.fullName,
          description:this.state.description,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        })
          .then( (response) => {
            console.log(response);
            alert("You have been registered Please login");
            // window.location.href="/";
          })
          .catch( (error) => {
            // console.log(error.response.data.errors);
            this.setState({errors: error.response.data.errors});
            
          });

    }
  
      render() {
        const err = Object.keys( this.state.errors ).map( (key) => {
          const item = this.state.errors[key];
          return {name: item['param'], msg: item['msg']};
        });

        const errorsMsg = err.map((item, key) => {
          return <div key={key}>{item.msg}</div>
        })
        
        console.log(err);
          return (
              <div>
                  <h1>New Account? Please Sign Up Now!</h1>
                  <h3 style={{color:"red"}}>{errorsMsg}</h3>
                  <form>
                   <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Full Name</label>
                    <input type="text" name="fullName" value={this.state.fullName} onChange={this.updateInputField} className="form-control" aria-describedby="emailHelp" placeholder="Full Name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.updateInputField} className="form-control" aria-describedby="emailHelp" placeholder="Description"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.updateInputField} className="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.updateInputField} className="form-control" aria-describedby="emailHelp" placeholder="Enter password"/>
                  </div>
                  <div className="form-group">
                    <label >Confirm Password</label>
                    <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.updateInputField} className="form-control" aria-describedby="emailHelp" placeholder="Enter Confirmt password"/>
                    <button type="submit" value="Register" onClick={this.sendFrom} className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div> 
              
          );
      }
  }
  
  export default Register;