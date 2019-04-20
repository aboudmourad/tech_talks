import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Nav from "./Nav";
import swal from 'sweetalert';

class CreateTechTalk extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            keywords:"",
            summary:"",
            story:"",
            errors:{}

        }
        this.updateInputField = this.updateInputField.bind(this);
        this.sendFrom = this.sendFrom.bind(this);
    }
    sendFrom(event){
        console.log("heheheh");
        event.preventDefault();
        axios.post('/api/createTechTalk/', {
            title:this.state.title,
            keywords:this.state.keywords,
            summary:this.state.summary,
            story:this.state.story,
        }).then((response) => {
            console.log(response);
            swal("Good job!", "The List has been updated!", "success");
        }).catch((error)=>{
            console.log(error);
            this.setState({errors : error.response.data.errors});
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
                <h1><em>Write a TechTalk:</em></h1>
                 <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input type="text" name="title" value={this.state.title} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title"/>
                  <h3 style={{color:"red"}}>{this.state.errors && this.state.errors.title && <p>{this.state.errors.title.msg} </p> }</h3>

                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Keywords:</label>
                  <input type="text" name="keywords" value={this.state.keywords} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Keywords"/>
                  <h3 style={{color:"red"}}>{this.state.errors && this.state.errors.keywords && <p>{this.state.errors.keywords.msg} </p> }</h3>

                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Summary:</label>
                  <input type="text" name="summary" value={this.state.summary} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Summary"/>
                  <h3 style={{color:"red"}}>{this.state.errors && this.state.errors.summary && <p>{this.state.errors.summary.msg} </p> }</h3>

                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Story:</label>
                  <textarea type="text" name="story" value={this.state.story} onChange={this.updateInputField} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Story"/>
                  <h3 style={{color:"red"}}>{this.state.errors && this.state.errors.story && <p>{this.state.errors.story.msg} </p> }</h3>
                  
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

export default CreateTechTalk;
