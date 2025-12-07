import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { PageContainer } from '../components/PageContainer';
import InputContainer from '../components/InputContainer';
import SubmitButton from '../components/SubmitButton';
import { colors } from '../colorStore/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/AuthContext';
import { showToast } from '../helper/Toast';
import { validateEmail, validatePassword } from '../helper/UserHelper';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  const { login, verifyCredentials } = useUser();
  const isButtonDisabled = !email.trim() || !password.trim();

  const handleLogin = () => {
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    // Check if email and password match registered user data
    const user = verifyCredentials(email.trim(), password.trim());

    if (user) {
      // Credentials match, proceed with login
      login({
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString(),
        signUpTime: user.signUpTime,
      });
      navigation.replace('Main');
    } else {
      showToast('Invalid email or password. Please try again.');
    }
  };

  return (
    <PageContainer addStyle={{ paddingTop: insets.top + height * 0.1, paddingHorizontal: 24 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
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

          <SubmitButton title="Login" onPress={handleLogin} disabled={isButtonDisabled} />

          <View style={styles.signUpLinkContainer}>
            <Text style={styles.signUpLinkText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpLinkButton}>
              <Text style={styles.signUpLink}>Sign Up</Text>
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
  signUpLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  signUpLinkText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  signUpLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  signUpLinkButton: {
    paddingVertical: 10,
  },
});

export default LoginScreen;

