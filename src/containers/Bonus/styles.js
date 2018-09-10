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
	color12,
	padTop
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const logoWidth = 190;
const spotWidth = 35;
const thunderWidth = 55;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: padTop
  },
  header: {
  	alignItems: 'stretch',
  	justifyContent: 'center',
  	paddingVertical: 20
  },
  icon: {
  	alignSelf: 'center',
  	width: logoWidth,
  	height: logoWidth,
  	borderRadius: logoWidth / 2
  },
  h1: {
  	alignSelf: 'center',
  	fontSize: h1 + 2,
  	marginTop: 20,
  	color: white,
    backgroundColor: 'transparent'
  },
  p1: {
  	alignSelf: 'center',
  	fontSize: pB,
  	marginTop: 20,
  	color: white,
  	textAlign: 'center',
  	marginHorizontal: 30,
    backgroundColor: 'transparent'
  },
  p1Bold: {
  	fontWeight: '700'
  },
  p2: {
  	alignSelf: 'center',
  	fontSize: 45,
  	fontWeight: '700',
  	color: white,
  	marginTop: -8,
    backgroundColor: 'transparent'
  },
  p3: {
  	alignSelf: 'center',
  	fontSize: pB,
  	fontWeight: '400',
  	marginTop: -13,
  	color: white,
    backgroundColor: 'transparent'
  },
  body: {
  	paddingHorizontal: 20,
  	alignItems: 'stretch',
  	justifyContent: 'center'
  },
  row: {
  	flexDirection: 'row',
  	paddingVertical: 15
  },
  left: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  center: {
  	flex: 4,
  	alignItems: 'flex-start',
  	justifyContent: 'center'
  },
  right: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  title: {
  	color: white,
  	fontSize: pM,
    backgroundColor: 'transparent'
  },
  spot: {
  	width: spotWidth,
  	height: spotWidth,
  	borderRadius: spotWidth / 2,
  	backgroundColor: color1,
  	borderColor: grey,
  	borderWidth: 2,
  	padding: 5
  },
  spotN: {
  	width: spotWidth,
  	height: spotWidth,
  	borderRadius: spotWidth / 2,
  	backgroundColor: grey,
  	borderColor: grey,
  	borderWidth: 2
  },
  valueV: {
  	fontSize: h1 + 2,
  	color: white,
  	fontWeight: '700',
    backgroundColor: 'transparent'
  },
  valueT: {
  	fontSize: pS - 2,
  	color: white,
  	marginTop: -8,
    backgroundColor: 'transparent'
  },
  footer: {
  	height: 290,
  	paddingHorizontal: 20,
  	alignItems: 'stretch',
  	justifyContent: 'center',
  	position: 'relative',
  	marginTop: 35
  },
  blurFooter: {
  	position: 'absolute',
  	top: 0,
  	left: 0,
  	width: width,
  	height: 310,
  	backgroundColor: black,
  	opacity: 0.2
  },
  iconFooter: {
  	width: thunderWidth,
  	height: thunderWidth,
  	padding: 10,
  	backgroundColor: grey,
  	borderRadius: thunderWidth / 2,
  	alignSelf: 'center'
  },
  raccomandations: {
  	alignItems: 'center',
  	justifyContent: 'center'
  }
});
