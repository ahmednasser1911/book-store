import {GET_BOOKS, BOOKS_ERROR , GET_BOOK, GET_MY_BOOKS , DELETE_BOOK} from '../actions/types'
const initailState = {
    books: null,
    myBooks:[],
    book: null,
    loading: true,
    error: {}
}

export default function(state = initailState , action) {
    const {type , payload} = action;
    switch(type){
        case GET_BOOKS:
            return {
                ...state,
                books: payload,
                loading: false
            }
        case GET_MY_BOOKS:
                return {
                    ...state,
                    myBooks: payload,
                    loading: false
                }
        case GET_BOOK:
                return {
                    ...state,
                    book: payload,
                    loading: false
                }
        case DELETE_BOOK:
            return {
                ...state,
                myBooks: state.myBooks.filter(book => book._id !== payload._id),
                loading: false
            }
        case BOOKS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default: return state;
    }
}