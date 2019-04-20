import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Nav from "./Nav"
import swal from 'sweetalert';




class TechTalks extends Component {
    constructor(props){
        super(props);
         this.state= {
             showingListings: [],
             errors: "",
             userLoggedIn: false,
             adminLoggedIn: false,
             randoms:null,
           
         }
         }



    componentDidMount(){
        axios.get('/api/getAllTechTalk/')
        .then((response)=> {
            console.log(response);
            
            // console.log(response.data.list.length);
          this.setState({
              showingListings: response.data.list,
              userLoggedIn: response.data.isUser,
              adminLoggedIn: response.data.isAdmin,
              randoms :response.data.list[Math.floor(Math.random() * Math.floor(5))]
            });
        //   window.location.href = "/";
        // var random = response.data.list[Math.floor(Math.random() * Math.floor(5))];
        // console.log(random);
        })
        .catch( (error) =>{
          console.log(error);
          this.setState({errors : "Server Error"});
        });
        
    }

    likeHandler = (event,id) => {
        axios.post(`/api/likePost/${id}`)
        .then((response)=> {
        //   this.setState({response});
          console.log(response.data);
          
          const newList = this.state.showingListings.map( (item, key) => {
            if(response.data._id === item._id) {
                item.like = response.data.like;
            }
            return item;
          });
        
          this.setState( {showingListings: newList} );
        //   console.log(this.state.showingListings);
        //   window.location.reload();
      
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    disLikeHandler = (event,id) => {
        axios.post(`/api/disLikePost/${id}`)
        .then((response)=> {
        //   this.setState({response});
          console.log(response.data);

          const newList = this.state.showingListings.map( (item, key) => {
            if(response.data._id === item._id) {
                item.like = response.data.like;
            }
            return item;
          });
        
          this.setState( {showingListings: newList} );
        //   console.log(this.state.showingListings);
        //   window.location.reload();
      
        })
        .catch(function (error) {
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
              const url = `/api/deletePost/${id}`;
        axios.delete(url)
        .then((response)=> {
            
          console.log(response);
          
          window.location.href = "/";
      
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
        // console.log(this.state.userLoggedIn);
        // console.log(this.state.randoms);
        // console.log(this.state.showingListings);


        
        
        return (
            
            <div>
                <Nav />
 



                
                <br />
                <br />
                <center><h2>A Random TechTalk article for you to enjoy:</h2>
                <div className="card bg-light mb-3" style={{maxWidth: 50 +"rem"}}>
                <div className="card-header"><h3>Title: <br />{this.state.randoms && this.state.randoms.title}</h3></div>
                <div className="card-body"><h3> Posted by : <br />{ this.state.randoms && this.state.randoms.user_id && this.state.randoms.user_id.fullName }</h3></div>
                
                </div>
                <Link className ="btn btn-info btn-lg" to={`/showOne/${this.state.randoms && this.state.randoms._id}`}>View Post</Link>

                </center>
                
                <hr />
               
                
                <center><h2><em>The Latest TechTalks Articles:</em></h2></center><br />
                { this.state.userLoggedIn || this.state.adminLoggedIn ? <Link style={{marginLeft:45 +"%"}} className ="btn btn-info btn-lg" to={`/createTechTalk`}>Write a TechTalks Post</Link> : null}
                <br />
                <br />
                {this.state.showingListings && this.state.showingListings.slice(0).reverse().map((listing)=>{
                    return (
                        
                        <div  style ={{display:"inline-block", marginLeft:40 +"px"}} key= {listing._id}>
                        
                            <div  onClick={(event) => {window.location.href = `/showOne/${listing._id}`;}}>
                        <div className="card bg-light mb-3" style={{maxWidth: 50 +"rem"}}>
                            <div  className="card-header"><h5>By: {listing.user_id.fullName}</h5></div>
                                <div className="card-body">
                                    <h4 className="card-title">{listing.title}</h4>
                                      <h6 className="card-text">Rate: {listing.like}</h6>
                                      
                                </div>
                                
                            </div>
                            </div> 
                            <br />
                            
                     
                       
                          <button type="button" className="btn btn-info btn-circle" onClick={(event) => { this.likeHandler(event, listing._id); return false }}><i className="glyphicon glyphicon-ok"></i></button>
                          <button type="button" className="btn btn-danger btn-circle btn-xl" onClick={(event) => { this.disLikeHandler(event, listing._id); return false }}><i className="glyphicon glyphicon-thumbs-down"></i></button>
                            <br />
                          {this.state.userLoggedIn && this.state.userLoggedIn.firstName === listing.user_id.firstName || this.state.adminLoggedIn ? <button type="button" className="btn btn-warning btn-circle"onClick={(event) => { this.deleteHandler(event, listing._id) }}><i class="glyphicon glyphicon-remove"></i></button>: null} 
                          <br />
 
                          <br />
                          <br />
                          {this.state.userLoggedIn && this.state.userLoggedIn.firstName === listing.user_id.firstName || this.state.adminLoggedIn ? <Link className ="btn btn-info btn-lg" to={`/updatePost/${listing._id}`}>Update Post</Link>: null}

                       
                          
                           
                           <hr />
                           </div>
                    )
                })}
                
            </div>
        );
    }
}

export default TechTalks;
