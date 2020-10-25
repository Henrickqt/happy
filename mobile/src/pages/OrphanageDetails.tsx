import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';

import styles from '../styles/pages/orphanage-details';

function OrphanageDetail() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
          <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
          <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          Orf. Esperança
        </Text>
        <Text style={styles.description}>
          Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.
        </Text>

        <View style={styles.mapContainer}>
          <MapView 
            style={styles.mapStyle} 
            provider={PROVIDER_GOOGLE} 
            initialRegion={{
              latitude: -21.2284996,
              longitude: -45.0093355,
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
                latitude: -21.2284996,
                longitude: -45.0093355,
              }} 
            />
          </MapView>

          <View style={styles.routesContainer}>
            <Text style={styles.routesText}>
              Ver rotas no Google Maps
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>
          Instruções para visita
        </Text>
        <Text style={styles.description}>
          Venha como se sentir a vontade e traga muito amor e paciência para dar.
        </Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta 8h às 18h
            </Text>
          </View>
          {1==1 
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

        <RectButton style={styles.contactButton} onPress={() => {}}>
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
