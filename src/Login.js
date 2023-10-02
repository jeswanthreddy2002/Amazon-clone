import React from 'react';
import "./Login.css";
import {Link,useNavigate} from "react-router-dom";
import { useState } from 'react';
import {auth} from './firebase';
function Login() {
    const navigate=useNavigate();  // this will programatically change the URL
    const [email,setEmail]= useState('');
     const [password,setPassword]=useState('');
     const signIn=e=>{
        e.preventDefault();
        //firebase stuff happens here
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=> {
            console.log("authentication is successful",auth);
            navigate('/');
        })
        .catch(error => alert(error.message));
        }
     
     const register=e=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
            // it is successfully created a new user with email and passowrd
         
            if(auth)
            {
                navigate('/');// literally this is the histroy of the browser 
            }
        }).catch(error=> alert(error.message))
        // firebase stuff happens here
     }
  return (
     
    <div className="login">
    <Link to="/">
        <img className="login__logo"src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'  alt="logo"/> 
    </Link>
    <div className="login__container">
        <h1>Sign-in</h1>
        <form>
            <h5>E-mail</h5>
            <input type="text" value={email} onChange={e=> setEmail(e.target.value)}/>
            <h5>password</h5>
            <input type="password" value={password} onChange={e=> setPassword(e.target.value)}/>
            <button className='login__signInButton' type="submit"onClick={signIn}> Sign In</button>
        </form>
        <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
        <button onClick={register} type="submit"className='login__registerButton'> Cretate Amazon account</button>        
    </div>
    </div>
  );
}

export default Login;