import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import styles from './styles';

const defaultImg = require('../../icons/user.png');

class NavBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}><Text style={styles.txt}>1</Text></View>
        <View style={styles.center}><Text style={styles.txt}>{this.props.title}</Text></View>
        <View style={styles.right}><Text style={styles.txt}>2</Text></View>
      </View>
    );
  }
}

export default NavBar;