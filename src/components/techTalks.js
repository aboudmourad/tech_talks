import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";




class TechTalks extends Component {
    constructor(props){
        super(props);
         this.state= {
             showingListings: [],
             errors: "",
             userLoggedIn: false,
             randoms:null
         }
         }



    componentDidMount(){
        axios.get('/api/getAllTechTalk/')
        .then((response)=> {
            
            // console.log(response.data.list.length);
          this.setState({
              showingListings: response.data.list,
              userLoggedIn: response.data.isUser,
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
        const url = `/api/deletePost/${id}`;
        axios.delete(url)
        .then((response)=> {
            alert("Are you sure You want to Delete it?");
          console.log(response);
          
          window.location.href = "/";
      
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    render() {
        // console.log(this.state.userLoggedIn);
        // console.log(this.state.randoms);
        // console.log(this.state.showingListings);



        
        return (
            
            <div>
                 <h1 className="welcome">Welcome to the TechTalks</h1>
                { this.state.userLoggedIn ?<h1>Welcome : {this.state.userLoggedIn && this.state.userLoggedIn.fullName}</h1>: null}
                
                <div className="login">{ !this.state.userLoggedIn ?<Link to='/login_Registration'>Log In/Registration</Link> : null}</div>
   
                <div className="logout"> { this.state.userLoggedIn ?<Link to='/logout'>Log Out</Link> : null}</div>
                <br />
                <br />
                <center><h2>A Random TechTalk article for you to enjoy:</h2>
                <div><h3>Title: <br />{this.state.randoms && this.state.randoms.title}</h3></div>
                <div><h3> Posted by : <br />{ this.state.randoms && this.state.randoms.user_id && this.state.randoms.user_id.fullName }</h3></div>
                <Link to={`/showOne/${this.state.randoms && this.state.randoms._id}`}>View Post</Link></center>
                <hr />
               
                { this.state.userLoggedIn ? <Link to={`/createTechTalk`}>Write a TechTalks Post</Link> : null}
                
                <center><h2>The Latest TechTalks Articles:</h2></center>
                
                {this.state.showingListings && this.state.showingListings.slice(0).reverse().map((listing)=>{
                    return (
                        
                        <div  key= {listing._id}>
                        
                     
                        <center><div><h3>Title: <br />{listing.title}</h3></div>
                           <div><h3>Posted by: <br />{listing.user_id.fullName}</h3></div>
                           <div><h4>Like: <br />{listing.like}</h4></div>
                          <button type="button" className="btn btn-info btn-circle" onClick={(event) => { this.likeHandler(event, listing._id) }}><i className="glyphicon glyphicon-ok"></i></button>
                          <button type="button" className="btn btn-danger btn-circle btn-xl" onClick={(event) => { this.disLikeHandler(event, listing._id) }}><i class="glyphicon glyphicon-thumbs-down"></i></button>

                          {this.state.userLoggedIn && this.state.userLoggedIn.firstName === listing.user_id.firstName ? <button type="button" className="btn btn-warning btn-circle"onClick={(event) => { this.deleteHandler(event, listing._id) }}><i class="glyphicon glyphicon-remove"></i></button>: null} <br />
                          <Link to={`/showOne/${listing._id}`}>View Post</Link> <br />
                          {this.state.userLoggedIn && this.state.userLoggedIn.firstName === listing.user_id.firstName ? <Link to={`/updatePost/${listing._id}`}>Update Post</Link>: null}

                       
                          </center>
                           
                           <hr />
                           </div>
                    )
                })}
                
            </div>
        );
    }
}

export default TechTalks;
