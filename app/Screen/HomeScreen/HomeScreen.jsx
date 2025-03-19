import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AppMapView from "./AppMapView";
import Header from "./Header";
import PlaceListView from "./PlaceListView";
import SearchBar from "./SearchBar";
import GlobalApi from "@/app/Utils/GlobalApi";
import { useLocation } from "@/app/Context/useLocation";
import SelectMarkerContext from "@/app/Context/SelectMarkerContext";

export default function HomeScreen() {
  const { location, setLocation } = useLocation();
  const [places, setPlaces] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (location) {
      fetchNearbyPlaces();
    }
  }, [location]);

  const fetchNearbyPlaces = async () => {
    try {
      const latitude = location?.coords?.latitude;
      const longitude = location?.coords?.longitude;

      if (!latitude || !longitude) {
        console.error("Invalid location coordinates");
        return;
      }

      const response = await GlobalApi.getNearbyPlaces(latitude, longitude);
      setPlaces(response.features || []);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  const handleViewOnMap = (lat, lon) => {
    if (lat && lon) {
      // Use the coordinates to update the map view
      Alert.alert("Opening map view", `Coordinates: ${lat}, ${lon}`);
      // Here you can call a method to update the AppMapView with the new coordinates
      // E.g., AppMapView.updateMapRegion(lat, lon);
    } else {
      Alert.alert("Error", "Unable to fetch coordinates.");
    }
  };

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar
            searchedLocation={(location) => {
              setLocation({
                coords: {
                  latitude: location[1],
                  longitude: location[0]
                }
              });
            }}
          />
        </View>
        <AppMapView location={location?.coords} places={places} />
        <View style={styles.placeListContainer}>
          {places && <PlaceListView places={places} onViewOnMap={handleViewOnMap} />}
        </View>
      </View>
    </SelectMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    pointerEvents: "box-none",
  },
  placeListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
});
