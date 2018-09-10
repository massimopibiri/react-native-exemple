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
	color11,
	color12
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const picture = 75;
const marginGen = 30;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopColor: grey,
    borderTopWidth: 1,
    borderBottomColor: grey,
    borderBottomWidth: 1,
  },
  imgBox: {
    height: picture,
    width: picture,
    alignSelf: 'flex-start',
    marginLeft: marginGen,
    borderRadius: picture / 2,
    borderColor: color12,
    borderWidth: 4
  },
  img: {
  	flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
    borderRadius: picture / 2
  },
  txtProfile: {
  	flex: 1,
    textAlign: 'left',
    color: white,
    fontSize: pS,
    marginLeft: 10,
    marginRight: 40,
    backgroundColor: 'transparent'
  },
  btnProfile: {
    backgroundColor: color1,
    height: 50,
    justifyContent: 'center',
    borderColor: color1,
    borderWidth: 4,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginRight: 30,
    alignItems: 'center'
  },
  btnProfileTxt: {
  	color: white,
    backgroundColor: 'transparent'
  },
  inputs: {
    backgroundColor: 'white',
    margin: 10,
    height: 45,
    borderRadius: 5
  }
});
