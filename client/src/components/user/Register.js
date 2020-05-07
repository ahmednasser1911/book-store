import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { Redirect, Link } from "react-router-dom";

const Register = ({ register , auth: {isAuthenticated} }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
      e.preventDefault();
      register(name , email ,password)
  }

  if(isAuthenticated){
      return <Redirect to='/cart'/>
  }

  return (
    <div className='container'>
      <br />
      <form onSubmit = {e => onSubmit(e)}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            name='name'
            value={name}
            onChange= {e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            className="form-control"
            name='email'
            value={email}
            onChange= {e => onChange(e)}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type='password'
            className="form-control"
            name='password'
            value={password}
            onChange= {e => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>Have an email?  <Link to='/login' className='success'>Sign in</Link></p>
        <Link to='/login'/>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { register })(Register);
