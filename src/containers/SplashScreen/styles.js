import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	loading
} from '../../global/variables';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    flex: 1
  },
  loading: loading
});
