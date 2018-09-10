import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	white,
	grey,
	color1,
	color2,
	pM,
	black,
	padTop
} from '../../global/variables';

const { width } = Dimensions.get('screen');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padTop
  },
  choiceBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
  	color: white,
  	paddingTop: 20,
  	paddingBottom: 10,
  	fontSize: pM,
  	textAlign: 'center',
    backgroundColor: 'transparent'
  },
  singleChoice: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width < 500 ? width - 60 : 400,
  	backgroundColor: white,
  	alignSelf: 'center',
  	marginVertical: 10,
  	paddingVertical: 15,
  	paddingHorizontal: 30,
  	borderRadius: 8
  },
  choiceSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width < 500 ? width - 60 : 400,
  	backgroundColor: white,
  	alignSelf: 'center',
  	marginVertical: 10,
  	paddingVertical: 15,
  	paddingHorizontal: 30,
  	borderRadius: 8,
  	borderColor: color2,
  	borderWidth: 4
  },
  txtChoice: {
  	textAlign: 'center',
  	fontSize: pM,
  	fontWeight: '400',
  	lineHeight: 30,
  	color: black,
  	backgroundColor: 'transparent'
  },
  textArea: {
    alignItems: 'flex-start',
    backgroundColor: white,
    marginHorizontal: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
    color: black,
    fontSize: pM,
    height: 150
  },
  sendBtn: {
    backgroundColor: color1,
    width: width < 500 ? width - 60 : 400,
    alignSelf: 'center',
    marginTop: 30,
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  sendBtnDis: {
    backgroundColor: grey,
    width: width < 500 ? width - 60 : 400,
    alignSelf: 'center',
    marginTop: 30,
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  sendBtnTxt: {
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  sendBtnTxtDis: {
    color: black,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});
