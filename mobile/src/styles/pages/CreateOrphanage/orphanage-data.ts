import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
    marginBottom: 32,
    paddingBottom: 24,
    color: '#5C8599',
    fontFamily: 'Nunito_700Bold',
    fontSize: 24,
  },

  label: {
    marginBottom: 8,
    color: '#8FA7B3',
    fontFamily: 'Nunito_600SemiBold',
  },

  input: {
    height: 56,
    borderWidth: 1.4,
    borderColor: '#D3E2E6',
    borderRadius: 20,
    marginBottom: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },

  imagesInput: {
    height: 56,
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    
    alignItems: 'center',
    justifyContent: 'center',
  },

  switchContainer: {
    marginTop: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nextButton: {
    height: 56,
    borderRadius: 20,
    marginTop: 32,
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
