import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	white,
	pM
} from '../../global/variables';

const { width, height } = Dimensions.get('window');
const margin = 60;

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  previewBox: {
    flex: 1
  },
  toogleBtn: {
    position: 'absolute',
    bottom: 60,
    left: 60,
    width: 40,
    height: 40
  },
  validBtn: {
    position: 'absolute',
    bottom: 50,
    right: 40,
    width: 75,
    height: 75
  },
  textArea: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    opacity: 0.8,
    paddingHorizontal: 10,
    color: white,
    height: 50,
    fontSize: pM
  }
});
