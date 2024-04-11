import React, { useState } from 'react';
import '../components/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Background.js'; // Import JS Background File
import '../components/Login.css';

import Background from '../components/Background.js';

export default function Login() {
    const handleLogin = async (event) => {
        // Define your login logic here
        event.preventDefault(); // Prevent the form from submitting

    };

    const [Usre, SetUsre] = useState({ name: "", email: "", password: "" });

    async function handleSignup(event) {
        event.preventDefault();
      
        try {
          const response = await fetch("http://localhost:9015/api/create", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Usre)
          });
      
          if (!response.ok) {
            const text = await response.text(); // Get the response text
            console.error("Error Response:", text); // Log it
            const data = await response.json();
            if(data.message){
                alert(data.message)

            }
        
            // Try to parse as JSON for structured error data
            try {
              
            } catch (error) {
              // If still not JSON, display the raw text
              alert(text);
            } 
      
          } else {
            alert("User Created");
             // Reset the input fields
       SetUsre({ name: "", email: "", password: "" }); 
          }
        } catch (error) {
          console.error('Error occurred:', error);
          alert('Sorry, an error occurred. Please try again.');
        }
      }
      
      
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        SetUsre(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="body" style={{ position: "relative" }}>
                <div className="section" style={{ position: "absolute", top: "%", left: "%", transform: "translate(-3.2%, -56%)" }}>
                    <div className="container">
                        <div className="row full-height justify-content-center">
                            <div className="col-12 text-center align-self-center py-5">
                                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                    <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                    <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                    <label htmlFor="reg-log"></label>
                                    <div className="card-3d-wrap mx-auto">
                                        <div className="card-3d-wrapper">
                                            <div className="card-front">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Log In</h4>
                                                        <form onSubmit={handleLogin}>
                                                            <div className="form-group">
                                                                <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                                                                <i className="input-icon uil uil-at"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                                                                <i className="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                            <button type="submit" className="btn mt-4">Submit</button>
                                                        </form>
                                                        <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Sign Up</h4>
                                                        <form onSubmit={handleSignup}>
                                                            <div className="form-group">
                                                                <input type="text" name="name" className="form-style" value={Usre.name} placeholder="Your Full Name" id="logname" autoComplete="off" onChange={handleChange} />
                                                                <i className="input-icon uil uil-user"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <input type="email" name="email" className="form-style" value={Usre.email} placeholder="Your Email" id="logemail" autoComplete="off" onChange={handleChange} />
                                                                <i className="input-icon uil uil-at"></i>
                                                            </div>
                                                            <div className="form-group mt-2">
                                                                <input type="password" name="password" className="form-style" value={Usre.password} placeholder="Your Password" id="logpass" autoComplete="off" onChange={handleChange} />
                                                                <i className="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                            <button type="submit" className="btn mt-4">Submit</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
