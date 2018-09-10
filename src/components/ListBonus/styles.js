import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pM,
	white,
	black,
	grey,
	pB,
	h1,
	h3,
	color1,
	color12
} from '../../global/variables';

const { width } = Dimensions.get('screen');

const checkWidth = 100;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  listItem: {
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    position: 'relative'
  },
  checkedImg: {
  	width: checkWidth,
  	height: checkWidth,
  	borderRadius:checkWidth / 2,
  	position: 'absolute',
  	top: 0,
  	left: (width / 2) - (checkWidth / 2),
  	zIndex: 10
  },
  itemInner: {
  	backgroundColor: white,
  	borderRadius: 15,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderColor: color12,
    borderWidth: 3,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 10
  },
  itemInnerN: {
  	backgroundColor: 'rgba(200, 200, 200, 0.2)',
  	borderRadius: 15,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderColor: color12,
    borderWidth: 3,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 10
  },
  itemTitle: {
  	paddingBottom: 10,
  	borderBottomColor: grey,
  	color: black,
  	fontSize: pM,
  	fontWeight: '700',
  	marginTop: 30,
  	borderBottomWidth: 2,
  	alignSelf: 'center',
  	paddingHorizontal: 20,
    backgroundColor: 'transparent'
  },
  itemTitleN: {
  	paddingBottom: 10,
  	borderBottomColor: white,
  	fontSize: pM,
  	fontWeight: '700',
  	marginTop: 30,
  	borderBottomWidth: 2,
  	alignSelf: 'center',
  	paddingHorizontal: 20,
  	color: white,
    backgroundColor: 'transparent'
  },
  mainItem: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  coins: {
  	width: 80,
  	height: 80,
  },
  itemStatus: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'flex-start',
  	paddingLeft: 20
  },
  statusTxt1: {
  	fontSize: 42,
  	fontWeight: '700',
  	color: color1,
    backgroundColor: 'transparent'
  },
  statusTxt1N: {
  	fontSize: 42,
  	fontWeight: '700',
  	color: white,
    backgroundColor: 'transparent'
  },
  statusTxt2: {
  	fontSize: 28,
  	fontWeight: '700',
  	color: color1,
  	marginTop: -15,
    backgroundColor: 'transparent'
  },
  statusTxt2N: {
  	fontSize: 28,
  	fontWeight: '700',
  	marginTop: -15,
  	color: white,
    backgroundColor: 'transparent'
  },
  itemSplit: {
  	borderBottomColor: black,
  	borderBottomWidth: 1,
  	alignSelf: 'center',
  	paddingVertical: 10,
  	width: 120
  },
  itemSplitN: {
  	borderBottomColor: white,
  	borderBottomWidth: 1,
  	alignSelf: 'center',
  	paddingVertical: 10,
  	width: 120
  },
  status: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 5
  },
  addBold: {
  	fontWeight: '700',
  	fontSize: pB + 4
  },
  howmany: {
  	fontSize: pB + 2,
  	fontWeight: '400',
  	alignSelf: 'center',
  	textAlign: 'center',
  	paddingTop: 20,
  	paddingBottom: 20,
  	marginHorizontal: 60
  },
  howmanyN: {
  	fontSize: pB + 2,
  	fontWeight: '400',
  	alignSelf: 'center',
  	textAlign: 'center',
  	paddingTop: 20,
  	paddingBottom: 20,
  	marginHorizontal: 60,
  	color: white,
    backgroundColor: 'transparent'
  },
  howmanyObjective: {
  	fontSize: pM,
  	fontWeight: '400',
  	alignSelf: 'center',
  	textAlign: 'center',
  	marginHorizontal: 60
  },
  howmanyObjectiveN: {
  	fontSize: pM,
  	fontWeight: '400',
  	alignSelf: 'center',
  	textAlign: 'center',
  	marginHorizontal: 60,
  	color: white,
    backgroundColor: 'transparent'
  },
  big: {
  	fontSize: h1,
  	fontWeight: '700'
  },
  addColor: {
  	color: color1,
    backgroundColor: 'transparent'
  },
  link: {
  	marginTop: 15,
  	alignSelf: 'center',
  	fontSize: 20,
  	borderBottomColor: 'black',
  	borderBottomWidth: 2,
  	paddingBottom: 3
  },
  linkN: {
  	marginTop: 15,
  	alignSelf: 'center',
  	color: 'white',
  	fontSize: 20,
  	borderBottomColor: 'white',
  	borderBottomWidth: 2,
  	paddingBottom: 3,
    backgroundColor: 'transparent'
  }
});