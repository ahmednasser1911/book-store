import React, { useEffect ,Fragment} from "react";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserBooks  , deleteBook} from "../../actions/books";
import Spinner from "../layout/Spinner";
const Cart = ({ books: { myBooks, loading }, getUserBooks , deleteBook}) => {
  useEffect(() => {
    getUserBooks();
  }, [getUserBooks, loading]);

  const prices = (myBooks) => {
    let sum = 0 , books = 0;
    myBooks.map(book => {
      books += 1;
      sum += Number(book.price)
    });
    return [sum , books];
  }
  return (
    <div className='container'>
      <div className = "card card-body mb-2 p-2">
        <h3 className = "display-6 text-center text-info">
            <i className = "fa fa-book"></i> You have added {prices(myBooks)[1]} books!
        </h3>
        <h3 className = "display-6 text-center text-primary">
            <i className = "fa fa-receipt"></i> Your Bill Now: {prices(myBooks)[0]} /EGP
        </h3>
      </div>
      <br/>
    <div className="row container">
      {myBooks.length === 0 && loading === false ? (
        <h1>No Books</h1>
      ) : loading ? (
        <Spinner />
      ) : (
        myBooks.map((book) => (
          <Fragment key={book._id}>
            <div className="col-md-3">
              <div className="card" style={{width: '16rem'}}>
                    {book.cover && (<img
                      style={{ height: "150px" }}
                      className="card-img-top"
                      src={book.cover}
                      alt="Card image cap"
                      />)}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {book.describtion && (<li className="list-group-item">
                    Desvribtion:{" "}
                    <strong>
                     {book.describtion}
                    </strong>
                  </li>)}
                  {book.author && <li className="list-group-item">
                    Author:{" "}
                    <strong>
                     {book.author}
                    </strong>
                  </li>}

                  {book.price && (
                    <li className="list-group-item">
                      Price:{" "}
                      <strong>
                        {book.price}/ EGP
                      </strong>
                    </li>
                  )}
                </ul>
                <div className="card-body">
                  {"  "}
                  {book.previewLink ? (
                  <a href={book.previewLink} className="btn btn-success" target='_blank'>View Book</a>
                  ) : 
                  <a href='#!' className="btn btn-success">View Book</a>
                  } {"  "}
                  <a onClick={e => deleteBook(book._id)} href='#!' className="btn btn-danger">X</a>
                </div>
              </div>
              <br />
            </div>
          </Fragment>
        ))
      )}
    </div>
    </div>
  );
};

Cart.propTypes = {
  books: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps, { getUserBooks , deleteBook})(Cart);
