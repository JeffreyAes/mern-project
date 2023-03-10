import axios from "axios"
import { useNavigate} from 'react-router-dom';
const Logout = (props) => {
    const navigate = useNavigate()
    const logout = (e) => {
        axios.get('http://localhost:8000/api/logout',  { withCredentials: true })
        .then(res => {
            localStorage.clear();
            console.log(res.data)
            navigate('/register')
        }, { withCredentials: true })
        .catch(err => console.error(err));
    }

    return (
        <button onClick={logout}>LOGOUT</button>
    )
}

export default Logout