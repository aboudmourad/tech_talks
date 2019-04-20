import React, { Component } from 'react';
import axios from "axios";
import Nav from "./Nav";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default class UpdateUser extends Component {

    constructor(props){
        super(props);
        this.state={
            fullName:"",
            description:"",
            email:"",
            password:"",
            errorsUpdate:{}

        }
        this.updateInputField = this.updateInputField.bind(this);
        this.sendFrom = this.sendFrom.bind(this);
    }
    sendFrom(event){
        console.log(this.props);
        console.log('haha');
        event.preventDefault();
        axios.put(`/api/updateUser/${this.props.match.params.id}`, {
            fullName:this.state.fullName,
            description:this.state.description,
            email:this.state.email,
            password:this.state.password,
        }).then((response) => {
            console.log(response);
            swal("Good job!", "The List has been updated!", "success");
            // window.location.href="/craigslist";
        }).catch((error)=>{
            console.log(error);
            this.setState({errorsUpdate : error.response.data.errors});
        });
        
      }

    updateInputField(event){
        this.setState({[event.target.name] : event.target.value})
      }
  render() {
    return (
      <div>
          < Nav />
          <form style={{width: 600+ "px", marginLeft:25 + "%"}}>
                 <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Full Name</label>
                  <input type="text" name="fullName" value={this.state.fullName} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.fullName && <p>{this.state.errorsUpdate.fullName.msg} </p> }</h3>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description</label>
                  <input type="text" name="description" value={this.state.description} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="description"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.description && <p>{this.state.errorsUpdate.description.msg} </p> }</h3>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input type="email" name="email" value={this.state.email} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.email && <p>{this.state.errorsUpdate.email.msg} </p> }</h3>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input type="password" name="password" value={this.state.password} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="password"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.password && <p>{this.state.errorsUpdate.password.msg} </p> }</h3>
                  <button type="submit" onClick={this.sendFrom} className="btn btn-primary">Submit</button>
                </div>
                <Link className ="btn btn-info btn-lg" to={`/users`}>Go Back</Link>
              </form>
              
            </div>
          
          
      
    )
  }
}
