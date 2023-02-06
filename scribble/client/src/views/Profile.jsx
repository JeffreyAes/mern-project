import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

            </div>
            <div className="text-center">


                <Link to={`/gallery/create/${user_id}`}>Add a Gallery</Link>
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