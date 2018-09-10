import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	white,
	grey
} from '../../global/variables';

const { width } = Dimensions.get('window');
const sizeItem = 50;

module.exports = StyleSheet.create({
  container: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: sizeItem,
    backgroundColor: white,
    width: width
  },
  item: {
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  icon: {
  	width: sizeItem - 10,
  	height: sizeItem - 10,
  	resizeMode: 'contain'
  },
  iconThunder: {
  	width: (sizeItem - 10),
  	height: (sizeItem - 10),
  	padding: 10,
  	backgroundColor: grey,
  	borderRadius: (sizeItem - 10) / 2,
  	alignSelf: 'center',
  	marginHorizontal: 80
  },
});
