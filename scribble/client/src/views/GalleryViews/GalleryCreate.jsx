import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const GalleryCreate = (props) => {
    const navigate = useNavigate()
    const [collectionTitle, setCollectionTitle] = useState("");
    const [about, setAbout] = useState("");
    const [errors, setErrors] = useState([]);
    const { user_id } = useParams();
    const user = props.user;
    const setUser= props.user


    const onSubmitHandler = e => {
        e.preventDefault();
        let arr = user.gallery
        arr.push({
            collectionTitle,
            about,
            user_id: user_id,
            galleryList: [],
        })
        axios.put('http://localhost:8000/api/users/' + user_id, {
            gallery: arr
        }, { withCredentials: true })
            .then(res => {
                navigate(`/profile/${res.data._id}`)
                console.log(res)
            })
            // If successful, do something with the response. 
            .catch(err => {
                console.log(err)
                const errorResponse = err.response.data.errors;
                // Get the errors from err.response.data
                const errorArr = [];
                // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) {
                    // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <div className='container mt-3'>
            <div className='d-flex gap-3'>

            </div>
            <div className="text-center">

                <form onSubmit={onSubmitHandler}>
                    {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
                    <label>Gallery Title: </label><br />
                    <input type="text" onChange={(e) => setCollectionTitle(e.target.value)} value={collectionTitle} />
                    <p>
                        <label>About This Gallery: </label><br />
                        <input type="text" onChange={(e) => setAbout(e.target.value)} value={about} />
                    </p>
                    <input className='btn btn-success' type="submit" />
                </form>
            </div>
        </div>
    )
}

export default GalleryCreate