import React from 'react';
import './Button.scss';

function Button({ children, as: Component = 'button', ...rest }) {
  return (
    <Component className='button' {...rest}>
      {children}
    </Component>
  );
}

export default Button;
