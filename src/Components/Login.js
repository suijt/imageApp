import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://mi-linux.wlv.ac.uk/~2017765/galleryApi/api/login', { email: email.value, password: password.value }
    ).then(response => {
      setLoading(false);  
      setUserSession(response.data.token, response.data.data);
      props.history.push('/');
    }).catch(error => {
      setLoading(false);
      if (error.status === 401) setError(error.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="wrapper">
      <h1 className="title">Login</h1>
      <div>
        Email Address<br />
        <input type="email" {...email} className="form-control"/>
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;