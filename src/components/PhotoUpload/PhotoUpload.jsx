import React, { useState } from 'react';

import './PhotoUpload.scss';

function PhotoUpload({ id, name, label, placeholder, register, errors }) {
  const [fileName, setFileName] = useState('');

  const errMessage = errors[name]?.message;

  console.log(errMessage);

  return (
    <div className={`photo${errMessage ? ' photo__error' : ''}`}>
      <input
        type='file'
        id={id}
        className='photo_field'
        {...register(name, {
          onChange: e => setFileName(e.target.files[0]?.name),
        })}
      />
      <label htmlFor={id} className='photo_label'>
        <p className='photo_label_text'>{label}</p>
        <div className='photo_label_file-container'>
          {fileName ? (
            <p className='photo_label_file-name'>{fileName}</p>
          ) : (
            <p className='photo_label_file-name photo_label_file-name__placeholder'>
              {placeholder}
            </p>
          )}
        </div>
      </label>
      {errMessage && <p className='photo_label_error'>{errMessage}</p>}
    </div>
  );
}

export default PhotoUpload;
