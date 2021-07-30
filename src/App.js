import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Components/Login';
import AddImage from './Components/AddImage';
import Home from './Components/Home';
import EditImage from './Components/EditImage';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`https://mi-linux.wlv.ac.uk/~2017765/galleryApi/api/verify?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      // console.log('toeknpass');
      setAuthLoading(false);
    }).catch(error => {
      // console.log('toeknfail');
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/add-image">Add Image</NavLink>
          </div>
          <div className="content">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/add-image" component={AddImage} />            
              <PrivateRoute path="/edit-image/:id" component={EditImage} />            
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;