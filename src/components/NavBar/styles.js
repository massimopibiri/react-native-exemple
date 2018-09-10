import {
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  pS,
  pB,
  pM,
  h1,
  h3,
  white,
  grey,
  black,
  color1,
  color11,
  color12
} from '../../global/variables';

const height = 60;
const extrWidth = 50;

module.exports = StyleSheet.create({
  container: {
    height: height,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: extrWidth,
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: extrWidth,
    backgroundColor: 'transparent'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent'
  },
  txt: {
    backgroundColor: 'transparent'
  }
});
