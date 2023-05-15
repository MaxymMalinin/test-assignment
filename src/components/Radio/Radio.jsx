import React from 'react';
import { useFormContext } from 'react-hook-form';

import './Radio.scss';

function Radio({ value, id, name, label }) {
  const { register } = useFormContext();

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
