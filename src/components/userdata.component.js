import React, { useEffect, useState } from 'react'

function UserData(){
  const userData = {
    userData:""
  }

  const [resdata, setResData] = useState(userData)
  
  useEffect(() => {
    fetch("https://loginpage-reset.onrender.com/api/userdata",{
      method:"POST",
      crossDomain: true,
      headers:{ 
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token")     
      })
    }).then((res) => res.json())
    .then((data)=>{
      console.log(data, "userData")
      setResData(data.data)
      if(data.data == "token expired") {
        alert("Token expired login again");
        window.localStorage.clear();
        window.location.href = "/sign-in"
      }
    });

  }, [])
  console.log(resdata)
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/sign-in"
  }
  
  
  return(
    <div>
      Name<h3>{resdata.fname}</h3>
      Email<h3>{resdata.email}</h3>
      <br />
      <button onClick={logout} className='btn btn-primary'>Logout</button>
    </div>
  )
}

export default UserData;
