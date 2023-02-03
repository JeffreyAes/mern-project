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
        axios.post('http://localhost:8000/api/register',   {
            username,
            email,
            password,
            confirmPassword
        },{ withCredentials: true })
            .then(res => {
                console.log(res)
                navigate('/dashboard')
            })
            // If successful, do something with the response. 
            .catch(err => {
                console.log(err.response.data)
                const errorResponse = err.response.data.errors;
                // Get the errors from err.response.data
                const errorArr = [];
                // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) {
                    // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
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
                        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </p>
                    <p>
                        <label>Confirm Password: </label><br />
                        <input type="text" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </p>
                    <input className='btn btn-success' type="submit" />
                </form>
            </div>
        </div>
    )
}

export default UserRegister