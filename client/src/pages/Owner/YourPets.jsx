import { useSelector } from "react-redux";
import Spinner from "../Frontpage/Spinner";
import SideNavbar from "../Frontpage/SideNavBar";

function YourPets() {
    const { serverError, getPet,petDetails, isLoading } = useSelector((state) => state.pet);

    console.log("Pets from state:", getPet); 

    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
            <div className="w-auto p-0">
                <SideNavbar />
            </div>

            <div className="bg-white p-6 w-full max-h-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">My Pets</h2>

                {isLoading && <Spinner />}

                {getPet && getPet.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {getPet.map((pet) => (
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
