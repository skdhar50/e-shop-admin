import axios from 'axios';

axios.interceptors.response.use(function (response) {
    
    return response;
  }, function (error) {
    
    const expectedError = 
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

        if(!expectedError){
            // console.log('Logging the error', error)
            alert('An unexpected error occured. Please try again later.')
        }
        else if(error.response.status === 400){
            alert('Bad request');

        }
        else if(error.response.status === 401){
            alert("Email or username already exist");    

        }
        else if(error.response.status === 402){
            alert("Invalid username or password");

        }
        else if (error.response.status === 404){
            alert('This is invalid url');
        }
        return Promise.reject(error)
    // return Promise.reject(error);
  });
const http =  {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default http;