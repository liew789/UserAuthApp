import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { UserProvider, useUser } from './src/context/AuthContext';
import Loading from './src/components/Loading';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainScreen from './src/screens/MainScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useUser();
  const isDarkMode = useColorScheme() === 'dark';

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        initialRouteName={user ? 'Main' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}

export default App;
