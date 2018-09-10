import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pS,
	white,
	h3,
	pB,
	color7,
	pM
} from '../../global/variables';

const { width, height } = Dimensions.get('window');
const btn = 70;

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraBox: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: height,
    width: width
  },
  capture: {
    width: btn,
    height: btn,
    borderRadius: btn / 2,
    borderColor: white,
    borderWidth: 6,
    opacity: 0.6,
    marginBottom: 30
  }
});
