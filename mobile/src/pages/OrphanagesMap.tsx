import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import api from '../services/api';

import mapMarker from '../images/map-marker.png';

import styles from '../styles/pages/orphanages-map';

interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE} 
        style={styles.map} 
        initialRegion={{
          latitude: -21.2284996,
          longitude: -45.0093355,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
      >
        {orphanages.map((orphanage) => {
          return (
            <Marker 
              key={orphanage.id} 
              icon={mapMarker} 
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }} 
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }} 
            >
              <Callout 
                tooltip 
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)} 
              >
                <View style={styles.calloutContainer}>
                  <Text style = {styles.calloutText}>
                    {orphanage.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {`${orphanages.length} ${orphanages.length === 1 ? 'orfanato encontrado' : 'orfanatos encontrados'}`}
        </Text>
        <RectButton 
          style={styles.createOrphanageButton} 
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </RectButton>
      </View>
    </View>
  );
}

export default OrphanagesMap;
