
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate(); // Use useNavigate for navigation

  const [credentials, setCredentials] = useState({
    name:'',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/auth/createuser', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.sucess===true) {
      
      // localStorage.setItem('token', json.authtoken);
      navigate('/Login'); // Use navigate for navigation
    } else {
      alert('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className='container my-5'>
      <h2>Enter details to signup:</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name </label>
          <input type="text" className="form-control" id="name" value={credentials.name} onChange={handleChange} name="name" aria-describedby="nameHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address </label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={credentials.email} onChange={handleChange} name="email" aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label"> Password </label>
          <input type="password" className="form-control" onChange={handleChange} value={credentials.password} name="password" id="exampleInputPassword1" />
        </div>

        <button type="submit" className="btn btn-primary"> SignUp </button>
      </form>


    </div>
  )
}
