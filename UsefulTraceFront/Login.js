import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { validateEmail, validatePassword } from "./Validation/Validate";
import {Kap,Gap,Nap} from '/Users/jyoti-alok/Desktop/CraftStore/craft/src/component/AllImports/imports.js';
import URL from "/Users/jyoti-alok/Desktop/CraftStore/craft/src/component/AllUrl/Url.js";
function Login(){
    // required hooks
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    // required functions  -> navigate to signIn page
    const nav1 = ()=>{
        navigate('/signup');
    }
    
   // required functions  -> login 
    const handleLogin = async ()=>{
       
        if(!email || !password){
            alert("Please fill in all the required field");
            return;
        }

         // if email is not valid @gmail.com should be there
        if(!validateEmail(email) || !validatePassword(password)){
              alert("Your email or password is not in right format Please Check!");
              alert("Password should contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.")
              return;
        }
        //conditions 
        let result = await fetch(`${URL}/login`,{
             method: 'post',
             body : JSON.stringify({email,password}),
             headers: {
                'Content-Type':'application/json'
             }
        });
        result = await result.json(); 
        //conditions to login
        if(result.user == null){
            alert("You are not registered");
            alert("Please sign in first");
        }else{
             alert("Logged In Successfully");
             localStorage.setItem("user", JSON.stringify(result));
             navigate('/');
        }
       
    }

    // required functions -> main return function
    return(
       <>
    <div className="main">
             <div className="under">
                        <div className="change" onClick={nav1}>Sign Up</div>
                        <div className="car">
                                <div className="card-header">
                                      <h1>Form Card</h1>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                          <label htmlFor="email">Email</label>
                                          <input className="inputBox" type="email" value ={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter Email' />
                                    </div>
                                <div className="form-group">
                                          <label htmlFor="password">Password</label>
                                          <input className="inputBox" type="password" value ={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Password' />
                                </div>
                                           <button type = "button" onClick={handleLogin} className="btn" >Login</button>
                                </div>
                        </div>
             </div>
        <div className="side">
           <div className="three">
                   <div className="three-kap"><Kap/></div>
                   <div className="three-nap"><Nap/></div>
                   <div className="three-gap"><Gap/></div>
           </div>
           <div id="scroll-container">
                 <div id="scroll-text">
                         “Products which are produced either completely by hand or with the help of tools.
                          Mechanical tools may be <br/>used as long as the direct manual contribution of the 
                          artisan remains the most substantial <br/> component of the finished product.
                          Handicrafts are made from raw materials and can <br/> be produced in unlimited numbers.
                          Such products can be utilitarian, aesthetic, artistic, creative,<br /> culturally attached,
                          decorative, functional, traditional, religiously and socially symbolic and significant”.<br />
                 </div>
           </div>
        </div>
    </div></>
    )
}


export default Login;