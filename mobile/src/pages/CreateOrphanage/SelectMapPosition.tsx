import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../../images/map-marker.png';

import styles from '../../styles/pages/CreateOrphanage/select-map-position';

function SelectMapPosition() {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const navigation = useNavigation();

  function handleMapSelect(event: MapEvent) {
    setCoordinates(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('OrphanageData', { coordinates });
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapStyle} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: -21.2284996,
          longitude: -45.0093355,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
        onPress={handleMapSelect} 
      >
        {coordinates.latitude !== 0 && coordinates.longitude !== 0 && (
          <Marker 
            icon={mapMarker} 
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }} 
          />
        )}
      </MapView>

      {coordinates.latitude !== 0 && coordinates.longitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>
            Próximo
          </Text>
        </RectButton>
      )}
    </View>
  );
}

export default SelectMapPosition;
