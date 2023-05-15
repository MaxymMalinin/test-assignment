import React from 'react';
import '../../img/logo.svg';
import '../../img/photo-cover.svg';
import '../../img/success-image.svg';

function Svg({ id, className }) {
  return (
    <svg className={className}>
      <use xlinkHref={`#${id}`}></use>
    </svg>
  );
}

export default Svg;
