import { View, FlatList, Dimensions } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import PlaceItem from './PlaceItem';
import SelectMarkerContext from '@/app/Context/SelectMarkerContext';

export default function PlaceListView({ places }) {
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

  useEffect(() => {
    if (places.length > 0 && selectedMarker !== null) {
      scrollToIndex(selectedMarker);
    }
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    if (flatListRef.current && places.length > index) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  });

  return (
    <View>
      <FlatList
        data={places}
        horizontal
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <PlaceItem place={item} />
          </View>
        )}
      />
    </View>
  );
}
