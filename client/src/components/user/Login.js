import React  , {useState , Fragment} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from '../../actions/auth';

const Login = ({loginUser , auth: {isAuthenticated , msg}}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const { email, password } = formData;
    
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const onSubmit = (e) => {
          e.preventDefault();
          loginUser(email ,password)
    }

    if(isAuthenticated){
        return <Redirect to='/cart'/>
    }

    return (
        <div className='container'>
          <br />
          {msg ? 
          <Fragment>
          <h2>{msg}</h2> 
          <form onSubmit = {e => onSubmit(e)}>
          <div className="form-group">
            <label >Email address</label>
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
        </form>
        </Fragment>
          : 
          <form onSubmit = {e => onSubmit(e)}>
          <div className="form-group">
            <label >Email address</label>
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
        </form>
          }
      
    </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps , {loginUser})(Login)
