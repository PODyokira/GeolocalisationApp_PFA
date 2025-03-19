import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView , Linking  } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function PlaceItem({ place }) {
  const getImageForMonument = (name) => {
    const normalizedPlaceName = name
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]/g, '') // Remove any non-alphanumeric characters
      .replace(/-+/g, '-') // Replace multiple hyphens with a single one
      .replace(/^[-]+|[-]+$/g, ''); // Trim leading/trailing hyphens

    // Image mapping
    const imageMap = {
      'bab-el-had': require('../../../assets/Monuments/Bab el Had.jpg'),
      'bab-lamrissa': require('../../../assets/Monuments/Bab Lamrissa.webp'),
      'bab-rouah': require('../../../assets/Monuments/Bab Rouah.jpeg'),
      'bab-soufara': require('../../../assets/Monuments/Bab Soufara.jpg'),
      'bab-zaer': require('../../../assets/Monuments/Bab Zaer.jpg'),
      'borj-adoumoue-bastion-des-larmes': require('../../../assets/Monuments/Borj Adoumoue, Bastion des Larmes.jpg'),
      'chellah': require('../../../assets/Monuments/Chellah.png'),
      'fort-rottembourg-fort-herv': require('../../../assets/Monuments/Fort Rottembourg.webp'),
      'lalla-chama': require('../../../assets/Monuments/Lalla Chama.jpg'),
      'mausole-mohammed-v': require('../../../assets/Monuments/Mausolée Mohammed V.jpg'),
      'ncropole-du-chellah': require('../../../assets/Monuments/Nécropole du Chellah.png'),
      'palais-royal-rabat': require('../../../assets/Monuments/Palais Royal Rabat.jpeg'),
      'place-bab-marrakech': require('../../../assets/Monuments/Place Bab Marrakech.png'),
      'ruines-almoravides': require('../../../assets/Monuments/Ruines Almoravides.jpg'),
      'sidi-amro-al-misnawi': require('../../../assets/Monuments/Sidi Amroû al Misnawi.jpg'),
      'sidi-chouada': require('../../../assets/Monuments/Sidi Chouada.jpeg'),
      'sidi-lahsan-al-imam': require('../../../assets/Monuments/Sidi Lahsan al lmam.jpg'),
      'sidi-moulay-abdallah-al-iabouri': require('../../../assets/Monuments/Sidi Moulay Abdallah al labouri.jpg'),
      'sidi-yahya': require('../../../assets/Monuments/Sidi Yahya.jpeg'),
      'tour-hassan': require('../../../assets/Monuments/Tour Hassan.jpg'),
    };

    return imageMap[normalizedPlaceName] || require('../../../assets/images/Logo.png');
  };

  const onViewOnMap = (latitude, longitude) => {
    console.log('Navigating to map with coordinates:', latitude, longitude);
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const onGoToDirections = (latitude, longitude) => {
    console.log('Getting directions to:', latitude, longitude);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error("Failed to get directions:", err));
  };

  // Get screen width and set image height accordingly
  const screenWidth = Dimensions.get('screen').width;
  const imageHeight = screenWidth * 0.5;

  return (
    <View
      style={{
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 15,
        width: screenWidth * 0.9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Image
        source={getImageForMonument(place?.properties?.name)}
        style={{
          width: '100%',
          height: imageHeight,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        resizeMode="cover"
      />
      <View style={{ padding: 15 }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'outfit-medium',
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          {place?.properties?.name}
        </Text>
        <Text
          style={{
            color: 'gray',
            fontFamily: 'outfit-Regular',
            marginBottom: 10,
          }}
        >
          {place?.properties?.address_line2}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 16,
                color: 'darkgray',
              }}
            >
              District
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-Regular',
                color: 'gray',
                marginTop: 5,
              }}
            >
              {place?.properties?.state_district}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#007BFF',
                paddingVertical: 12,
                paddingHorizontal: 18,
                borderRadius: 6,
                marginRight: 10, // Space between buttons
              }}
              onPress={() => onViewOnMap(place?.geometry?.coordinates[1], place?.geometry?.coordinates[0])}
            >
              <FontAwesome name="location-arrow" size={24} color="white" />
              <Text
                style={{
                  color: 'white',
                  marginLeft: 8,
                  fontSize: 16,
                  fontFamily: 'outfit-medium',
                }}
              >
                Browse Online
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#28A745', // Different color for the 'Go' button
                paddingVertical: 12,
                paddingHorizontal: 18,
                borderRadius: 6,
              }}
              onPress={() => onGoToDirections(place?.geometry?.coordinates[1], place?.geometry?.coordinates[0])}
            >
              <FontAwesome name="directions" size={24} color="white" />
              <Text
                style={{
                  color: 'white',
                  marginLeft: 8,
                  fontSize: 16,
                  fontFamily: 'outfit-medium',
                }}
              >
                Go
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
