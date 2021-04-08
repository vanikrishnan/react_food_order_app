import React, { useState } from 'react'
import { useHistory } from 'react-router'
import '../styles.css'
import axios from 'axios'

const initialData = {
    name: '',
    password: '',
    contactNo: '',
    email: ''
}


function Register() {

    const [registerData, setRegisterData] = useState(initialData)
    const history = useHistory()

    const handleSubmit = (e) => {
        console.log(registerData, "register data")
        e.preventDefault()
        axios.post('http://localhost:4000/users/createUser', registerData)
        .then(response => {
            alert(`Successfully registered ${response.data.id}`)
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const changeHandler = (e) => {
        setRegisterData({
            ...registerData, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container">
            <h3 className="d-flex justify-content-center">Register</h3>
        <div className="row justify-content-center">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        User Name
                    </label>
                    <input type ="text" value={registerData.name} name="name" onChange={changeHandler}></input>
                </div>
                <div>
                    <label>
                        Email Id
                    </label>
                    <input type ="text" value={registerData.email} name="email" onChange={changeHandler}></input>
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type ="password" value={registerData.password} name="password" onChange={changeHandler}></input>
                </div>
                <div>
                    <label>
                        Contact No
                    </label>
                    <input type ="number" value={registerData.contactNo} name="contactNo" onChange={changeHandler}></input>
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
    )
}

export default Register