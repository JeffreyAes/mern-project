import React, { useState } from 'react'
import axios from 'axios';
import {  useNavigate} from "react-router-dom";

const PostCreate = (props) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const onHandleSubmit = (e) => {
        e.preventDefault()
        console.log(props.gallery.collectionList)
        let arr = props.gallery.collectionList
        arr.push({
            user_id: props.gallery.user_id,
            title: title,
            image: image,
            description: description,
        })
        axios.put(`http://localhost:8000/api/gallery/${props.gallery._id}`, {
            collectionList: arr
        })
            .then(res => {
                props.setGallery(res.data)
                navigate(`/gallery/${props.gallery._id}`)
            })
            .catch(err => {
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