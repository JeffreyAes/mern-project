import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostCreate from './PostCreate';
const GalleryList = (props) => {
    const { id } = useParams();
    const [gallery, setGallery] = useState();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/gallery/' + id)
            .then(res => {
                setGallery(res.data);
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
                        <img src={gallery.image} width='200px' height='200px' alt="image" />
                        
                    </div>
                </div>
            
            )}
            <div>
                <PostCreate gallery={gallery} setGallery={setGallery} />
            </div>
        </div>
    )
}

export default GalleryList
