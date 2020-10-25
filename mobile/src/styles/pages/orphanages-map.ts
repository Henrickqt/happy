import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',

    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089A5',
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    height: 56,
    borderRadius: 20,
    paddingLeft: 24,
    backgroundColor: '#FFFFFF',
    elevation: 4,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#15C3D6',

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
