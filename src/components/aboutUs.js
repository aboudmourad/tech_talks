import React, { Component } from 'react'
import Nav from "./Nav"

export default class AboutUs extends Component {
  render() {
    return (
      <div>
          <Nav />
        <div className="form-group">
        <form style={{width: 600+ "px", marginLeft:25 + "%"}} action="https://formspree.io/aboudmourad@hotmail.com" method="post">
                <h1><em>Update a Post:</em></h1>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input type="text" name="Name"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name"/>
                </div>
                 <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input type="text" name="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                </div>
                <br />
                <div>
                  <label htmlFor="exampleInputEmail1">Message</label>
                  <input type="text" name="Message"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Message"/><br />
                  <button type="submit" onClick={this.sendFrom} className="btn btn-primary">Submit</button>
                </div>    
                </form>
                </div>
      </div>
    )
  }
}
