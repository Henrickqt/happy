import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from '../styles/components/header';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

function Header({ title, showCancel = true }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBackToPreviousScreen() {
    navigation.goBack();
  }

  function handleGoBackToOrphanagesMap() {
    navigation.navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={handleGoBackToPreviousScreen}>
        <Feather name="arrow-left" size={24} color="#15B6D6" />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {showCancel 
        ? (
          <BorderlessButton onPress={handleGoBackToOrphanagesMap}>
            <Feather name="x" size={24} color="#FF669D" />
          </BorderlessButton>
        )
        : (
          <View />
        )
      }
    </View>
  );
}

export default Header;
