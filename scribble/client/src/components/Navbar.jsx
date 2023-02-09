import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TemporaryDrawer from './dropdown';




const Scribblenavbar = (props) => {
    const logged_user = localStorage.getItem('user_id');
    const [user, setUser] = useState();
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + logged_user)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <nav className='bg-secondary'>
            <div className='d-flex align-items-center justify-content-between'>
                <h1 className='text-info' >Scribble</h1>
            <TemporaryDrawer  />
                {/* <h1 className='text-white' > <Link className='text-white' to={`/profile/${logged_user}`}>{user?.username}</Link> </h1> */}
            </div>
        </nav>
    )
}

export default Scribblenavbar