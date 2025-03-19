import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Octicons from '@expo/vector-icons/Octicons';

export default function Header() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.imageUrl }}
        style={styles.profileImage}
      />
      <Image
        source={require('../../../assets/images/Logo.png')}
        style={styles.logo}
      />
      <Octicons name="filter" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    pointerEvents: 'auto', // Enable touch events only for visible elements
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});
