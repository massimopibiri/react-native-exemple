import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pM,
	white,
	black,
	color1,
	color12,
	padTop
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const imgDimension = 150;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padTop
  },
  top: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  previewBox: {
  	width: imgDimension,
  	height: imgDimension,
  	borderRadius: imgDimension / 2,
  	borderColor: color12,
  	borderWidth: 6
  },
  image: {
  	flex: 1,
    width: null,
    height: null,
    borderRadius: (imgDimension / 2) - 2,
    resizeMode: 'cover'
  },
  bottom: {
  	height: 170,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  btn: {
  	backgroundColor: color1,
  	height: 50,
  	borderRadius: 25,
  	paddingHorizontal: 25,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  btnTxt: {
  	color: white
  }
});
