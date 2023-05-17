import React, { useState, createContext } from 'react';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [isSubmitSuccessfully, setIsSubmitSuccessfully] = useState(false);

  const value = {
    isSubmitSuccessfully,
    setIsSubmitSuccessfully,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
