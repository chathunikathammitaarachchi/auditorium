import React, { useState } from "react";
import "./Admin.css";

import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3000/auth/signup', {
            name:username, 
            email, 
            password,
        }).then(response => {
            if(response.data.status){
                navigate('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    };
    

    return (
        <div className="sign-up-container">
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label htmlFor="adminname">Name:</label>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    autoComplete="off"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <lable htmlFor="password">Password:</lable>
                <input type="password"
                 placeholder="Enter Password" 
                
                 onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Sign up</button>
                <p>Have an Account? <Link to ="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default Signup;
