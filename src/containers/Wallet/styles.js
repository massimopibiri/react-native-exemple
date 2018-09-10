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
	padTop,
	loading
} from '../../global/variables';

const { width, height } = Dimensions.get('window');
const marginGen = 20;

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flex: 1,
    paddingTop: padTop,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row'
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: marginGen
  },
  headerTxt: {
  	color: white,
  	fontSize: pS,
  	marginTop: -3,
    backgroundColor: 'transparent'
  },
  timer: {
  	color: white,
  	marginTop: 7,
    backgroundColor: 'transparent'
  },
  headerRTxt: {
  	color: white,
  	fontSize: pS,
  	marginTop: -3,
    backgroundColor: 'transparent'
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: marginGen
  },
  fraction: {
  	color: white,
  	fontSize: pB + 2,
  	fontWeight: '700',
  	marginTop: 7,
    backgroundColor: 'transparent'
  },
  chalWarning: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
    width: width
  },
  emptyBoard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  noChals: {
    fontSize: pM,
  	paddingVertical: 30,
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  walletScore: {
    alignSelf: 'center',
    fontSize: 60,
    color: white,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  walletTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: pM,
    color: white,
    lineHeight: 20,
    backgroundColor: 'transparent'
  },
  btn: {
    paddingHorizontal: 35,
    height: 50,
    justifyContent: 'center',
    backgroundColor: color1,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 35
  },
  btnTxt: {
    color: white,
    backgroundColor: 'transparent'
  },
  rankingBox: {
  		marginTop: 55
  },
  title: {
  	color: white,
  	marginLeft: marginGen,
  	marginBottom: 20,
  	fontWeight: '700',
    backgroundColor: 'transparent'
  },
  total: {
  	marginTop: 55,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalTxt: {
  	color: white,
  	fontSize: pB - 1,
    backgroundColor: 'transparent'
  },
  totalBold: {
    fontSize: 45,
    fontWeight: '700',
  	color: white,
    backgroundColor: 'transparent'
  },
  totalSmall: {
    fontSize: pS,
  	color: white,
  	marginTop: -8,
    backgroundColor: 'transparent'
  },
  modalBack: {
    flex: 1
  },
  modalFront: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: white,
    marginVertical: 80,
    marginHorizontal: 40,
    borderRadius: 10,
    position: 'relative',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  modalContent: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  remove: {
      width: 20,
      height: 20
  },
  btnMod: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 20
  },
  advert: {
    fontSize: pS + 1,
    color: black,
    textAlign: 'center',
    lineHeight: 25,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  modalBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  modalTxt: {
    fontSize: pS + 1,
    color: black,
    backgroundColor: 'transparent'
  },
  modalNb: {
    fontSize: pB,
    color: color1,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  itemSplit: {
    borderBottomColor: grey,
    borderBottomWidth: 2,
    alignSelf: 'center',
    paddingVertical: 0,
    width: 65
  },
  modalResult: {
    marginTop: 40,
    fontSize: pM - 1,
    color: black,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  modalResultNb: {
    fontSize: h1 + 30,
    color: color1,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: -15,
    backgroundColor: 'transparent'
  },
  waitingData: {
  	color: white,
    backgroundColor: 'transparent'
  },
  gifBox: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	height: 250
  },
  loading: loading
});
