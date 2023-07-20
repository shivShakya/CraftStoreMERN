import React, {useState } from "react";
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import {Kap,Gap,Nap} from '/Users/jyoti-alok/Desktop/CraftStore/craft/src/component/AllImports/imports.js';
import URL from "/Users/jyoti-alok/Desktop/CraftStore/craft/src/component/AllUrl/Url.js";
import {validateEmail,validatePassword} from './Validation/Validate';


function SignUp(){
    
     // required hooks
     const [name ,setName] = useState("");
     const [password ,setPassword] = useState("");
     const [email ,setEmail] = useState("");
     const [box, setBox] = useState(true);
     const navigate = useNavigate();
    
    // required functions  -> navigate to login page
     function nav(){
          box = false;
     }

       
  // required functions  -> sending request to api /register
   async function collectData(){
    // if any detail is not filled.
    if(!name || !email || !password){
        alert("Please fill in all the required field");
        return;
    }


    // if email is not valid @gmail.com should be there
    
    if(!validateEmail(email) || !validatePassword(password)){
       alert("Your email or password is not in right format Please Check!");
       alert("Password should contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.")
       return;
    }
  
  
    let result = await fetch(`${URL}/register`,{
        method: 'post',
        body: JSON.stringify({name,email,password}),
        headers: {
          'Content-Type':'application/json'
        },   
    });
    result = await result.json();
   
        if(result){
             localStorage.setItem("user",JSON.stringify(result));
             navigate('/');
        }
  }


   // required functions  -> login 
   async function handleLogin(){
       
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


 
// required functions  -> main function ->return
return(
    <>
<div className="main">
    
    <div className="under">
             <div className="change" onClick={nav}>Click here</div>

    {
        // Form Card design
     box?
        (<div className="car">
          <div className="card-header">
                  <h1>Sign In Form</h1>
           </div>
           <div className="card-body">
                  <div className="form-group">
                       <label htmlFor="name">Name</label>
                       <input className="inputBox" type="text" value ={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
                  </div>

                  <div className="form-group">
                       <label htmlFor="email">Email</label>
                       <input className="inputBox" type="email" value ={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter Email' />
                  </div>
                  <div className="form-group">
                       <label htmlFor="password">Password</label>
                       <input className="inputBox" type="password" value ={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Password' />
                  </div>
                  <button type = "button" onClick={collectData} className="btn" >Sign Up</button>
          </div>
       </div>
       ):(
        <div className="car">
            <div className="card-header">
              <h1>Log In Form</h1>
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
       )
    }
    </div>



       {
        // 3d elements and text div
       }
       <div className="side">

       {
        // for the 3 ,3d models used in the login signup page
       }
       <div className="three" style={{display:'flex'}}>
                <div className="three-kap" ><Kap/></div>
                <div className="three-nap" ><Nap/></div>
                <div className="three-gap" ><Gap/></div>
       </div>

       {
        // text container
       }
   
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
       
</div> </>
)
}



