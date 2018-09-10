import {
	StyleSheet,
	Dimensions,
  Platform
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
	color12
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const marginGen = 30;

module.exports = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingLeft: marginGen,
    paddingRight: marginGen,
    height: 300
  },
  choice: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  choiceTxt: {
  	flex: 1,
  	color: white,
    backgroundColor: 'transparent'
  },
  choiceSwitch: {
  	transform: Platform.OS === 'ios' ? [{scaleX: 1}, {scaleY: 1}] : [{scaleX: 1.5}, {scaleY: 1.5}]
  }
});
