import { useSelector } from "react-redux"
const Dashboard = ( ) => {
    const { userInfo } = useSelector(  state => state.auth)
    return (
        <div>
            <h2> Dashboard Page </h2>
        </div>
    )
}
export default Dashboard    