import axios from 'axios';
import {GET_BOOKS , BOOKS_ERROR , GET_MY_BOOKS , DELETE_BOOK} from './types';
import {setAlert} from './alert'

export const getAllBooks = () => async dispatch =>{
    try {
        const res = await axios
            .get('/api/books');

            dispatch({
                type: GET_BOOKS,
                payload: res.data
            });
        
    } catch(error) {
        console.log(error);
        dispatch({
            type: BOOKS_ERROR,
            payload: {msg :  error.message }
        });
    }
}

export const getBooksByTitle = (title) => async dispatch =>{
    axios.get(`/api/books/${title}`)
    .then((response) => {
        dispatch({
            type: GET_BOOKS,
            payload: response.data
        })
    }).catch(error => {
        console.error(error.message)
        dispatch({
            type: BOOKS_ERROR,
            payload: {msg :  error.message }
        });
    });
}

export const getUserBooks = () => async dispatch =>{
    try {
        const res = await axios.get(`/api/books/myBooks`);
        console.log(res.data);
        dispatch({
            type: GET_MY_BOOKS,
            payload: res.data // books []
        })
    } catch(error) {
        console.log(error)
        dispatch({
            type: BOOKS_ERROR,
            payload: {msg :  error.response.statusText , status: error.response.status}
        });
    }
}

// Add Book To User
export const addBook = (title,author,price,previewLink,cover) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        title,author,price,previewLink,cover
    });
    axios.post(`/api/books/`,body,config).then(res => {
        console.log(res.data);
        dispatch(setAlert("You have added a new book!" , 'success'));
        }).catch(error => {
            console.log(error);
            dispatch({
                type: BOOKS_ERROR,
                payload: {msg :  error.response.statusText , status: error.response.status}
            });
        })

}

// delete Book
export const deleteBook = (bookId) => async dispatch =>{

    try {
        const res = await axios.delete(`/api/books/${bookId}`);
        dispatch(setAlert('Book Removed!' , 'success'));
        dispatch({
            type: DELETE_BOOK,
            payload: res.data
        })
        console.log(bookId , res.data._id);

    } catch (error) {
        console.error(error.response);
        dispatch(setAlert(error.response.statusText , 'danger'));
        dispatch({
            type: BOOKS_ERROR,
            payload: {msg :  error.response.statusText , status: error.response.status}
        });
    }

}