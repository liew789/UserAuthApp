import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { PageContainer } from '../components/PageContainer';
import InputContainer from '../components/InputContainer';
import SubmitButton from '../components/SubmitButton';
import { colors } from '../colorStore/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/AuthContext';
import { validateEmail, validateName, validatePassword } from '../helper/UserHelper';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const { registerUser, checkEmailExists } = useUser();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const isButtonDisabled = !name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim();

  const handleSignUp = async () => {
    const nameValidationError = validateName(name); 
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validatePassword(confirmPassword);

    setNameError(nameValidationError);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (nameValidationError || emailValidationError || passwordValidationError || confirmPasswordValidationError) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    // Check if email already exists in AsyncStorage
    const emailExists = await checkEmailExists(email.trim());

    if (emailExists) {
      setEmailError('This email is already registered. Please use a different email.');
      return;
    }

    // Register the new user in context
    await registerUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      signUpTime: new Date().toISOString(),
    });

    Alert.alert('Success', 'Account created successfully, please login to continue!', [
      {
        text: 'OK',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  return (
    <PageContainer addStyle={{ paddingTop: insets.top + height * 0.1, paddingHorizontal: 24 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <InputContainer
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={50}
            error={nameError}
          />

          <InputContainer
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={254}
            error={emailError}
          />

          <InputContainer
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showPasswordToggle
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={128}
            error={passwordError}
          />

          <InputContainer
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            showPasswordToggle
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={128}
            error={confirmPasswordError}
          />

          <SubmitButton title="Sign Up" onPress={handleSignUp} disabled={isButtonDisabled} />

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLinkButton}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textTertiary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  loginLinkText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  loginLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  loginLinkButton: {
    paddingVertical: 10,
  },
});

export default SignUpScreen;

