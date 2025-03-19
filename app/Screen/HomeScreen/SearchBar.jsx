import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ searchedLocation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const fetchGeoapifyResults = async (text) => {
    const apiKey = '7238b6b511c94aa8be936b7bc8ed03b2';
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.features.map((feature) => ({
        description: feature.properties.formatted,
        place_id: feature.properties.place_id,
        location: feature.geometry.coordinates, // Add location data
      }));
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching Geoapify results:', error);
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetchGeoapifyResults(text);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <Ionicons
          name="location-sharp"
          size={24}
          color="gray"
          style={{ paddingTop: 10 }}
        />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            color: '#000',
            marginLeft: 5,
          }}
          placeholder="Search"
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          value={query}
          onChangeText={handleInputChange}
        />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}
            onPress={() => {
              // Pass the selected location to the parent component
              searchedLocation(item.location);
              setSearchResults([]);
              setQuery('');
            }}
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
