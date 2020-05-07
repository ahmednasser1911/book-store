import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {addBook} from '../../actions/books'

const BookCard = ({book : {volumeInfo , saleInfo} , addBook}) => {

   const authors = volumeInfo.authors;
    
    return (
      <Fragment>
        <div className="col-md-3">
          <div className="card" style={{width: '16rem'}}>
            {volumeInfo.imageLinks && 
            <img
            style={{ height: "150px" }}
            className="card-img-top"
            src={volumeInfo.imageLinks.thumbnail}
            alt="Card image cap"
          />
            } 
            <div className="card-body">
          <h4 className="card-title text-info"><i className='fa fa-heading'></i>{"  "}{volumeInfo.title}</h4>
            </div>
            <ul className="list-group list-group-flush">
              {authors && <li className="list-group-item"> 
              <i className='fa fa-award'></i>{"  "} Authors :{"  "}
              <strong>
                  {authors ?
                  authors.length > 1
                    ? authors.map((author) => {
                        return `${author} , `;
                      })
                    : authors[0] :
                    ''
                  }
                </strong>
              </li>}
              
              {saleInfo.listPrice && (
                <li className="list-group-item">
                  <i className='fa fa-dollar-sign'></i>{"  "} Price:{" "}
                  <strong>
                    {saleInfo.listPrice.amount}/
                    {saleInfo.listPrice.currencyCode}
                  </strong>
                </li>
              )}
            </ul>
            <div className="card-body">
              <a
                href={`${volumeInfo.previewLink}`}
                target="_blank"
                className="btn btn-primary"
              >
                View Book
              </a>{" "}
              {"  "}
              {!saleInfo.listPrice ?
               <a onClick = {e => addBook(volumeInfo.title,authors[0],0,
                volumeInfo.previewLink,
                volumeInfo.imageLinks.thumbnail)} href='/cart' className="btn btn-success">Add Book</a>
              : 
              <a onClick = {e => addBook(volumeInfo.title,authors[0],saleInfo.listPrice.amount,
                volumeInfo.previewLink,
                volumeInfo.imageLinks.thumbnail)} href='/cart' className="btn btn-success">Add Book</a>
              }
            </div>
          </div>
          <br />
        </div>
      </Fragment>
    );
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    addBook: PropTypes.func.isRequired
}

export default connect(null , {addBook})(BookCard)
