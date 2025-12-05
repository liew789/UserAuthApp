import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { PageContainer } from '../container/PageContainer';
import { colors } from '../colorStore/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';

const MainScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <PageContainer addStyle={{ paddingTop: insets.top }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Main Screen</Text>
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
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Name:</Text>
              <Text style={styles.userInfoValue}>{user.name || 'N/A'}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Email:</Text>
              <Text style={styles.userInfoValue}>{user.email || 'N/A'}</Text>
            </View>
            {user.loginTime && (
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoLabel}>Login Time:</Text>
                <Text style={styles.userInfoValue}>
                  {formatDate(user.loginTime)}
                </Text>
              </View>
            )}
            {user.signUpTime && (
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoLabel}>Sign Up Time:</Text>
                <Text style={styles.userInfoValue}>
                  {formatDate(user.signUpTime)}
                </Text>
              </View>
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
    justifyContent: 'center',
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
  userInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTertiary,
    flex: 1,
  },
  userInfoValue: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 2,
    textAlign: 'right',
  },
});

export default MainScreen;

