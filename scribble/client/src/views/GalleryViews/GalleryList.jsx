import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
const GalleryList = (props) => {
    const { id } = useParams();
    const gallery = props.gallery;
    const [user_id, setUser_id] = useState("")
    const setGallery = props.setGallery;
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/gallery/' + id)
            .then(res => {
                setGallery(res.data);
                setUser_id(res.data.user_id)
                console.log(res.data)
                setLoaded(true);

            })
            .catch(err => console.error(err));
    }, []);

    return (

        <div>
            {loaded && gallery.collectionList.map((gallery, i) =>

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
                        <Link to='/gallery/post/new' >add to gallery</Link>
                        < Link to={`/profile/${user_id}`} >Artist</Link>
                    </div>
        </div >
    )
}

export default GalleryList
