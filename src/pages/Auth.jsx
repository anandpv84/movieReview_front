import React, { useState } from 'react'
import '../pages/allcss.css'
import { loginApi, registerApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';



function Auth({ register }) {

  const registerForm = register ? true : false;

  const navigate = useNavigate()

  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    password: ""
  })


  // -----------------------=========================================---------------------

  const handleregister = async (e) => {
    e.preventDefault();
    console.log(userdata)
    const { email, username, password } = userdata;
    if (!email || !username || !password) {
      alert("please fill the form completly")
    } else {
      const result = await registerApi(userdata);
      console.log(result)
      if (result.status === 200) {
        alert("User registration successfully")
        setuserdata({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      } else {
        alert(result.response.data)
      }
    }
  }

  // -----------------------====================================---------------------


  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = userdata;
    if (!email || !password) {
      alert("please fill the form completely")
    } else {
      const result = await loginApi(userdata);
      if (result.status === 200) {
        console.log(result)
        sessionStorage.setItem("existinguser",JSON.stringify( result.data.existinguser))
        sessionStorage.setItem("token", result.data.token)
        alert("user logged in successfully")
        setuserdata({
          username: "",
          email: "",
          password: ""
        })
        navigate('/dashboard')
      }else{
        alert(result.response.data)
      }
      
    }
  }

  // -----------------------====================================---------------------



  return (
    <>

      <div class="login-page">
        <div class="form">
          <form class="login-form">
            {
              registerForm &&
              <input value={userdata.username} onChange={(e) => setuserdata({ ...userdata, username: e.target.value })}
                type="text" placeholder="username" />
            }

            <input value={userdata.email} onChange={(e) => setuserdata({ ...userdata, email: e.target.value })}
              type="text" placeholder="Email" />


            <input value={userdata.password} onChange={(e) => setuserdata({ ...userdata, password: e.target.value })}
              type="password" placeholder="password" />

            {
              registerForm ?
                <button onClick={handleregister} className='font'>REGISTER</button>
                :
                <button onClick={handlelogin} className='font'>LOGIN</button>
            }
          </form>
        </div>
      </div>

    </>
  )
}

export default Auth