import React from 'react';
import Svg from '../svg/svg';
import Tooltip from '../Tooltip/Tooltip';

import './Card.scss';

function Card() {
  return (
    <div className='user'>
      <Svg id='photo-cover' className='user_photo' />

      <Tooltip title='placeholder'>
        <p className='user_text'>
          Takamaru Ayako Jurrien Takamaru Ayako JurrienTakamaru Ayako
          JurrienTakamaru Ayako JurrienTakamaru Ayako Jurrien
        </p>
      </Tooltip>

      <div className='user_description'>
        <Tooltip title='placeholder'>
          <p className='user_text'>Lead Independent Director</p>
        </Tooltip>

        <Tooltip title='placeholder'>
          <p className='user_text'>Takamuru@gmail.com</p>
        </Tooltip>

        <Tooltip title='placeholder'>
          <p className='user_text'>+38 (098) 278 90 24</p>
        </Tooltip>
      </div>
    </div>
  );
}

export default Card;
