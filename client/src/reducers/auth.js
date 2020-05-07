import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    GET_USER
  } from "../actions/types";
  
const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      error: null,
      user: null
}

export default function(state = initialState , action) {
    const {type , payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token' , payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:    
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: payload
            }
    
        default:
            return state;
    }
}

  