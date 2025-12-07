import CryptoJS from 'crypto-js';

// Hash password using SHA-256
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

// Validate email format
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  if (email.length > 254) {
    return 'Email must be less than 254 characters';
  }
  // Basic email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Invalid email format';
  }
  return '';
};

// Validate password
export const validatePassword = (password) => {
  if (!password || !password.trim()) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 128) {
    return 'Password must be less than 128 characters';
  }
  // Check if password contains at least one alphabet
  const hasAlphabet = /[a-zA-Z]/.test(password);
  // Check if password contains at least one number
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasAlphabet) {
    return 'Password must contain at least one alphabet';
  }
  if (!hasNumber) {
    return 'Password must contain at least one number';
  }
  return '';
};

// Validate name
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.length > 50) {
    return 'Name must be less than 50 characters';
  }
  return '';
};

