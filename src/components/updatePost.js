import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Nav from "./Nav";

class UpdatePost extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            keywords:"",
            summary:"",
            story:"",
            errorsUpdate:{}

        }
        this.updateInputField = this.updateInputField.bind(this);
        this.sendFrom = this.sendFrom.bind(this);
    }
    sendFrom(event){
        // console.log(this.props);
        // console.log('haha');
        event.preventDefault();
        axios.put(`/api/updatingPost/${this.props.match.params.id}`, {
            title:this.state.title,
            keywords:this.state.keywords,
            summary:this.state.summary,
            story:this.state.story,
        }).then((response) => {
            console.log(response);
            // alert("The List has been updated");
            // window.location.href="/craigslist";
            swal("Good job!", "The List has been updated!", "success");

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
                <Nav />
                <div>
                
               
                <form style={{width: 600+ "px", marginLeft:25 + "%"}}>
                <h1><em>Update a Post:</em></h1>
                 <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input type="text" name="title" value={this.state.title} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.title && <p>{this.state.errorsUpdate.title.msg} </p> }</h3>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Keywords</label>
                  <input type="text" name="keywords" value={this.state.keywords} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Keywords"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.keywords && <p>{this.state.errorsUpdate.price.msg} </p> }</h3>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">summary</label>
                  <input type="text" name="summary" value={this.state.summary} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Summary"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.description && <p>{this.state.errorsUpdate.description.msg} </p> }</h3>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">story</label>
                  <input type="text" name="story" value={this.state.story} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Story"/>
                  <h3 style={{color:"red"}}>{this.state.errorsUpdate && this.state.errorsUpdate.contact && <p>{this.state.errorsUpdate.contact.msg} </p> }</h3>
                  <button type="submit" onClick={this.sendFrom} className="btn btn-primary">Submit</button>
                </div>
                <br />
                <Link className ="btn btn-info btn-lg" to={`/`}>Go Back</Link>
              </form>
            </div>
            
            </div>
        );
    }
}

export default UpdatePost;
