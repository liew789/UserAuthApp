import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { PageContainer } from '../components/PageContainer';
import InfoContainer from '../components/InfoContainer';
import { colors } from '../colorStore/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/AuthContext';

const MainScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useUser();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          logout();
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <PageContainer addStyle={{ paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Auth App</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome{user?.name ? `, ${user.name}` : ''}!
        </Text>
        <Text style={styles.description}>
          You have successfully logged in to the app.
        </Text>

        {user && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoTitle}>User Information</Text>
            <InfoContainer label="Name:" value={user.name} />
            <InfoContainer label="Email:" value={user.email} />
            {user.loginTime && (
              <InfoContainer
                label="Login Time:"
                value={user.loginTime}
                formatDate={true}
              />
            )}
            {user.signUpTime && (
              <InfoContainer
                label="Sign Up Time:"
                value={user.signUpTime}
                formatDate={true}
              />
            )}
          </View>
        )}
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutButtonText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: "20%",
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  userInfoContainer: {
    width: '100%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
});

export default MainScreen;

