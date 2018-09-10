import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pB,
	white,
	h3,
	padTop
} from '../../global/variables';

const { width } = Dimensions.get('screen');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: padTop,
    paddingBottom: 53
  },
  itemWrapper: {
  	position: 'relative'
  },
  backBlur: {
  	position: 'absolute',
  	height: 100,
  	width: width,
  	backgroundColor: white,
  	opacity: 0.3
  },
  item: {
    alignItems: 'stretch',
    height: 100,
    marginTop: 1,
    borderTopColor: white,
    borderTopWidth: 1,
  	justifyContent: 'center'
  },
  icon: {
  	width: 25,
  	height: 25,
  	position: 'absolute',
  	top: 38,
  	right: 30
  },
  iconFliped: {
  	width: 25,
  	height: 25,
  	position: 'absolute',
  	top: 38,
  	right: 30,
  	transform: [{ rotate: '180deg'}]
  },
  txt: {
  	fontSize: h3,
  	fontWeight: '700',
  	color: white,
    backgroundColor: 'transparent'
  },
  subItem: {
  	marginVertical: 1,
  	paddingVertical: 30,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  subTxt: {
  	fontSize: pB,
  	fontWeight: '300',
  	color: white,
    backgroundColor: 'transparent'
  },
});
