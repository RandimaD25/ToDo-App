import axios from 'axios'
 
const baseUrl: string = "http://localhost:3001/api"

// const axiosInstance = axios.create({
//     baseURL: baseURL,
//     timeout: 5000,
// })

const axiosInstance = axios.create ({ 
    baseURL: baseUrl, 
    timeout:5000,
    })

export default axiosInstance;