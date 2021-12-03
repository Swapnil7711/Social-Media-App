import React, { useState, useEffect } from 'react'
import "./LoginScreen.css"
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../AppState/reducers/authReducer.js"
import { useDispatch, useSelector } from 'react-redux'
function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.token)
    const navigate = useNavigate()
    const { error, status } = auth

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const form = {
            "email": email,
            "password": password
        }
        console.log(form)

        dispatch(loginUser(form))

    }

    const handleGoToRegister = () => {
        navigate("/register")
    }

    useEffect(() => {
        if (status === "success") {
            navigate('/');
        }
    })

    return (
        <div className="LoginScreen">
            <h1 className="Loginh1class">WELCOME TO SOCIAL</h1>
            <div className="loginFrom">

                <input type="email" className="loginFromInput" id="loginEmail" onChange={handleEmail} placeholder="Enter Your Email" />
                <input type="password" className="loginFromInput" id="loginPassword" onChange={handlePassword} placeholder="Enter Your Password" />
                <button className="loginButton" onClick={handleLogin}>Log In</button>
                <p className="forgotPassword">Forgotten Password?</p>
                <br />
                <button onClick={handleGoToRegister} className="regusterButton">Create New Account</button>
            </div>
        </div>
    )
}

export default LoginScreen
