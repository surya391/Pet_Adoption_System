import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProviderReviews } from '../../slices/ReviewSlice'
import { FaStar, FaRegStar } from 'react-icons/fa'

function AllReviews() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const query = new URLSearchParams(window.location.search)
  const serviceProviderId = query.get("serviceProviderId")

  useEffect(() => {
    if (!serviceProviderId) {
      navigate(-1)
    } else {
      dispatch(getProviderReviews(serviceProviderId))
    }
  }, [dispatch, serviceProviderId, navigate])

  const { isLoading, serverError, serviceProviderReviews } = useSelector(state => state.review)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const renderStars = (count) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= count ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-gray-300" />
      )
    }
    return stars
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Customer Reviews</h2>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {serverError && <p className="text-red-500 text-center">{serverError}</p>}

      {serviceProviderReviews && serviceProviderReviews.length > 0 ? (
        serviceProviderReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md mb-6 transition duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {review.reviewerId?.name || "Anonymous"}
              </h3>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>
            <p className="text-gray-600 mb-2">{review.description}</p>
            <p className="text-sm text-gray-400">Reviewed on {formatDate(review.createdAt)}</p>
          </div>
        ))
      ) : (
        !isLoading && <p className="text-center text-gray-500">No reviews found.</p>
      )}
    </div>
  )
}

export default AllReviews












// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getProviderReviews } from '../../slices/ReviewSlice'
// function AllReviews() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

// const query = new URLSearchParams(window.location.search)
// const serviceProviderId = query.get("serviceProviderId")
// if(!serviceProviderId) {
//     navigate(-1 )
// }
// const { isLoading, serverError, serviceProviderReviews } = useSelector(state => state.review)
// console.log("serviceProviderReviews", serviceProviderReviews)
// useEffect(() => {
//     dispatch(getProviderReviews(serviceProviderId))
//     },[])

//     return (
//     <div>AllReviews</div>
//   )
// }

// export default AllReviews