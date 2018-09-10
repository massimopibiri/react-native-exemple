import {
	StyleSheet
} from 'react-native';
import {
	pB,
	white
} from '../../global/variables';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 50,
    alignItems: 'stretch'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 40,
    marginBottom: 30
  },
  listTxt: {
    fontSize: pB,
    color: white,
    fontWeight: '400',
    backgroundColor: 'transparent'
  },
  img: {
  	width: 25,
  	height: 25,
  	marginRight: 10
  },
  separated: {
  	flex: 1,
  	marginTop: 30,
  	justifyContent: 'center',
  	alignItems: 'stretch'
  }
});
