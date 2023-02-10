import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Logout from '../components/Logout';
import Scribblenavbar from '../components/Navbar';
const Profile = (props) => {
    const { user_id } = useParams();
    const user = props.user;
    const setUser = props.setUser
    const [loaded, setLoaded] = useState(false);
    const logged_user = localStorage.getItem('user_id');
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + user_id)
            .then(res => {
                setUser(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div>


            {/* <Scribblenavbar /> */}
            <div className='container mt-3'>
                <h1>{user?.username}</h1>
                <div className='d-flex gap-3'>
                    {
                        user_id === logged_user ?
                            <Link to={`/gallery/create/${user_id}`}>Add a Gallery</Link>
                            : ""
                    }
                </div>
                <div className="text-center">
                    <div>
                        <div className="col-sm-12">
                            <div className="d-flex flex-wrap " >
                                {loaded && user.gallery?.map((gallery, i) =>
                                    <div className="border p-2 m-3 shadow rounded " key={i}>
                                        <img src={gallery.galleryList[Math.floor(Math.random() *
                                            (gallery.galleryList.length - 0))]?.image}
                                            alt="Empty gallery" width={'150px'} height={'150px'} />
                                        <div>
                                            <h5> <Link to={`/gallery/${user_id}/${i}`}>{gallery.collectionTitle}</Link></h5>
                                            <h5 >{gallery.about}</h5>
                                            <h5> tbd </h5>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile