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

const marginGen = 20;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: padTop
  },
  title: {
    fontSize: pS,
    color: white,
    backgroundColor: 'transparent'
  },
  btnUpdate: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  toogle: {
    backgroundColor: grey,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnBox: {
    height: 90,
    paddingRight: marginGen,
    paddingLeft: marginGen
  },
  pswBox: {
  	paddingHorizontal: marginGen,
  	paddingTop: 20,
  	paddingBottom: 10,
    borderBottomColor: white,
    borderBottomWidth: 1
  },
  pswInnerBox: {
  	flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15
  },
  inputs: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 25,
    paddingLeft: 15,
    fontWeight: '700',
    fontSize: pS
  },
  btn: {
    backgroundColor: color1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderRadius: 25,
    marginLeft: 20
  },
  btnTxt: {
    fontSize: pM,
    color: white,
    backgroundColor: 'transparent'
  },
  parBox: {
  	alignItems: 'stretch',
  	justifyContent: 'center'
  },
  suggestionsBox: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  title2: {
    fontSize: pS,
    color: white,
    marginBottom: 10,
    backgroundColor: 'transparent'
  },
  textarea: {
    flex: 1,
    backgroundColor: white,
    marginVertical: 30,
    borderRadius:25,
    color: color1,
    fontSize: pS,
    paddingHorizontal: 20,
    height: 100
  },
  btn2: {
    backgroundColor: color1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderRadius: 25
  },
  navBox: {
  	flexDirection: 'row',
  	justifyContent: 'flex-start',
  	alignItems: 'center',
  	paddingHorizontal: marginGen,
  	height: 70,
  	borderBottomColor: grey,
  	borderBottomWidth: 1
  },
  title3: {
    fontSize: pS,
    color: white,
    flex: 1,
    backgroundColor: 'transparent'
  },
  navIcon: {
  	width: 20,
  	height: 20,
  	transform: [{ rotate: '180deg'}]
  }
});
