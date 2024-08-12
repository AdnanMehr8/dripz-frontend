// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logout } from '../redux/authSlice';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   withCredentials: true 
// });
// // const setupInterceptors = (navigate) => {
//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const navigate = useNavigate();
//         const dispatch = useDispatch();
//       if (error.response && error.response.data === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         dispatch(logout());
//         navigate('/login')

//       }
//       return Promise.reject(error)
//     }
//   );
// // }
// export default api;
// import jwtDecode from 'jwt-decode';

// // Function to check if the token is expired
// const isTokenExpired = (token) => {
//   if (!token) return true;

//   const { exp } = jwtDecode(token);
//   return Date.now() >= exp * 1000;
// };

// // On application load, check the token's expiration
// const token = localStorage.getItem('token');
// if (token && isTokenExpired(token)) {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
// }

// Example of handling token expiration in an interceptor
import axios from 'axios';
// import store  from '../redux/store'; 
import { logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';


const api = axios.create({
  baseURL: 'http://localhost:5000',
  // other configurations
  withCredentials: true 
});


// Function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;

  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};

// On application load, check the token's expiration
const token = localStorage.getItem('token');
if (token && isTokenExpired(token)) {


  localStorage.removeItem('token');
  localStorage.removeItem('user');
 

}

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      const dispatch = useDispatch();
      // Token has expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout()); // Dispatch logout action
      // Optionally redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
