import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const registerUser = (userData) => {
    setRegisteredUsers((prevUsers) => [...prevUsers, userData]);
  };

  const verifyCredentials = (email, password) => {
    const foundUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );
    return foundUser || null;
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  const value = {
    user,
    registeredUsers,
    registerUser,
    verifyCredentials,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

