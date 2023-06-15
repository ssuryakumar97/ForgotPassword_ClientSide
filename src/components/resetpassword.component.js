import React, { useState } from 'react'


function ResetPassword(){
  const loginInitialValues={
    email:"",
    password:""
  }

  const [login, setLogin] = useState(loginInitialValues)

  const onInputChange = (e) => {
    setLogin({...login,[e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {email,password} = login;
    fetch("https://loginpage-reset.onrender.com/api/forget-password",{
      method:"POST",
      crossDomain: true,
      headers:{ 
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email,        
      })
    }).then((res) => res.json())
    .then((data)=> {console.log(data)
      alert(data.status)
    }
    );
    
  }

  return(
  <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Forgot password</h3>

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

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="sign-up text-right">
          <a href="/sign-up">signup</a>
        </p>
      </form>
)}


export default ResetPassword;
