import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./RegisterScreen.css"
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from "../AppState/reducers/authReducer.js"

function RegisterScreen() {

    const auth = useSelector((state) => state.token)
    console.log(auth)
    const { error, status } = auth
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dob, setDob] = useState("");

    const first_nameHandler = (e) => {
        e.preventDefault();

        setFirstname(e.target.value)
    }

    const last_nameHandler = (e) => {
        e.preventDefault();

        setLastName(e.target.value)
    }

    const passwordHandler = (e) => {
        e.preventDefault();

        setPassword(e.target.value)
    }

    const emailHandler = (e) => {
        e.preventDefault();

        setEmail(e.target.value)
    }


    const date_of_birthHandler = (e) => {
        e.preventDefault();

        setDob(e.target.value)
    }

    const c_passwordHandler = (e) => {
        e.preventDefault();

        setConfirmPassword(e.target.value)
    }


    const handleRegisterUser = async (e) => {
        e.preventDefault();

        // somehow x-www-form-urlencoded not working
        // const formData = new FormData();
        // formData.append("firstName", firstName)
        // formData.append("lastName", lastName)
        // formData.append("email", email)
        // formData.append("dob", dob)
        // formData.append("password", password)
        // formData.append("confirmPassword", confirmPassword)
        // console.log(formData)

        const formData = {}
        formData.firstName = firstName;
        formData.lastName = lastName;
        formData.email = email;
        formData.dob = dob;
        formData.password = password;
        formData.confirmPassword = confirmPassword;
        console.log(formData)
        dispatch(registerUser(formData))

    }

    const goToLoginScreen = () => {

        navigate('/login');
    }


    useEffect(() => {
        if (status === "success") {
            navigate('/');
        }
    })

    return (
        <div className="registerScreen">
            {/* <div className="registerScreenTitle">
                <h1 >WELCOME TO SOCIAL</h1>
                <p>Social helps you connect and share with the people in your life.</p>
            </div> */}

            <h1 className="h1class">WELCOME TO SOCIAL</h1>

            <div className="registerScreenForm">

                <form className="registerForm">
                    {error && (<p className="para">{error}</p>)}
                    <div className="nameSection">
                        <input type="text" id="fname" name="firstName" onChange={first_nameHandler} placeholder="First Name" />
                        <input type="text" id="lname" name="lastName" onChange={last_nameHandler} placeholder="Last Name" />

                    </div>
                    <input className="inputItems" placeholder="Email" type="email" id="email" onChange={emailHandler} name="email" />
                    <input className="inputItems" placeholder="Password" type="password" id="password" onChange={passwordHandler} name="password" />
                    <input className="inputItems" placeholder="Confirm your password" type="password" id="confirmPassword" onChange={c_passwordHandler} name="confirmpassword" />
                    <label for="birthday">Birthday:</label>
                    <input className="inputItems" type="date" id="birthday" onChange={date_of_birthHandler} name="birthday"></input>
                    <p>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                    <button className="signup" onClick={handleRegisterUser}>Sign Up</button>
                    <h4 className="regScreen_h4">Already have an account? <span onClick={goToLoginScreen}>Sign In</span></h4>
                </form>

            </div>

        </div >
    )
}

export default RegisterScreen
