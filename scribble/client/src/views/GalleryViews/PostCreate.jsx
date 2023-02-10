import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {  useNavigate, useParams} from "react-router-dom";

const PostCreate = (props) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const {index} = useParams()
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const user = props.user
    const setUser = props.setUser
    const [errors, setErrors] = useState([]);
    const logged_user = localStorage.getItem('user_id');



    const onHandleSubmit = (e) => {
        e.preventDefault()
        let arr = user.gallery
        console.log( arr)
        arr[index].galleryList.push({
            title,
            image,
            description,
        })
        axios.put(`http://localhost:8000/api/users/${user._id}`, {
            gallery: arr
        },{ withCredentials: true })
            .then(res => {
                setUser(res.data)
                navigate(`/gallery/${user._id}/${index}`)
            })
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
        <div>
            <form onSubmit={onHandleSubmit} >
                {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
                <div>
                    <label >title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
                </div>
                <div>
                    <label >image</label>
                    <input type="text" onChange={(e) => setImage(e.target.value)} value={image} />
                </div>
                <div>
                    <label >description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                </div>
                <button>button</button>
            </form>
        </div>
    )

}

export default PostCreate