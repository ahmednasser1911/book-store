import React  , {useEffect } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import BookCard from './BookCard'
import {getAllBooks} from '../../actions/books';
import Spinner from '../layout/Spinner'

const Books = ({books: {books , loading}, getAllBooks}) => {
    useEffect(() => {
        getAllBooks();
    } , [getAllBooks , loading]);
    
    return (
    <div className="row">
        {!loading && books === null ? (<Spinner/>):
        // loading && books === null ? (
        //     <div className='container'><h2>No Books Found!</h2></div>
        
        // ):
        !loading ? 
        books.items.map(book => {
            return (<BookCard key={book.id} book={book}/>) 
        })
        : <Spinner/>
        }

        
    </div>
)
}

Books.propTypes = {
    getAllBooks: PropTypes.func.isRequired,
    books: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    books: state.books
})

export default connect(mapStateToProps , {getAllBooks})(Books)
