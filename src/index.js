import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './components/logout';
import App from './App';

 
import { BrowserRouter, Route } from 'react-router-dom';
import ShowOne from './components/showOne';
import TechTalks from './components/techTalks';
import CreateTechTalk from './components/createTechTalk';
import UpdatePost from './components/updatePost';
import Users from './components/getUsers';
import UpdateUser from './components/updateUser';
import ShowOneUser from './components/showOneUser';
import AboutUs from './components/aboutUs';
import LoginAdmin from './components/loginAdmin';

ReactDOM.render(
<BrowserRouter>
    <div>
      <Route path='/login_Registration' component={App} />
      <Route exact path='/' component={TechTalks} />
      <Route path='/logout' component={Logout} />
      <Route path='/showOne/:id' component={ShowOne} />
      <Route path='/createTechTalk' component={CreateTechTalk} />
      <Route path='/updatePost/:id' component={UpdatePost} />
      <Route path='/users' component={Users} />
      <Route path='/updateUsers/:id' component={UpdateUser} />
      <Route path='/showOneUser/:id' component={ShowOneUser} />
      <Route path='/AboutUs' component={AboutUs} />
      <Route path='/loginAdmin' component={LoginAdmin} />
      
     
    </div>
</BrowserRouter>, document.getElementById('root'));

