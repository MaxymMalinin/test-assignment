import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask-3.0';

import './Input.scss';

function Input({ type = 'text', id = '', name = '', label = '', helperText }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errMessage = errors[name]?.message;

  return (
    <div className={`input${errMessage ? ' input__error' : ''}`}>
      {(type === 'tel' && (
        <InputMask
          type={type}
          id={id}
          placeholder=' '
          className='input_field'
          mask='+38 (099) 999 - 99 - 99'
          {...register(name)}
        />
      )) || (
        <input
          type={type}
          id={id}
          placeholder=' '
          className='input_field'
          {...register(name)}
        />
      )}
      <label htmlFor={id} className='input_label'>
        {label}
      </label>
      {(errMessage && (
        <p className='input_text input_text__error'>{errMessage}</p>
      )) ||
        (helperText && <p className='input_text'>{helperText}</p>)}
    </div>
  );
}

export default Input;
