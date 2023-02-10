import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
const GalleryList = (props) => {
    const { id } = useParams();
    const { index } = useParams();
    const user = props.user
    const setUser = props.setUser
    const [loaded, setLoaded] = useState(false);
    const logged_user = localStorage.getItem('user_id');
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(res => {
                setUser(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, []);

    return (

        <div>
            {loaded && user.gallery[index].galleryList?.map((gallery, i) =>

                <div className="border p-2 m-3 shadow rounded " key={i}>
                    <div>
                        <h1>
                            {gallery.title}
                        </h1>
                        <img src={gallery.image} width='200px' height='200px' alt="post" />

                    </div>
                </div>

            )}
                    <div className='d-flex gap-3'>
                        {
                            logged_user === id?
                            <Link to={`/gallery/post/new/${index}`} >add to gallery</Link>
                            :""
                        }
                        < Link to={`/profile/${id}`} >Artist</Link>
                    </div>
        </div >
    )
}

export default GalleryList
