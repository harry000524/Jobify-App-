import React from 'react';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

function AddJob() {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Im here');

    if (!position || !company || !jobLocation) {
      console.log('Im here');
      displayAlert();
    }

    if (isEditing) {
      editJob();
    } else {
      createJob();
    }
    // clearValues();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelText="Position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            labelText="Company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <div className="btn-container">
            <button className="btn btn-block submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div className="btn-container">
            <button className="btn btn-block clear-btn" onClick={clearValues}>
              Clear values
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;
