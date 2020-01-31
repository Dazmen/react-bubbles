import Axios from 'axios';

const axiosWithAuth = () => {

    return Axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            authorization : localStorage.getItem('token')
        }
    })
}

export default axiosWithAuth;