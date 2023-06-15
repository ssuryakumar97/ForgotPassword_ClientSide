import React, { useState } from 'react'

function SignUp(){
  const signUpInitialValues = {
    fname:"",
    lname:"",
    email:"",
    password:""
  }

  const [signup, setSignup] = useState(signUpInitialValues)
  const [message,setMessage] = useState(null);

  const onInputChange = (e) => {
    setSignup({...signup,[e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    
    e.preventDefault();
    const {fname,lname,email,password} = signup;
    fetch("https://loginpage-reset.onrender.com/api/register",{
      method:"POST",
      crossDomain: true,
      headers:{ 
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password        
      })
    }).then((res) => res.json()).then((data)=>{
      setMessage(data.message)
      if(data.status == "ok") {
        alert("Details created successfully")
        window.location.href = "/sign-in"
      }
    });
  }
  
  return(
    <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name='fname'
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Last name"
            name='lname'
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name='email'
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
            Sign Up
          </button>
        </div>
        {message && <div className="d-grid">
          <p>${message}</p>
        </div>}
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
  )
}


export default SignUp;
