import React, { useState } from "react";
import Axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ userLog, setUserLog ] = useState({
    username: '',
    password: ''
  });
  const handleChanges = (e) => {
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('http://localhost:5000/api/login', userLog)
      .then(res => {
        console.log('login RES', res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('./bubbles')
      })
      .catch(err => {
        console.log('could not login', err)
      })
  };

  return (
    <section>
      <h1>Welcome to the Bubble App!</h1>
      <h1>Log In!</h1>
      <form onSubmit={handleSubmit}>
          <div>
              <label>Username</label>
              <input 
              type='text'
              name='username'
              onChange={handleChanges}
              value={userLog.username}/>
          </div>
          <div>
              <label>Password</label>
              <input 
              type='password'
              name='password'
              onChange={handleChanges}
              value={userLog.password}/>
          </div>
          <button>Log In!</button>
      </form>
    </section>
  );
};

export default Login;
