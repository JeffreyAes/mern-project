import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Logout from '../components/Logout';
const Profile = (props) => {
    const { user_id } = useParams();
    const [gallerys, setGallerys] = useState();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/gallery/user/' + user_id)
            .then(res => {
                setGallerys(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div className='container mt-3'>
            <div className='d-flex gap-3'>
            <Link to={`/dashboard/${user_id}`} >dashboard</Link>
                <Link to={`/gallery/create/${user_id}`}>Add a Gallery</Link>
            <Logout />
            </div>
            <div className="text-center">

                
                <div>
                    <div className="col-sm-12">



                        <div className="d-flex flex-wrap " >
                        {loaded && gallerys.map((gallery, i) =>

                                <div className="border p-2 m-3 shadow rounded " key={i}>
                                    <h1>blank for now</h1>
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