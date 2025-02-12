import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "../Frontpage/Spinner";
import SideNavbar from "../Frontpage/SideNavBar";
import { getPet, deletePet, setIsEditing, setPetId } from "../../slices/PetSlice"
import { useNavigate } from "react-router-dom";

function YourPets() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serverError, yoursPets, isLoading } = useSelector((state) => state.pet);

    useEffect(()=>{
        dispatch(getPet())
    },[])

    const handleEdit = (id) =>{
        dispatch(setIsEditing(true))
        dispatch(setPetId(id))
        navigate('/petProfile')
    }
    const handleRemove = (id)=>{
        const confirm = window.confirm("Are you sure?")
        if(confirm){
            dispatch(deletePet(id))
        }
    }

    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
                <SideNavbar />

            <div className="bg-white p-6 w-full max-h-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">My Pets</h2>

                {isLoading && <Spinner />}

                {yoursPets && yoursPets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {yoursPets.map((pet) => (
                            <div key={pet._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img 
                                    src={pet.petImage} 
                                    alt={pet.petName} 
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h3 className="text-lg font-semibold mt-2">{pet.petName}</h3>
                                <p className="text-sm text-gray-600">Type: {pet.petType}</p>
                                <p className="text-sm text-gray-600">Age: {pet.petAge} years</p>
                                <p className="text-sm text-gray-600">Gender: {pet.gender}</p>
                                <div className="flex justify-end items-end">
                                    <button className="mr-2 px-3 py-1 font-semibold text-sm text-white bg-green-400 hover:scale-110 hover:bg-green-600 shadow-sm rounded-sm cursoer-pointer "onClick={()=>handleEdit(pet._id)}>Edit</button>
                                    <button className="mr-2 px-3 py-1 font-semibold text-sm text-white bg-yellow-400 hover:scale-110 hover:bg-red-600 shadow-sm rounded-sm cursoer-pointer " onClick={()=>handleRemove(pet._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No pets found.</p>
                )}

                {serverError && serverError.length > 0 && (
                    <ul className="mt-4">
                        {serverError.map((ele, i) => (
                            <li key={i} className="text-sm font-semibold text-red-500 opacity-80">
                                {ele.msg}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default YourPets;
