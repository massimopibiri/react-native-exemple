import {
	StyleSheet
} from 'react-native';
import {
	pM,
	white,
	padTop,
	loading
} from '../../global/variables';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padTop,
    paddingBottom: 50
  },
  tabsBox: {
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
  gifBox: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	height: 250
  },
  loading: loading
});
