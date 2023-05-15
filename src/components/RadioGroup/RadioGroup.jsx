import React from 'react';
import Radio from '../Radio/Radio';
import Typography from '../Typography/Typography';

import './RadioGroup.scss';

const allPositions = {
  success: true,
  positions: [
    { id: 1, name: 'Lawyer' },
    {
      id: 2,
      name: 'Content manager',
    },
    { id: 3, name: 'Security' },
    { id: 4, name: 'Designer' },
  ],
};

function RadioGroup({ id, name }) {
  return (
    <div className='radio-group'>
      <Typography>Select your position</Typography>
      {allPositions.positions.map(item => (
        <Radio
          key={item.id}
          value={item.id}
          id={`${id}${item.id}`}
          name={name}
          label={item.name}
        />
      ))}
    </div>
  );
}

export default RadioGroup;
