import React, { useEffect, useState } from 'react';

import Card from '../Card/Card';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import { getUsers } from '../../services/testAssignmentApi';

import './UserCards.scss';
import Typography from '../Typography/Typography';

function UserCards() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data.users);
        setNextPageUrl(data.links.next_url);
        setCurrentPageNumber(data.page);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = () => {
    getUsers(currentPageNumber + 1).then(data => {
      setUsers([...users, ...data.users]);
      setNextPageUrl(data.links.next_url);
      setCurrentPageNumber(data.page).catch(() => setError(true));
    });
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <Typography>
        An error occurred while loading users. Reload the page or try again
        later.
      </Typography>
    );
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
