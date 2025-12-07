import React, { createContext, useState, useContext, useEffect } from 'react';
import { hashPassword } from '../helper/UserHelper';
import { showToast } from '../helper/Toast';
import {
  saveRegisteredUsers,
  getRegisteredUsers,
  saveUserInfo,
  getUserInfo,
  removeUserInfo,
} from '../storage/InfoStore';

const AuthContext = createContext();

export const UserProvider = ({ children }) => {

  //store current user info
  const [user, setUser] = useState(null);
  //store registered users
  const [registeredUsers, setRegisteredUsers] = useState([]);
  //show loading state while loading data from AsyncStorage
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load registered users
        const storedUsers = await getRegisteredUsers();
        if (storedUsers && storedUsers.length > 0) {
          setRegisteredUsers(storedUsers);
        }
        // Load current user
        const storedUser = await getUserInfo();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const registerUser = async (userData) => {
    // Dont store password in plain text
    const hashedPassword = hashPassword(userData.password);
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };
    const updatedUsers = [...registeredUsers, userWithHashedPassword];
    setRegisteredUsers(updatedUsers);

    // Save to AsyncStorage
    await saveRegisteredUsers(updatedUsers);
  };

  const checkEmailExists = async (email) => {
    // Check AsyncStorage directly to ensure have the latest data
    const storedUsers = await getRegisteredUsers();
    return storedUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  const verifyCredentials = (email, password) => {
    // Hash the input password and compare with stored hash
    const hashedPassword = hashPassword(password);
    const foundUser = registeredUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === hashedPassword
    );
    return foundUser || null;
  };

  const login = async (userData) => {
    setUser(userData);
    // Save user info to AsyncStorage
    await saveUserInfo(userData);
    showToast('Login successful');
  };

  const logout = async () => {
    setUser(null);
    // Remove user info from AsyncStorage
    await removeUserInfo();
    showToast('Logout successful');
  };

  const value = {
    user,
    isLoading,
    registerUser,
    checkEmailExists,
    verifyCredentials,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  return context;
};

