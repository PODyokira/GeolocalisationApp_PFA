import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import TabNavigation from './Navigations/TabNavigation';
import LoginScreen from './Screen/LoginScreen/LoginScreen';

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

// Token cache for Clerk
const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error('Error retrieving token:', err);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('Error saving token:', err);
    }
  },
};

// Component to log user information and token
const UserInfo = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchAndLogToken = async () => {
      if (isSignedIn) {
        //console.log('User Info:', user); // Logs the user info to the console
        try {
          const token = await getToken();
          console.log('Session Token:', token); // Logs the session token
        } catch (error) {
          console.error('Error fetching session token:', error);
        }
      } else {
        console.log('No user is signed in');
      }
    };

    fetchAndLogToken();
  }, [isSignedIn, user]);

  return null; // No UI needed, just for logging
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const publishableKey = 'pk_test_YWxsb3dlZC1yZXB0aWxlLTYzLmNsZXJrLmFjY291bnRzLmRldiQ';

  if (!publishableKey) {
    throw new Error('Add your Clerk publishable key to the app');
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {/* tokencash : tokenCache={tokenCache} */}
      <View style={styles.container} onLayout={onLayoutRootView} >
        {/* Logs the user's info and session token */}
        <UserInfo />
        {/* Main App Content */}
        <SignedIn>
          <TabNavigation />
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
