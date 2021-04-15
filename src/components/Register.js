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
            // alert('User Registered Successfully');
            history.push('/')
        })
        .catch(err => {
            console.log(err)
            alert('Something went wrong');
        })
    }

    const changeHandler = (e) => {
        setRegisterData({
            ...registerData, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container align_register">
        <div className="row">
            <form onSubmit={handleSubmit}>
            <h3>Register</h3>
                <div className="form-group">
                    <label className="form-label">
                        User Name
                    </label>
                    <input className="form-control" type ="text" value={registerData.name} name="name" onChange={changeHandler}></input>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Email Id
                    </label>
                    <input className="form-control" type ="text" value={registerData.email} name="email" onChange={changeHandler}></input>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Password
                    </label>
                    <input className="form-control" type ="password" value={registerData.password} name="password" onChange={changeHandler}></input>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Contact No
                    </label>
                    <input className="form-control" type ="number" value={registerData.contactNo} name="contactNo" onChange={changeHandler}></input>
                </div>
                <button type="submit">Register</button>
            </form>
            </div>
        </div>
    )
}

export default Register