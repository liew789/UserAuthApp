import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  USER: '@UserAuthApp:user',
  REGISTERED_USERS: '@UserAuthApp:registeredUsers',
};

//Save current user info to AsyncStorage
export const saveUserInfo = async (userData) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving user info:', error);
    return false;
  }
};

//Get current user info from AsyncStorage
export const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

//Remove current user info from AsyncStorage
export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  } catch (error) {
    console.error('Error removing user info:', error);
    return false;
  }
};

//Save registered users array to AsyncStorage
export const saveRegisteredUsers = async (users) => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving registered users:', error);
    return false;
  }
};

//Get registered users array from AsyncStorage
export const getRegisteredUsers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting registered users:', error);
    return [];
  }
};

//Remove registered users from AsyncStorage
export const removeRegisteredUsers = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.REGISTERED_USERS);
    return true;
  } catch (error) {
    console.error('Error removing registered users:', error);
    return false;
  }
};

//Clear all app data from AsyncStorage
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER,
      STORAGE_KEYS.REGISTERED_USERS,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};
