import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';
import styles from './styles';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const loading = require('../../img/loading1.gif');

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <LinearGradient
          start={{x: 1.0, y: 0.3}} end={{x: 0.5, y: 1.0}}
          locations={[0, 0.9]}
          colors={[color1, color2]}
          style={{position: 'absolute', width: width, height: height, top: 0, left: 0}}
        />
        <Image
          style={styles.loading}
          source={loading}
        />
      </View>
    );
  }
}

export default SplashScreen;
