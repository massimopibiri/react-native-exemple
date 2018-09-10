import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pS,
	pB,
	pM,
	h1,
	white,
	color1,
	padTop,
	grey,
	black
} from '../../global/variables';

const { width, height } = Dimensions.get('window');
const marginGen = 20;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: padTop,
    paddingHorizontal: marginGen
  },
  resume: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 15
  },
  resume_p: {
    fontSize: pB,
    color: white,marginTop: -3,
    backgroundColor: 'transparent'
  },
  resume_h: {
    fontSize: 60,
    fontWeight: '700',
    color: white,
    backgroundColor: 'transparent'
  },
  title: {
    paddingTop: 25,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title2: {
    paddingTop: 25,
    paddingBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  chalWarning: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    paddingTop: 25,
    paddingHorizontal: 15
  },
  emptyBoard: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  noChals: {
    fontSize: pM,
  	paddingVertical: 30,
  	paddingHorizontal: 15,
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  txtSections: {
  	fontSize: pS,
  	color: white,
    backgroundColor: 'transparent'
  },
  btn: {
    backgroundColor: color1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 35
  },
  btnBgt: {
    backgroundColor: grey,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 35
  },
  btnTxt: {
    color: white,
    backgroundColor: 'transparent'
  },
  btnTxtBgt: {
    color: black,
    backgroundColor: 'transparent'
  }
});
