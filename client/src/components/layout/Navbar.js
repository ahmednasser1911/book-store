import React  , {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated} , logout}) => {

  const authLinks = (
    <div className="navbar">
      <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cart"><i className='fa fa-shopping-cart'></i>  Cart</Link>
            </li>
            <li className="nav-item">
              <Link 
               onClick = {logout} to="#!"
              className="nav-link"><i className = "fa fa-sign-out"></i>  Logout</Link>
      </li>
      </ul>
  </div>
  )

  const gustLinks = (
    <div className="navbar">
      <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/register">Register </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login"><i className="fa fa-sign-in"></i>  Login</Link>
            </li>
            
      </ul>
  </div>
  )

    return (
    <nav className="navbar navbar-expand-lg navbar-toggler navbar-dark bg-primary">
        <Link className="navbar-brand" to="/"><i className="fa fa-book"></i>  Booky</Link>
        <Link className="navbar-brand" to="/"> Home</Link>
        {
        isAuthenticated ? authLinks 
        : gustLinks
        }
      </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps , {logout})(Navbar)


