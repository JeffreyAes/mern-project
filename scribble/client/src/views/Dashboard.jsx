import { Link, useParams } from "react-router-dom"
import Scribblenavbar from "../components/Navbar";
const Dashboard = (props) => {
    const logged_user = localStorage.getItem('user_id');
    const { id } = useParams();
    



    return (
        <div>
        <h1>{logged_user}</h1>
        </div>
        )
        
    }

export default Dashboard