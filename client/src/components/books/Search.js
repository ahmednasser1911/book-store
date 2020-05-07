import React  , {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getBooksByTitle} from '../../actions/books';

const Search = ({getBooksByTitle}) => {
    const [title , setTitle] = useState('')

    const onChange = (e) => {
        setTitle(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getBooksByTitle(title);
        setTitle('');
    }

    return (
        <div className = "card card-body mb-4 p-4">
        <h1 className = "display-4 text-center">
            <i className = "fa fa-book"></i> Search For A Book
        </h1>
        <p className = "lead text-center">Get Info For Any Book</p>
        <form onSubmit = {e => onSubmit(e)}>
            <div className = "form-group">
                <input type = "text" placeholder = "Find Book..." 
                className = "form-control form-control-lg"
                name = "title"
                value={title}
                onChange = {e => onChange(e)}
                />
            </div>
            <button type = "submit" className = "btn btn-primary btn-lg btn-block mb-5">
             Search
            </button>
        </form>
    </div>
    )
}

Search.propTypes = {
    books: PropTypes.object.isRequired,
    getBooksByTitle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    books: state.books
});

export default connect(mapStateToProps , {getBooksByTitle})(Search)
