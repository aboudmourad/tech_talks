import React, { Component } from 'react'
import axios from "axios";
import Nav from "./Nav"
import { Link } from 'react-router-dom';
export default class ShowOneUser extends Component {
    constructor(props){
        super(props);
         this.state= {
             fullName: "",
             email:"",
             description: "",
            }
         }
         componentDidMount(){
            console.log(this.props);
            axios.get(`/api/showOneUser/${this.props.match.params.id}`)
            .then((response)=> {
              this.setState({
                  fullName:response.data.fullName,
                  email: response.data.email,
                  description:response.data.description
            });
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
  render() {
    return (
      <div>
        <Nav />
        <h1><em>More Details about This User:</em></h1>
                <div className="card bg-light mb-3" style={{maxWidth: 500+"px", marginTop:50+"px"}}>
                  <div className="card-header"><h3>Name : {this.state.fullName}</h3></div>
                      <div className="card-body">
                         <h4 className="card-title">Email: {this.state.email}</h4>
                         <h4 className="card-title">Description: {this.state.description}</h4>
                         
                      </div>
                     
                    </div>
                    <Link className ="btn btn-info btn-lg" to={`/users`}>Go Back</Link>
      </div>
    )
  }
}
