import {
	StyleSheet
} from 'react-native';
import {
	pS,
	pB,
	pM,
	h1,
	h2,
	white,
	color12,
	color2,
	grey,
	black,
	color1
} from '../../global/variables';

const marginGen = 20;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingBottom: 53,
    justifyContent: 'center'
  },
  listItem: {
  	height: 95,
  	borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
    paddingHorizontal: 40,
  },
  listSelected: {
  	height: 95,
  	borderRadius: 15,
    marginVertical: 10,
    borderColor: color2,
    borderWidth: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
    paddingHorizontal: 40,
  },
  listContent: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  img: {
  	width: 70,
  	height: 70
  },
  date: {
  	fontSize: pS,
  	fontWeight: '300',
  	color: black,
    backgroundColor: 'transparent'
  },
  price: {
  	fontSize: h1,
  	fontWeight: '700',
  	color: black,
    backgroundColor: 'transparent'
  }
});
