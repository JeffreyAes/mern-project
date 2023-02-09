import { Link, useParams } from "react-router-dom"
const Dashboard = (props) => {
    const user_id = localStorage.getItem('user_id');
    const { id } = useParams();

    return (
        <div>
        <h1>You made it to the dashboard, congratulations! :)</h1>
        <h1><Link to={`/profile/${user_id}`}>profile</Link></h1>
        </div>
        )
        
    }

export default Dashboard