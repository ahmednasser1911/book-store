import {
    GET_USER , AUTH_ERROR , LOGOUT, LOGIN_FAIL ,
    LOGIN_SUCCESS , REGISTER_FAIL , REGISTER_SUCCESS
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import {setAlert} from './alert'

export const getUser = () => async dispatch => {
    // check token in local storage
    if(localStorage.token){
        // set token to the headers
       setAuthToken(localStorage.token);
    } 

    try {
        // get auth user
        const res = await axios.get('/api/users/');
        dispatch({
            type: GET_USER,
            payload: res.data.user // user
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// login user
export const loginUser = (email , password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        email,
        password
    });

    try {
        const res = await axios.post("/api/users/login" , body , config);
        dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
        });

        dispatch(getUser());
           
    } catch (error) {
        dispatch(setAlert(error.response.data.msg , 'danger'));
        dispatch({
            type: LOGIN_FAIL,
        });

    }
}

// register user
export const register = (name , email , password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        name,
        email,
        password
    });

    try {
        const res = await axios.post("/api/users/" , body , config);
        dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
        });

        dispatch(getUser());
           
    } catch (error) {
        dispatch(setAlert(error.response.data , 'danger'));
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// logout user
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}