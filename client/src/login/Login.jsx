import React, { useState } from 'react';
import './Login.css';
import Navbar from '../components/Navbar';


const Login = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
	e.preventDefault();
        // creates a data list that we will need to pass to the backend
        const data = {
            "username": username,
            "passwd": password,
        }
        // this defines our URL so that we correctly access the backend with the right user and are able to change it
        const url = "/user/login"// + (updating ? `update_user/${existinguser.id}` : "create_user")

        // tells the website what method we plan to use and jsonifies the data so that backend can read it
        const options = {
            method: "POST",//updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        // waits for the fetch command to finish running and saves the data in response
        const response = await fetch(url, options)

        // depending on if this was successful we get a status back
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        }
	setToken(response.json());
  };

  return (
    <div>
      <h1 className='login'>Login to HobbyGator</h1>

      <form className='form' onSubmit={handleSubmit}>

        <label className='label'>
          Username: 
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>

        <label className='label'>
          Password: 
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Login</button>

      </form>
    </div>
  );
};

export default Login;
