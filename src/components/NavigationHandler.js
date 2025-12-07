import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/AuthContext';

const NavigationHandler = () => {
  const navigation = useNavigation();
  const { user, isLoading } = useUser();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Only navigate once when loading is complete
    if (!isLoading && !hasNavigated.current) {
      hasNavigated.current = true;
      if (user) {
        // User is logged in, navigate to Main screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }
    }
  }, [user, isLoading, navigation]);

  return null;
};

export default NavigationHandler;
