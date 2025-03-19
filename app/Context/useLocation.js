import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log("Current Location:", JSON.stringify(currentLocation, null, 2));

        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg('Failed to fetch location');
        console.error('Error getting location:', error);
      }
    }

    getCurrentLocation();
  }, []);

  return { location, setLocation, errorMsg };
}
