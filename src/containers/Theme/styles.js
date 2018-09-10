import {
	StyleSheet
} from 'react-native';
import {
	pM,
	white,
	padTop
} from '../../global/variables';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: padTop
  },
  warn: {
  	color: white,
  	fontSize: pM,
  	textAlign: 'center',
  	paddingHorizontal: 30,
  	paddingVertical: 30,
  	backgroundColor: 'transparent'
  }
});
