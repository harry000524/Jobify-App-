import React from 'react';

function FormRowSelect({ labelText, name, handleChange, value, list }) {
  return (
    <div className="form-row">
      <lable className="form-label">{labelText || name}</lable>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
