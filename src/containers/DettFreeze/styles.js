import {
	StyleSheet,
  Dimensions
} from 'react-native';
import {
	pM,
	white,
	color1,
	h1
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  previewBox: {
    flex: 1
  },
  img: {
		flex: 1,
		resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: height / 10
  },
  btnMod: {
    width: (width / 3) * 2,
    borderRadius: 25,
    paddingVertical: 12,
    backgroundColor: color1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12
  },
  btn: {
    color: white,
    backgroundColor: 'transparent'
  },
  comment: {
  	color: white,
  	fontSize: h1,
  	position: 'absolute',
  	textAlign: 'center',
  	width: width - 40,
  	top: 90,
  	left: 20,
  	lineHeight: 50,
  	fontWeight: '700',
  	backgroundColor: 'transparent'
  }
});
