import React from 'react';

function FormRow({ type, name, handleChange, labelText, value }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className={name}>
        {labelText || name}
      </label>
      <input
        type={type}
        onChange={handleChange}
        className="form-input"
        name={name}
        value={value}
      />
    </div>
  );
}

export default FormRow;
