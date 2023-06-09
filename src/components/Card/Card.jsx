import React, { useState } from 'react';
import Svg from '../svg/svg';
import Tooltip from '../Tooltip/Tooltip';

import './Card.scss';

function Card({ user: { photo, name, position, email, phone } }) {
  const [showPhotoFallback, setShowPhotoFallback] = useState(false);

  return (
    <div className='user'>
      {showPhotoFallback ? (
        <Svg id='photo-cover' className='user_photo' />
      ) : (
        <img
          className='user_photo'
          src={photo}
          alt='User photo'
          onError={e => setShowPhotoFallback(true)}
        />
      )}

      <Tooltip title={name}>
        <p className='user_text'>{name}</p>
      </Tooltip>

      <div className='user_description'>
        <Tooltip title={position}>
          <p className='user_text'>{position}</p>
        </Tooltip>

        <Tooltip title={email}>
          <p className='user_text'>{email}</p>
        </Tooltip>

        <Tooltip title={phone}>
          <p className='user_text'>{phone}</p>
        </Tooltip>
      </div>
    </div>
  );
}

export default Card;
