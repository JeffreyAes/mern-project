import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Logout from '../components/Logout';
const Profile = (props) => {
    const { user_id } = useParams();
    const [gallerys, setGallerys] = useState();
    const [loaded, setLoaded] = useState(false);
    const [artist, setArtist] = useState("")
    const logged_user = localStorage.getItem('user_id');
    useEffect(() => {
        axios.get('http://localhost:8000/api/gallery/user/' + user_id)
            .then(res => {
                setGallerys(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + user_id)
            .then(res => {
                setArtist(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div className='container mt-3'>
            <h1>{artist.username}</h1>
            <div className='d-flex gap-3'>
                <Link to={`/dashboard/${logged_user}`} >dashboard</Link>
                {
                    user_id === logged_user?
                    <Link to={`/gallery/create/${user_id}`}>Add a Gallery</Link>
                    :""
                }
                <Logout />
            </div>
            <div className="text-center">
                <div>
                    <div className="col-sm-12">
                        <div className="d-flex flex-wrap " >
                            {loaded && gallerys.map((gallery, i) =>
                                <div className="border p-2 m-3 shadow rounded " key={i}>
                                        <img src={gallery?.collectionList[Math.floor(Math.random() * 
                                            (gallery.collectionList.length - 0))]?.image}
                                            alt="Empty gallery" width={'150px'} height={'150px'} />
                                    <div>
                                        <h5> <Link to={`/gallery/${gallery._id}`}>{gallery.collectionTitle}</Link> </h5>
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
    )
}
export default Profile