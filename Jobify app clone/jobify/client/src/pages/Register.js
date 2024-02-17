import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import Alert from '../components/Alert';
import FormRow from '../components/FormRow';
import Logo from '../components/Logo';
import { useAppContext } from '../context/appContext';

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    isMember: true,
  });

  const navigate = useNavigate();

  const { displayAlert, showAlert, setupUser, isLoading, user } =
    useAppContext();
  console.log('log---', user);
  useEffect(() => {
    console.log('in use efect', user);
    if (user) {
      console.log('in use efect11', user);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user]);

  const handleChange = (event) => {
    console.log(event.target);
    console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
    }

    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({ currentUser, actionType: 'login', msg: 'Login successfull' });
    } else {
      setupUser({ currentUser, actionType: 'register', msg: 'User Created' });
    }
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            handleChange={handleChange}
            type="text"
            name="name"
            labelText="Name"
            value={values.name}
          />
        )}

        <FormRow
          handleChange={handleChange}
          type="email"
          name="email"
          labelText="Email"
          value={values.email}
        />
        <FormRow
          handleChange={handleChange}
          type="password"
          name="password"
          labelText="Password"
          value={values.password}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {values.isMember ? 'Login' : 'Register'}
        </button>
        <button
          className="btn btn-block btn-hipster"
          type="button"
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: 'test@gmail.com', password: 'secret' },
              actionType: 'login',
              msg: 'Login successfull',
            });
          }}
        >
          {isLoading ? 'loading... ' : 'Demo app'}
        </button>
        <p>{values.isMember ? 'Not a Member ?' : 'Already a member?'}</p>
        <button
          className="member-btn"
          type="button"
          onClick={() => setValues({ ...values, isMember: !values.isMember })}
        >
          {values.isMember ? 'Register' : 'Login'}
        </button>
      </form>
    </Wrapper>
  );
}

export default Register;
