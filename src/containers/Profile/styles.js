import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	white,
	pM,
	pB,
	h1,
	h3,
	padTop,
	loading
} from '../../global/variables';

const { width } = Dimensions.get('window');
const themeIconWidth = 48;
const picture = 115;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padTop,
    paddingBottom: 50
  },
  scrollView: {
    alignSelf: 'stretch'
  },
  profileBox: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 30
  },
  profileHeader: {
  	position: 'relative',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  headerLeft: {
  	position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 120,
    top: 0,
    left: 20
  },
  headerLeftTxt1: {
  	color: white,
  	fontSize: pB,
    backgroundColor: 'transparent'
  },
  headerLeftTxt2: {
  	color: white,
  	fontSize: h1,
  	fontWeight: '700',
  	marginTop: 10,
  	marginBottom: -7,
    backgroundColor: 'transparent'
  },
  headerLeftTxt3: {
  	color: white,
  	fontSize: pM,
    backgroundColor: 'transparent'
  },
  headerRight: {
  	position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: 160,
    top: 0,
    right: 20
  },
  headerRightTxt1: {
  	color: white,
  	fontSize: pB,
  	textAlign: 'right',
    backgroundColor: 'transparent'
  },
  headerRightTxt2: {
  	color: white,
  	fontSize: h1,
  	fontWeight: '700',
  	marginTop: 10,
  	marginBottom: -7,
    backgroundColor: 'transparent'
  },
  picture: {
    width: picture,
    height: picture,
    borderRadius: picture / 2,
    borderWidth: 6,
    borderColor: white,
    alignSelf: 'center',
    marginTop: 60,
    backgroundColor: 'transparent'
  },
  name: {
    fontSize: h3 - 1,
    color: white,
    fontWeight: '700',
    marginTop: 10,
    paddingBottom: 5,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  company: {
    fontSize: h1 + 2,
    alignSelf: 'center',
    color: white,
    fontWeight: '300',
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  company2: {
    fontSize: h1 + 4,
    color: white,
    alignSelf: 'center',
    fontWeight: '300',
    backgroundColor: 'transparent'
  },
  gainsBox: {
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  themesContent: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    backgroundColor: 'transparent'
  },
  listDataBox: {
    height: 200,
    backgroundColor: 'orange',
    marginBottom: 35,
    backgroundColor: 'transparent'
  },
  titleStats: {
  	fontSize: pM,
  	color: white,
  	fontWeight: '700',
  	marginLeft: 20,
  	marginTop: 50,
  	marginBottom: 30,
    backgroundColor: 'transparent'
  },
  gifBox: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	height: 250
  },
  loading: loading
});
