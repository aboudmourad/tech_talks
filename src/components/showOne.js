import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Nav from "./Nav"




class ShowOne extends Component {
    constructor(props){
        super(props);
         this.state= {
             data:{
             title: "",
             keyword:"",
             summery: "",
             story: "",
             like:""
             },
             session:null,
         }
         
         }

    componentDidMount(){
        console.log(this.props);
        axios.get(`/api/showOneTechTalk/${this.props.match.params.id}`)
        .then((response)=> {
          this.setState({data:response.data});
          console.log(response.data);
          
        //   window.location.href = "/";
      
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.get('/api/session')
        .then( (response)=> {
            this.setState({session:response.data.session.user.fullName});
         console.log(response.data.session.user.fullName);
         })
        .catch(function (error) {
          console.log(error);
         });
    }
    render() {
        console.log(this.state.data);
        return (
            <div>
                <Nav />
                <h1><em>More Details about this post:</em></h1>
                <div className="card bg-light mb-3" style={{maxWidth: 1000+"px", marginTop:50+"px"}}>
                  <div className="card-header"><h3>{this.state.data.title}</h3></div>
                      <div className="card-body">
                         <h4 className="card-title">{this.state.data.keywords}</h4>
                         <h4 className="card-title">{this.state.data.summary}</h4>
                           <p className="card-text">{this.state.data.story}</p>
                      </div>
                    </div>
               
             
             { this.state.session ? <h3>Posted By: <br />{this.state.session}</h3> : null}
             <Link className ="btn btn-info btn-lg" to={`/`}>Go Back</Link>
            
            </div>
        );
    }
}

export default ShowOne;
// {/* <center><h4>Title:</h4> <br /><h5>{this.state.data.title}</h5><br />
//              <h4>Keywords:</h4><br /><h5>{this.state.data.keywords}</h5><br />
//              <h4>Summery:</h4><br /><h5>{this.state.data.summary}</h5><br />
//              <h4>Story:</h4><h5> <br />{this.state.data.story}</h5> 
//              </center> */}