import React, { useState } from 'react'


function Login(){
  const loginInitialValues={
    email:"",
    password:""
  }

  const [login, setLogin] = useState(loginInitialValues)
  const [message,setMessage] = useState(null);

  const onInputChange = (e) => {
    setLogin({...login,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {email,password} = login;
    fetch("https://loginpage-reset.onrender.com/api/login",{
      method:"POST",
      crossDomain: true,
      headers:{ 
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email,
        password        
      })
    }).then((res) => res.json())
    .then((data)=> {console.log(data)
      setMessage(data.message)
    if(data.status == "ok") {
      alert("login successful");
      window.localStorage.setItem("token", data.data);
      window.localStorage.setItem("loggedIn" , true);
      window.location.href = "/userdata"
    }}
    );
    
  }

  return(
  <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name='password'
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        {message && <div className="d-grid">
          <p>${message}</p>
        </div>}
        <p className="forgot-password text-right">
          Forgot <a href="/resetpassword">password?</a>
        </p>
      </form>
)}

export default Login;
