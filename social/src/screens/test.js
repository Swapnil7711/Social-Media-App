import React from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from "../AppState/reducers/authReducer.js"
import axios from "axios"

function Test() {
    // const dispatch = useDispatch()

    const handle = async () => {
        // const formData = new FormData();
        // formData.append("firstName", "firstName")
        // formData.append("lastName", "lastName")
        // formData.append("email", "email@email.com")
        // formData.append("dob", "1990-10-10")
        // formData.append("password", "password")
        // formData.append("confirmPassword", "confirmPassword")
        // console.log(formData)

        const formData = {
            "firstName": "swapnil",
            "lastName": "harpale",
            "email": "swap@gmail.com",
            "password": "test123",
            "confirmPassword": "test123",
            "dob": "1990-10-10"
        }

        const config = { headers: { 'Content-Type': 'application/json' } };
        axios.post("http://localhost:8000/api/register", formData, config).then((res) => {
            console.log(res.data)
        }).catch((res) => {
            console.log(res)
        })
    }

    return (
        <div>
            <button onClick={handle}> sign up</button>
        </div>
    )
}

export default Test
