import {combineReducers} from 'redux';
import books from './books'
import auth from './auth'
import alert from './alert'

export default combineReducers({
    books,
    auth,
    alert
});