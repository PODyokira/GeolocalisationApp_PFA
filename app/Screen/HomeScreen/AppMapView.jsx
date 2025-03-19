import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Image, StyleSheet, View } from 'react-native';
import MapViewStyle from '../../Utils/MapViewStyle.json';
import Markers from '../HomeScreen/Markers'
export default function AppMapView({ location ,places}) {
  const region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      }
    : null;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        showsUserLocation={true}
        initialRegion={region}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta:0.0442,
              longitudeDelta:0.0441,
            }}
          >
            <Image
              style={styles.userMarker}
            />
          </Marker>
        )}

        {places&&places.map((item,index)=>(
          <Markers key={index}
          index={index}
          place={item}/>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  userMarker: {
    width: 40,
    height: 40,
  },
});