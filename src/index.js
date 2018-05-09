import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './components/logout';
import App from './App';

 
import { BrowserRouter, Route } from 'react-router-dom';
import ShowOne from './components/showOne';
import TechTalks from './components/techTalks';
import CreateTechTalk from './components/createTechTalk';
import UpdatePost from './components/updatePost';

ReactDOM.render(
<BrowserRouter>
    <div>
      <Route path='/login_Registration' component={App} />
      <Route exact path='/' component={TechTalks} />
      <Route path='/logout' component={Logout} />
      <Route path='/showOne/:id' component={ShowOne} />
      <Route path='/createTechTalk' component={CreateTechTalk} />
      <Route path='/updatePost/:id' component={UpdatePost} />
      
     
    </div>
</BrowserRouter>, document.getElementById('root'));

