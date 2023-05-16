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
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data.users);
        setNextPageUrl(data.links.next_url);
        setCurrentPageNumber(data.page);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClick = () => {
    getUsers(currentPageNumber + 1).then(data => {
      setUsers([...users, ...data.users]);
      setNextPageUrl(data.links.next_url);
      setCurrentPageNumber(data.page);
    });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <div className='users'>
        {users
          .sort((a, b) => b.registration_timestamp - a.registration_timestamp)
          .map(user => (
            <Card key={user.id} user={user} />
          ))}
      </div>

      {nextPageUrl && <Button onClick={handleClick}>Show more</Button>}
    </>
  );
}

export default UserCards;
