import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,

    height: 56,
    borderRadius: 20,
    backgroundColor: '#15C3D6',

    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
  },
});

export default styles;
