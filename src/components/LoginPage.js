import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialData = {
    email: '',
    password: ''
}


function LoginPage() {

    const [loginData, setLoginData] = useState(initialData)
    const history = useHistory()
    const handleSubmit = (e) => {
        console.log(loginData, "login data")
        e.preventDefault()
        axios.post('http://localhost:4000/users/login', loginData)
        .then(response => {
            if (response) {
            alert('Success login')
            history.push('/home')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }   

    const changeHandler = (e) => {
        setLoginData({
            ...loginData, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container">
        <h3 className="d-flex justify-content-center">Login</h3>
        <div className="row justify-content-center">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        User Name
                    </label>
                    <input type ="text" value={loginData.name} name="email" onChange={changeHandler}></input>
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type ="password" value={loginData.password} name="password" onChange={changeHandler}></input>
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
            <div className="row justify-content-center">
            <h4>Not Registered yet? 
                <Link to="/register">Sign up</Link>
            </h4>
            </div>
        </div>
    )
}

export default LoginPage