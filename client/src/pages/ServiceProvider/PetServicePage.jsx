import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SideNavbar from "../Frontpage/SideNavBar";
import Spinner from "../Frontpage/Spinner";
import { getPendingRequest} from "../../slices/RequestSlice";
import { useNavigate } from "react-router-dom";

function PetServicePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pendingRequestList } = useSelector((state) => state.request);
    const { userInfo } = useSelector((state)=> state.auth)
    
      useEffect(()=>{
        if(userInfo.role === 'serviceProvider'){
          dispatch(getPendingRequest())
        }
    },[])
console.log(pendingRequestList)
    return (
       <div>Hello</div>
    );
}

export default PetServicePage;
