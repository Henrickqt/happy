import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../../images/map-marker.png';

import styles from '../../styles/pages/CreateOrphanage/select-map-position';

function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('OrphanageData');
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
      >
        <Marker 
          icon={mapMarker} 
          coordinate={{
            latitude: -21.2284996,
            longitude: -45.0093355,
          }} 
        />
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>
          Próximo
        </Text>
      </RectButton>
    </View>
  );
}

export default SelectMapPosition;
