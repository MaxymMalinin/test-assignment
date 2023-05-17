import React from 'react';

import './Radio.scss';

function Radio({ value, id, name, label, register }) {
  return (
    <div className='radio'>
      <input
        type='radio'
        id={id}
        value={value}
        className='radio_field'
        {...register(name)}
      />
      <label htmlFor={id} className='radio_label'>
        {label}
      </label>
    </div>
  );
}

export default Radio;
