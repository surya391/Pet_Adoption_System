import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : 'https://pet-adoption-system-iz2r.onrender.com/api'
})

export default axiosInstance
