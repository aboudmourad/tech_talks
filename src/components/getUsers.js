import React, { Component } from 'react'
import axios from "axios";
import Nav from "./Nav"
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


export default class Users extends Component {
    constructor(props){
        super(props);
        this.state={
          users:[]

        }
    }

    componentDidMount(){
    axios.get('/api/users')
    .then((response)=> {
     console.log(response.data);
     this.setState({ users : response.data})    
    })
    .catch( (error) => {
    console.log(error);
    });
  }
    deleteHandler = (event, id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          const url = `/api/deleteUser/${id}`;
      axios.delete(url)
      .then((response)=> {
          // // alert("Are you sure You want to Delete it?");
          // swal("Deleting User", "The user has been successfuly deleted", "success");
          
        console.log(response);
        
        
        window.location.href = "/users";
    
      })
      .catch(function (error) {
        console.log(error);
      });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      
  }




    
  render() {
    return (
        
      <div>
          <Nav />
          <table class="table">
                    
                    <thead>
                      <tr>
                        <th scope="col">Users</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit Information</th>
                        <th scope="col">Information</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    
          {this.state.users && this.state.users.map((user)=>{
              return(
                  
                    
                      
                    <tbody key ={user._id}>
                    <tr>
                        <td>{user.fullName}</td>
                        <td>{user.description}</td>
                        <td>{user.email}</td>
                        <td><Link to={`/updateUsers/${user._id}`}><button className="glyphicon glyphicon-cog"></button></Link></td>
                        <td><Link to={`/showOneUser/${user._id}`}><button type="button" className="glyphicon glyphicon-eye-open" ><i ></i></button></Link></td>

                        <td><button type="button" className="btn btn-warning btn-circle" onClick={(event) => { this.deleteHandler(event, user._id) }} ><i class="glyphicon glyphicon-remove"></i></button></td>
                      
                        </tr>
          </tbody>
                  
                  
              )
          })}
         
     </table>
     <Link className ="btn btn-info btn-lg" to={`/`}>Go Back</Link>
      </div>
    )
  }
}
