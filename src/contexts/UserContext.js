import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Try to restore user from storage if needed
    const storedUser = localStorage.getItem("ozone_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  const handleUser = (value) => {
    setUser(value);
    if (value) {
      setUserId(value.id);
      localStorage.setItem("ozone_user", JSON.stringify(value));
    } else {
      setUserId(null);
      localStorage.removeItem("ozone_user");
    }
  };

  const clientPhoneNumber = 18259946504;

  const value = {
    user,
    userId,
    handleUser,
    clientPhoneNumber,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
