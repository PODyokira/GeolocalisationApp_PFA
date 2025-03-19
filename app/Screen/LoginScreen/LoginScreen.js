import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        console.log("Sign-in or sign-up required for next steps.");
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <LinearGradient colors={['#4A90E2', '#3A3A94']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/Logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subText}>
        Sign in to access your account and continue your journey with us.
      </Text>
      <TouchableOpacity style={styles.googleButton} onPress={onPress}>
        <FontAwesome name="google" size={24} color="#EA4335" />
        <Text style={styles.buttonText}>Sign In With Google</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subText: {
    color: '#DDD',
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 40,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 30,
    width: '80%',
    elevation: 2,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
});
