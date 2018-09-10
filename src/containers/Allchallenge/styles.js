import {
	StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import {
	pS,
	pM,
	white,
	padTop
} from '../../global/variables';

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padTop
  },
  tagsBox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabsItem: {
    flex: 1,
    alignItems: 'stretch',
    paddingBottom: 15
  },
  selectedTabsItem: {
    flex: 1,
    alignItems: 'stretch',
    borderColor: 'purple',
  	borderBottomWidth: 2,
  	borderBottomColor: white,
  	paddingBottom: 15
  },
  tabsText: {
    alignSelf: 'center',
    fontSize: pM,
    color: white,
    backgroundColor: 'transparent'
  },
  selectedTabsText: {
    alignSelf: 'center',
    fontSize: pM,
    color: white,
    fontWeight: '400',
    backgroundColor: 'transparent'
  },
  boxfiltre: {
  	flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
  	paddingHorizontal: 30
  },
  filtreLeft: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'flex-start',
  	alignItems: 'center'
  },
  switchbtn: {
  	transform: Platform.OS === 'ios' ? [{scaleX: 1}, {scaleY: 1}] : [{scaleX: 1.5}, {scaleY: 1.5}]
  },
  switchTxt: {
  	color: white,
  	fontSize: pM,
  	marginLeft: 15,
    backgroundColor: 'transparent'
  },
  chalWarning: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    width: width,
    paddingTop: 25
  },
  emptyBoard: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  noChals: {
    fontSize: pM,
    paddingVertical: 30,
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});
