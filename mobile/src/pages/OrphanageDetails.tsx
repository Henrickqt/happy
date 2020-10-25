import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Image, Linking, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import api from '../services/api';

import mapMarker from '../images/map-marker.png';

import styles from '../styles/pages/orphanage-details';

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface RouteParams {
  id: number;
}

function OrphanageDetail() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const route = useRoute();

  const params = route.params as RouteParams;

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  function handleGetDirectionsViaGMaps() {
    Linking.openURL(`https://google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`);
  }

  function handleGetInTouchViaWhatsapp() {
    Linking.openURL(`whatsapp://send?text=Olá,%20tenho%20interesse%20em%20visitá-los!&phone=+55${orphanage?.whatsapp}`);
  }

  if (!orphanage) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={styles.description}>
          Carregando...
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map((image) => {
            return (
              <Image 
                key={image.id} 
                style={styles.image} 
                source={{ uri: image.url }} 
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          {orphanage.name}
        </Text>
        <Text style={styles.description}>
          {orphanage.about}
        </Text>

        <View style={styles.mapContainer}>
          <MapView 
            style={styles.mapStyle} 
            provider={PROVIDER_GOOGLE} 
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false} 
            pitchEnabled={false} 
            scrollEnabled={false} 
            rotateEnabled={false} 
          >
            <Marker 
              icon={mapMarker} 
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }} 
            />
          </MapView>

          <RectButton 
            style={styles.routesContainer} 
            onPress={handleGetDirectionsViaGMaps} 
          >
            <Text style={styles.routesText}>
              Ver rotas no Google Maps
            </Text>
          </RectButton>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>
          Instruções para visita
        </Text>
        <Text style={styles.description}>
          {orphanage.instructions}
        </Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta {orphanage.opening_hours}
            </Text>
          </View>
          {orphanage.open_on_weekends 
            ? (
              <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                <Feather name="info" size={40} color="#39CC83" />
                <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                  Atendemos fim de semana
                </Text>
              </View>
            )
            : (
              <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                <Feather name="info" size={40} color="#FF669D" />
                <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                  Não atendemos fim de semana
                </Text>
              </View>
            )
          }
        </View>

        <RectButton 
          style={styles.contactButton} 
          onPress={handleGetInTouchViaWhatsapp} 
        >
          <FontAwesome name="whatsapp" size={24} color="#FFFFFF" />
          <Text style={styles.contactButtonText}>
            Entrar em contato
          </Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

export default OrphanageDetail;
