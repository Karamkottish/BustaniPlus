import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2A1D', // deep green (Vision 2030 eco tone)
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  sky: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '60%',
    backgroundColor: '#1E7F5C', // fresh agriculture green
  },

  soil: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: '#4A2F1B', // soil brown
  },

  logo: {
    width: 280,
    height: 280,
    zIndex: 10,
  },
});
