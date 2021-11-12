import request from '../services/api';
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import './Login.scss';

function Login() {
  let history = useHistory();

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInputChat = (event) => {
    setInput((input) => ({
      ...input,
      email: event.target.value,
    }));
  };

  const handleInputPassword = (event) => {
    setInput((input) => ({
      ...input,
      password: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    console.log(input);
    // todo: API request with GraphQL
    request
      .post('users', {
        email: input.email,
      })
      .then(function (response) {
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);
        setInput((input) => ({
          ...input,
          email: '',
        }));
        history.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  };

  return (
    <div className="Login">
      <div className="LoginContainer">
        <nav className="nav nav-tabs nav-fill">
          <li className="nav-link active">Login</li>
        </nav>

        <div className="tab-content" id="myTabContent">
          <div>
            <form onSubmit={handleSubmit} id="login-form" action="" method="post">
              <div className="form-floating mb-3">
                <label htmlFor="floatingInput">Email</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="floatingInput"
                  onChange={handleInputChat}
                  placeholder="Email"
                />
              </div>

              <div className="form-floating mb-3">
                <label htmlFor="floatingInput">Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  id="floatingInput"
                  onChange={handleInputPassword}
                  placeholder="Password"
                />
              </div>

              <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
