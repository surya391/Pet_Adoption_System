import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useDispatch, useSelector } from "react-redux";
// import SideNavbar from "./SideNavbar";
import Spinner from "../Frontpage/Spinner";
import { createReview, editMyReview } from "../../slices/ReviewSlice"

const Review = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const reviewId = queryParams.get("reviewId");
    const reviewerId = queryParams.get("serviceProviderId");
    const { serverError, isLoading, myReviews } = useSelector(state => state.review)

    const [formData, setFormData] = useState({
        rating: 0,
        description: "",
    });
    useEffect(() => {
        if (reviewerId) {
            const review = myReviews.find((ele) => ele._id === reviewerId);
            setFormData({
                rating: review?.rating || 1,
                description: review?.description
            })
        }
    }, [])

    const handleCreate = (e) => {
        e.preventDefault();
         dispatch(createReview({ ...formData, reviewId }))
        setFormData({
            rating: 0,
            description: ""
        })  
    };
    const handleUpdate = async(e) => {
        e.preventDefault();
        const actionResult = await dispatch(editMyReview({ ...formData, reviewerId, reviewId }))
        if( actionResult.type === editMyReview.fulfilled.type ){
            navigate("/my-reviews")
        }
        setFormData({
            rating: 0,
            description: ""
        })
    };

    return (
        <div className="flex flex-row ">
            {isLoading && <Spinner />}
            <div className="flex  ml-60 mt-5 mr-auto  w-full">
                <div className="bg-white p-8 h-auto rounded-lg shadow-xl w-full max-w-2xl bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                        Review for ServiceProvider
                    </h2>
                    <div className="mb-4 flex justify-between">
                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            Rating :
                        </label>
                        <div className="max-w-32">
                            <Rating
                                value={formData.rating}
                                onChange={(newRating) => setFormData({ ...formData, rating: newRating })}
                            />
                        </div>
                    </div>

                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Description :
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows="4"
                                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write your review here..."
                            />
                        </div>
                        <div >
                            {
                                serverError && serverError.map((ele, i) => {
                                    return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                                })
                            }
                        </div>

                        <div className="text-center">
                            {
                                !reviewerId && <button
                                    onClick={handleCreate}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg focus:outline-none hover:bg-blue-600 transition-colors"
                                >
                                    Submit Review
                                </button>
                            }
                            {
                                reviewerId && <button
                                    onClick={handleUpdate}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg focus:outline-none hover:bg-blue-600 transition-colors"
                                >
                                    Edit Review
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;