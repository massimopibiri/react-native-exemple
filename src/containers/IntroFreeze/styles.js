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

const { width } = Dimensions.get('window');
const btn = 250;

module.exports = StyleSheet.create({
  total: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: btn,
    height: btn,
    borderRadius: btn / 2,
    backgroundColor: white,
    marginTop: 60
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: btn,
    height: btn,
    borderRadius: btn / 2,
    backgroundColor: white,
    marginTop: 30
  },
  icon: {
  	width: (btn / 10) * 4,
  	height: (btn / 10) * 4,
  	resizeMode: 'contain'
  },
  chalWarning: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    width: width,
    paddingTop: 25,
    marginTop: 70
  },
  emptyBoard: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  noChals: {
    fontSize: pM,
    paddingVertical: 30,
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
});
