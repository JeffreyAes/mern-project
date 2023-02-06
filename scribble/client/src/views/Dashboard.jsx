import { Link, useParams } from "react-router-dom"
const Dashboard = (props) => {
    const { id } = useParams();

    return (
        <div>
        <h1>You made it to the dashboard, congratulations! :)</h1>
        <h1><Link to={`/profile/${id}`}>profile</Link></h1>
        </div>
        )
        
    }

export default Dashboard