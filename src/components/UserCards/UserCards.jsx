import React, { useEffect, useContext, useState } from 'react';

import { UserContext } from '../UserContextProvider/UserContextProvider';
import Card from '../Card/Card';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import { getUsers } from '../../services/testAssignmentApi';

import './UserCards.scss';

function UserCards() {
  const { isSubmitSuccessfully } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [userCardsError, setUserCardsError] = useState(false);
  const [isUserCardsLoading, setUserCardsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data.users);
        setNextPageUrl(data.links.next_url);
        setCurrentPageNumber(data.page);
      })
      .catch(() => setUserCardsError(true))
      .finally(() => setUserCardsLoading(false));
  }, [isSubmitSuccessfully]);

  const handleClick = () => {
    getUsers(currentPageNumber + 1)
      .then(data => {
        setUsers([...users, ...data.users]);
        setNextPageUrl(data.links.next_url);
        setCurrentPageNumber(data.page);
      })
      .catch(() => setUserCardsError(true));
  };

  if (isUserCardsLoading) {
    return <Preloader />;
  }

  if (userCardsError) {
    return (
      <Typography>
        An error occurred while loading users. Reload the page or try again
        later
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
