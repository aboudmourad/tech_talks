import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';



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
               <center><h3>Title: <br />{this.state.data.title}</h3>
             <h3>Keywords:<br />{this.state.data.keywords}</h3>
             <h3>Summery:<br />{this.state.data.summary}</h3>
             <h3>Story: <br />{this.state.data.story}</h3> 
             
             { this.state.session ? <h3>Posted By: <br />{this.state.session}</h3> : null}
             <Link to={`/`}>Go Back</Link>
             </center>
            </div>
        );
    }
}

export default ShowOne;
