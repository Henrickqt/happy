import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    marginTop: 16,
    color: '#5C8599',
    fontFamily: 'Nunito_600SemiBold',
    lineHeight: 24,
  },

  mapContainer: {
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
    overflow: 'hidden',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    color: '#0089A5',
    fontFamily: 'Nunito_700Bold',
  },

  separator: {
    width: '100%',
    height: 0.8,
    marginVertical: 40,
    backgroundColor: '#D3E2E6',
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#A1E9C5',
    backgroundColor: '#E6F7FB',
  },

  scheduleItemGreen: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#A1E9C5',
    backgroundColor: '#EDFFF6',
  },

  scheduleItemRed: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#FFBCD4',
    backgroundColor: '#FCF0F4',
  },

  scheduleText: {
    marginTop: 20,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },

  scheduleTextBlue: {
    color: '#5C8599',
  },

  scheduleTextGreen: {
    color: '#37C77F',
  },

  scheduleTextRed: {
    color: '#FF669D',
  },

  contactButton: {
    height: 56,
    borderRadius: 20,
    marginTop: 40,
    backgroundColor: '#3CDC8C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactButtonText: {
    marginLeft: 16,
    color: '#FFFFFF',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
  },
});

export default styles;
