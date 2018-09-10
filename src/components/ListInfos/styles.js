import {
	StyleSheet,
  Dimensions
} from 'react-native';
import {
	pS,
	pB,
	pM,
	h3,
	white,
	grey,
	color1,
  color2
} from '../../global/variables';

const { width } = Dimensions.get('screen');
const marginGen = 20;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'stretch',
    justifyContent: 'center',
    borderTopColor: grey,
    borderTopWidth: 1
  },
  board: {
  	justifyContent: 'center',
  	alignItems: 'center',
    height: 80,
    position: 'relative'
  },
  btnBlur: {
    height: 80,
    width: width,
    backgroundColor: color2,
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    left: 0
  },
  title: {
  	fontSize: h3,
  	fontWeight: '700',
  	color: white,
    backgroundColor: 'transparent'
  },
  content: {
  	paddingHorizontal: 20,
    paddingBottom: 30
  },
  itemContent: {
  	alignItems: 'stretch',
  	justifyContent: 'center'
  },
  titleContent: {
  	fontSize: pB,
  	fontWeight: '700',
    color: white,
    marginVertical: 20,
    backgroundColor: 'transparent'
  },
  txtContent: {
    fontSize: pB,
    color: white,
    backgroundColor: 'transparent'
  }
});
