import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const UserRegister = (props) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([])

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            username,
            email,
            password,
            confirmPassword
        }, { withCredentials: true })
            .then(res => {
                props.setLogged(true)
                navigate(`/dashboard/${res.data.id}`)
            })
            .catch(err => {
                console.log(err.response.data.errors)
                const errorResponse = err.response.data.errors
                const errArr = []
                for (const key of Object.keys(errorResponse)) {
                    errArr.push(errorResponse[key].message)
                }
                setErrors(err.response.data.errors.hasOwnProperty("email") ? [err.response.data.errors["email"]] : errArr)
            })
    }

    return (
        <div className='container mt-3'>
            <div className="text-center">

                <form onSubmit={onSubmitHandler}>
                    {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
                    <label>Username: </label><br />
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <p>
                        <label>Email: </label><br />
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </p>
                    <p>
                        <label>Password: </label><br />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </p>
                    <p>
                        <label>Confirm Password: </label><br />
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </p>
                    <input className='btn btn-success' type="submit" value='Register' />
                </form>
            </div>
        </div>
    )
}

export default UserRegister