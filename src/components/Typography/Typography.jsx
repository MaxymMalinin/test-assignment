import React from 'react';
import './Typography.scss';

function Typography({ children, as: Component = 'p', design = '' }) {
  return <Component className={design}>{children}</Component>;
}

export default Typography;
