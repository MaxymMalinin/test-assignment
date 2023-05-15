import React from 'react';
import Card from '../Card/Card';

import './UserCards.scss';

function UserCards() {
  return (
    <div className='users'>
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <Card key={index} />
      ))}
    </div>
  );
}

export default UserCards;
