import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";


export default class Nav extends Component {
  constructor(props){
    super(props);
     this.state= {
         session:null,
         sessionAdmin:null
     }
     
     }

  componentDidMount(){
    axios.get('/api/session')
        .then( (response)=> {
          console.log(response);
            this.setState({session:response.data.session});
        //  console.log(response.data.session.user.fullName);
         })
        .catch(function (error) {
          console.log(error);
         });

         axios.get('/api/sessionAdmin')
        .then( (response)=> {
            this.setState({sessionAdmin:response.data.session});
        //  console.log(response.data.session.fullName);
        console.log(response);
         })
        .catch(function (error) {
          console.log(error);
         });
  }
  render() {
    
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{marginTop:20+"px"}}>
           <div className="navbar-brand" style={{marginTop:9+"px", height:45 +"px"}} ><h1><em>TechTalk</em></h1></div>
          <ul className="navbar-nav">
          <li className="nav-item">
          {this.state.sessionAdmin && this.state.sessionAdmin.fullName ?<Link className="nav-link"  to='/users'><h2>User</h2></Link>: null}
          </li>
          <li className="nav-item">
          <Link className="nav-link"  style={{marginLeft:10 +"px"}} to='/'><h2>Post</h2></Link>
          </li>
          <li className="nav-item">
           <Link className="nav-link" style={{marginLeft:10 +"px"}} to='/aboutUs'><h2>About Us</h2></Link>
             </li>
          <li className="nav-item">
          {this.state.session && this.state.session.fullName ?<div className="nav-link"  style={{marginLeft:10 +"px"}}><h2>Welcome: {this.state.session.fullName.toUpperCase()}</h2></div>: null}
          </li>
          <li className="nav-item">
          {this.state.sessionAdmin ?<div className="nav-link"  style={{marginLeft:10 +"px"}}><h2>Welcome: {this.state.sessionAdmin.fullName.toUpperCase()}</h2></div>: null}
          </li>
           <li className="nav-item">
           { !this.state.session && !this.state.sessionAdmin  ?<Link className="nav-link" style={{marginLeft:900 +"px"}} to='/login_Registration'><h1 className="btn btn-default navbar-btn">Login/Registration</h1></Link>: null}
           </li>
           <li className="nav-item">
           { this.state.session || this.state.sessionAdmin?<Link className="nav-link" style={{marginLeft:800 +"px"}} to='/logout'><h1 className="btn btn-default navbar-btn">LogOut</h1></Link>: null}
             </li>
            
             
           
           
          
          
         </ul>
         
        </nav>
        
      </div>
    )
  }
}
