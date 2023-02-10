import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserLogin = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([])

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email,
            password,
        }, { withCredentials: true })
            .then(res => {
                props.setLogged(true)
                localStorage.setItem('user_id', res.data.id);
                console.log(res.data)
                navigate(`/dashboard/`)
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

                <Box
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
                            id="login-email"
                            label="Email"
                            type="text"
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)} value={email}
                        />
                    </div>
                    <div>
                        <TextField
                            id="login-password"
                            label="Password"
                            type="password"
                            variant="standard"
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                    </div>
                    <Button type='submit' variant="contained" color="success">Login</Button>
                </Box>
            </div>
        </div>
    )
}

export default UserLogin