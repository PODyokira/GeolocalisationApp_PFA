import { View, Image } from 'react-native';
import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import SelectMarkerContext from '../../Context/SelectMarkerContext';

export default function Markers({ index, place }) {
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

  return place && (
    <Marker
      coordinate={{
        latitude: place.properties?.lat,
        longitude: place.properties?.lon,
      }}
      onPress={() => setSelectedMarker(index)} // Ensure function is available
    >
      <Image
        source={require('../../../assets/images/Monument.webp')}
        style={{ width: 60, height: 60 }}
      />
    </Marker>
  );
}
