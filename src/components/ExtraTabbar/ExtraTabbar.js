import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const cameraIcon = require('../../img/cameraBig.png');
const suspectIcon = require('../../img/suspectBig.png');
const thunder = require('../../img/thunder.png');


class ExtraTabbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => Actions.freezesChall({
          	challenge: this.props.challenge,
          	userId: this.props.userId
          })}
        >
          <Image
            source={cameraIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.item}>
          <View style={styles.iconThunder}>
            <Image
              source={thunder}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain'
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => Actions.suspectChall({
          	challenge: this.props.challenge,
          	userId: this.props.userId
          })}
        >
          <Image
            source={suspectIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExtraTabbar;
