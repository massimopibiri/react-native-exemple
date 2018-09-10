import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	white,
	pS,
  color1,
  color7,
  pM,
  pXS,
  greyDark
} from '../../global/variables';

const imgWidth = 52;
const iconThemeSize = 26;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 15
  },
  innerBox: {
  	flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  	marginHorizontal: 10,
    paddingVertical: 17,
  	backgroundColor: white,
    paddingHorizontal: 10
  },
  iconTheme: {
  	position: 'absolute',
  	top: -6,
  	left: 10,
  	width: iconThemeSize,
  	height: iconThemeSize,
  	borderRadius: iconThemeSize / 2,
  	zIndex: 3,backgroundColor: 'green'

  },
  img: {
    width: imgWidth,
    height: imgWidth,
    borderWidth: 4,
    borderColor: '#c9c6bf',
    borderRadius: imgWidth / 2
  },
  image: {
  	flex: 1,
    width: null,
    height: null,
    borderRadius: imgWidth / 2,
    resizeMode: 'cover'  
  },
  imageIcon: {
  	flex: 1,
    width: null,
    height: null,
    borderRadius: iconThemeSize / 2,
    resizeMode: 'cover'
  },
  listBox: {
    flex: 1,
    position: 'relative'
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  freezeTitle: {
    fontWeight: '700',
    fontSize: pS,
    color: color7,
    backgroundColor: 'transparent'
  },
  txt: {
    fontWeight: '300',
    fontSize: pS + 1,
    marginLeft: 10
  },
  txtTime: {
    fontWeight: '700',
    fontSize: pXS,
    marginLeft: 10,
    marginBottom: 5,
    color: greyDark,
    paddingLeft: 30
  },
  txtTimeNoIcon: {
    fontWeight: '700',
    fontSize: pXS,
    marginLeft: 10,
    marginBottom: 5,
    color: greyDark
  },
  bold: {
    fontWeight: '700',
    fontSize: pS + 1,
    marginLeft: 10
  },
  titleSuspect: {
    flex: 1,
    fontWeight: '300',
    fontSize: pS + 1,
    marginLeft: 10
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: color1,
    borderRadius: 25
  },
  btnTxt: {
    fontSize: pM,
    color: white,
    backgroundColor: 'transparent'
  },
  txtClickable: {
    fontSize: pXS,
    marginTop: 10,
    color: color1,
    fontWeight: '700',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    textAlign: 'right'
  }
});
