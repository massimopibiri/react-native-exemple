/**
 * Created by Gobelin on 15/02/2017.
 */
'use strict';
//let style = require('../../style/style.js');
import { StyleSheet } from 'react-native';
import {
  backgroundColor2
} from './variables';

module.exports = StyleSheet.create({
  backgroundgrey: {
    flex: 1,
    paddingTop: 70,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: backgroundColor2
  },
  header: {
  backgroundColor: '#4E4E4E',
  width: 751,
  height: 91,
  },
  selectedTabsItem: {
    flex: 1,
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    width: 376,
    borderBottomColor: '#FFFFFF',
  },
  writecolor: {
    color: '#cccccc',
  }
});
