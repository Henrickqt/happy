import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

import styles from '../../styles/pages/CreateOrphanage/orphanage-data';

interface RouteParams {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

function OrphanageData() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Oooops...', 'Precisamos de sua permissão para acessar as fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.coordinates;
   
    if (
      name.trim() === '' || 
      whatsapp.trim() === '' || 
      about.trim() === '' || 
      instructions.trim() === '' || 
      opening_hours.trim() === '' 
    ) {
      Alert.alert('Oooops...', 'Favor informar todos os dados.');
      return;
    }

    if (images.length < 1) {
      Alert.alert('Oooops...', 'Favor incluir pelo menos uma foto do orfanato.');
      return;
    }

    const data = new FormData();
    
    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('whatsapp', whatsapp);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);

    Alert.alert('Parabéns!', 'Cadastro realizado com sucesso!');

    navigation.navigate('OrphanagesMap');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>
        Dados
      </Text>

      <Text style={styles.label}>
        Nome
      </Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={(text) => setName(text)} 
      />

      <Text style={styles.label}>
        Whatsapp
      </Text>
      <TextInput 
        style={styles.input} 
        maxLength={11} 
        value={whatsapp} 
        onChangeText={(text) => setWhatsapp(text)} 
      />

      <Text style={styles.label}>
        Sobre
      </Text>
      <TextInput 
        style={[styles.input, { height: 110 }]} 
        multiline 
        value={about} 
        onChangeText={(text) => setAbout(text)} 
      />

      <Text style={styles.label}>
        Fotos
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.uploadedImagesContainer} 
      >
        {images.map((image) => {
          return (
            <Image 
              key={image} 
              source={{ uri: image }} 
              style={styles.uploadedImage} 
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity 
        style={styles.imagesInput} 
        onPress={handleSelectImages} 
      >
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>
        Visitação
      </Text>

      <Text style={styles.label}>
        Instruções
      </Text>
      <TextInput 
        style={[styles.input, { height: 110 }]} 
        multiline 
        value={instructions} 
        onChangeText={(text) => setInstructions(text)} 
      />

      <Text style={styles.label}>
        Horário de visitas
      </Text>
      <TextInput 
        style={styles.input} 
        value={opening_hours} 
        onChangeText={(text) => setOpeningHours(text)} 
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>
          Atende final de semana?
        </Text>
        <Switch 
          thumbColor="#FFFFFF" 
          trackColor={{ 
            false: '#CCCCCC', 
            true: '#39CC83',
          }} 
          value={open_on_weekends} 
          onValueChange={(value) => setOpenOnWeekends(value)} 
        />
      </View>

      <RectButton 
        style={styles.nextButton} 
        onPress={handleCreateOrphanage} 
      >
        <Text style={styles.nextButtonText}>
          Cadastrar
        </Text>
      </RectButton>
    </ScrollView>
  );
}

export default OrphanageData;
