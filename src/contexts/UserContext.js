import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const handleUserId = (value) => {
    setUserId(value);
  };

  const clientPhoneNumber = 18259946504;

  const value = {
    userId,
    handleUserId,
    clientPhoneNumber,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
