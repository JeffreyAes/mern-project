import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserLogin from './UserLogin';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
                localStorage.setItem('user_id', res.data.id);
                navigate(`/dashboard/`)
            })
            .catch(err => {
                const errorResponse = err.response.data.errors
                const errArr = []
                for (const key of Object.keys(errorResponse)) {
                    errArr.push(errorResponse[key])
                }
                console.log(errArr)
                setErrors(errArr)
            })
    }

    return (
        <div className='container mt-3'>
            <div className="text-center">
                <div className='d-flex justify-content-center '>


                    <Box className='me-3'
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={onSubmitHandler}
                    >
                        {errors.map((err, index) => <p className="text-danger" key={index}>{err.message || errors}  </p>)}
                        <div>
                            <TextField
                                id="username"
                                label="Username"
                                type="text"
                                variant="standard"
                                onChange={(e) => setUsername(e.target.value)} value={username}
                            />
                        </div>
                        <div>
                            <TextField
                                id="email"
                                label="Email"
                                type="text"
                                variant="standard"
                                onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                        </div>
                        <div>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="standard"
                                onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                        </div>
                        <div>
                            <TextField
                                id="confirm"
                                label="Confirm Password"
                                type="password"
                                variant="standard"
                                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                            />
                        </div>
                        <Button type='submit' variant="contained" color="success">Register</Button>
                    </Box>
                    <div className="me-3">{<UserLogin logged={props.logged} setLogged={props.setLogged} />}</div>
                </div>
            </div>
        </div>
    )
}

export default UserRegister