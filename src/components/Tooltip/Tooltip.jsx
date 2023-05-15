import React from 'react';
import './Tooltip.scss';

function Tooltip({ children, title }) {
  return (
    <div className='tooltip'>
      {children}
      <span className='tooltip_container'>{title}</span>
    </div>
  );
}

export default Tooltip;
