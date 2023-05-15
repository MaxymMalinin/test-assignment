import React from 'react';
import './Section.scss';

function Section({ id, children }) {
  return (
    <section className='section' id={id}>
      {children}
    </section>
  );
}

export default Section;
