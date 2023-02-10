import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TemporaryDrawer from './dropdown';




const Scribblenavbar = (props) => {
    const logged_user = localStorage.getItem('user_id');
    
    

    return (
        <nav className='bg-secondary'>
            <div className='d-flex align-items-center justify-content-between'>
                <h1 className='text-info' >{logged_user}</h1>
            <TemporaryDrawer logged_user={logged_user}/>
                {/* <h1 className='text-white' > <Link className='text-white' to={`/profile/${logged_user}`}>{user?.username}</Link> </h1> */}
            </div>
        </nav>
    )
}

export default Scribblenavbar