import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const Direction = ({ location }) => {
  const [modeOfTransport, setModeOfTransport] = useState('');
  const [directions, setDirections] = useState('');
  const [destination, setDestination] = useState('');

  const apiKey = '7238b6b511c94aa8be936b7bc8ed03b2';

  const getDirections = async () => {
    if (!destination || !modeOfTransport || !location) {
      alert('Please select a mode of transport, enter a destination, and ensure location is available.');
      return;
    }

    try {
      const startLat = location.latitude;
      const startLon = location.longitude;

      // Make a request to the Geoapify Directions API
      const response = await axios.get(
        `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLon}&mode=${modeOfTransport}&apiKey=${apiKey}`
      );

      const route = response.data.routes[0].legs[0].steps.map(step => step.instruction).join('\n');
      
      setDirections(route);
    } catch (error) {
      console.error(error);
      alert('Error getting directions.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select Mode of Transport:</Text>
      <Button title="On Foot" onPress={() => setModeOfTransport('foot')} />
      <Button title="By Car" onPress={() => setModeOfTransport('car')} />
      <Button title="By Bike" onPress={() => setModeOfTransport('bike')} />

      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Get Directions" onPress={getDirections} />
      
      <Text>Directions:</Text>
      <Text>{directions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Direction;
