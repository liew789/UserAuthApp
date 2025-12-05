import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { PageContainer } from '../container/PageContainer';
import InputContainer from '../container/InputContainer';
import { colors } from '../colorStore/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const { login, verifyCredentials } = useUser();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
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
      });
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }
  };

  return (
    <PageContainer addStyle={{ paddingTop: insets.top + height * 0.1, paddingHorizontal: 24 }}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.form}>

          <InputContainer
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <InputContainer
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showPasswordToggle
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signUpLinkContainer}>
            <Text style={styles.signUpLinkText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  signUpLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
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
});

export default LoginScreen;

