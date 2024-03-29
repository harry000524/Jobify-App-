import React from 'react';
import { Alert, FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';

function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, location, lastName });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            labelText="Name"
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText="Last Name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            labelText="Email"
            type="text"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            labelText="Location"
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
