import React, { useEffect, useState } from 'react';
import Radio from '../Radio/Radio';
import Typography from '../Typography/Typography';
import Preloader from '../Preloader/Preloader';
import { getPositions } from '../../services/testAssignmentApi';

import './RadioGroup.scss';

function RadioGroup({ id, name }) {
  const [positions, setPositions] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPositions()
      .then(data => setPositions(data.positions))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className='radio-group radio-group__centered'>
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='radio-group radio-group__centered'>
        <Typography>
          An error occurred while loading user positions. Reload the page or try
          again later.
        </Typography>
      </div>
    );
  }

  return (
    <div className='radio-group'>
      <Typography>Select your position</Typography>
      {positions.map(item => (
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
