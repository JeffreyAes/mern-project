import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const UserLogin = (props) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([])

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email,
            password,
        }, { withCredentials: true })
            .then(res => {
                props.setLogged(true)
                console.log(res.data)
                navigate(`/dashboard/${res.data.id}`)
            })
            .catch(err => {
                console.log(err.response)
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key])
                }
                setErrors(errorArr);
            })
    }

    return (
        <div className='container mt-3'>
            <div className="text-center">

                <form onSubmit={onSubmitHandler}>
                    {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}

                    <p>
                        <label>Email: </label><br />
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </p>
                    <p>
                        <label>Password: </label><br />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </p>
                    <input className='btn btn-success' type="submit" value='Login' />
                </form>
            </div>
        </div>
    )
}

export default UserLogin