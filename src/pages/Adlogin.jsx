import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminloginApi } from '../services/allApi'

function Adlogin() {

    const navigate = useNavigate()

    const [userdata, setuserdata] = useState({
        username: "",
        password: ""
      })


    const adminlogin = async (e) => {
        e.preventDefault();
        const { username, password } = userdata;
        if (!username || !password) {
          alert("please fill the form completely")
        } else {
          const result = await adminloginApi(userdata);
          if (result.status === 200) {
            console.log(result)
            sessionStorage.setItem("existinguserad",JSON.stringify( result.data.existinguserad))
            sessionStorage.setItem("tokenad", result.data.tokenad)
            alert("user logged in successfully")
            setuserdata({
              username: "",
              password: ""
            })
            navigate('/admin')
          }else{
            alert(result.response.data)
          }
          
        }
      }


    return (
        <>


            <div class="login-page">
                <div class="form">
                    <form class="login-form">
                        <input value={userdata.username} onChange={(e) => setuserdata({ ...userdata, username: e.target.value })} type="text" placeholder="username" />
                        <input value={userdata.password} onChange={(e) => setuserdata({ ...userdata, password: e.target.value })} type="text" placeholder="Password" />
                        <button style={{backgroundColor:"yellowgreen", color:"black"}} onClick={adminlogin}>LOGIN</button>
                    </form>
                </div>
            </div>


        </>
    )
}

export default Adlogin