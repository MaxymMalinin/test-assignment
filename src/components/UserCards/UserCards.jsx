import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '../Card/Card';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import { getUsers } from '../../services/testAssignmentApi';

import './UserCards.scss';

function UserCards() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data.users);
      })
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <div className='users'>
        {users.map(user => (
          <Card key={user.id} user={user} />
        ))}
      </div>
      <Button>Show more</Button>
    </>
  );
}

export default UserCards;
