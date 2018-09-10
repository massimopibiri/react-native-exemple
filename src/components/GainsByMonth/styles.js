import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	grey,
	pB,
	h1,
  pM,
	white,
  color1
} from '../../global/variables';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    position: 'relative'
  },
  lines: {
  	width: width / 3,
  	borderBottomColor: grey,
  	borderBottomWidth: 1,
    backgroundColor: 'transparent'
  },
  listItem: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  txtStage: {
  	textAlign: 'center',
  	color: grey,
  	fontSize: pB,
    backgroundColor: 'transparent'
  },
  txtBig: {
  	fontSize: h1,
  	fontWeight: '700',
  	color: white,
    backgroundColor: 'transparent'
  },
  txtSmall: {
  	fontSize: pM,
  	fontWeight: '700',
  	color: grey,
    backgroundColor: 'transparent'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    right: 40
  },
  btnIcon: {
    width: 28,
    height: 28,
  },
  btnIconFlipped: {
    width: 28,
    height: 28,
    transform: [{ rotate: '180deg'}]
  }
});
