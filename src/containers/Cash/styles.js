import {
	StyleSheet
} from 'react-native';
import {
	pM,
	pS,
	h3,
	white,
	padTop,
	loading
} from '../../global/variables';

const marginGen = 30;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'brown',
    paddingTop: padTop,
    backgroundColor: 'transparent'
  },
  header: {
  	paddingVertical: 20,
  	flexDirection: 'row',
    marginBottom: 30
  },
  headerLeft: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
  },
  headerLeftTxt: {
  	color: white,
  	alignSelf: 'flex-start',
  	marginLeft: marginGen,
  	fontSize: pS,
    backgroundColor: 'transparent'
  },
  timer: {
  	color: white,
  	alignSelf: 'flex-start',
  	marginLeft: marginGen,
    backgroundColor: 'transparent'
  },
  headerRight: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  headerRightTxt: {
  	color: white,
  	alignSelf: 'flex-end',
  	marginRight: marginGen,
  	fontSize: pS,
    backgroundColor: 'transparent'
  },
  currentStage: {
  	color: white,
  	alignSelf: 'flex-end',
  	marginRight: marginGen,
  	fontSize: h3,
    backgroundColor: 'transparent'
  },
  gifBox: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	height: 250
  },
  loading: loading
});
