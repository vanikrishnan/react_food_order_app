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
            if (response.data && response.data.token) {
            alert('Success login')
            localStorage.setItem('token', response.data.token)
            history.push('/home')
            }
        })
        .catch(err => {
            alert('Wrong password')
            console.log(err)
        })
    }   

    const changeHandler = (e) => {
        setLoginData({
            ...loginData, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container align_register">
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="form-group">
                        <label className="form-label">
                            User Name
                    </label>
                        <input className="form-control" type="text" value={loginData.name} name="email" onChange={changeHandler}></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Password
                    </label>
                        <input className="form-control" type="password" value={loginData.password} name="password" onChange={changeHandler}></input>
                    </div>
                    <button type="submit">Login</button>
                    <div className="row justify-content-center">
                        <h4>Not Registered yet?
                <Link to="/register">Sign up</Link>
                        </h4>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage