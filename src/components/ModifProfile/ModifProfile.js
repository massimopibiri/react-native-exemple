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

class ModifProfile extends React.Component {
  constructor() {
    super();
    this. upload = this. upload.bind(this);
  }
	upload() {
		Actions.uploadimg();
	}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgBox}>
          <Image
            source={this.props.imgProfile ? { uri: this.props.imgProfile, isStatic: true } : defaultImg}
            style={styles.img}
          />
        </View>
        <Text style={styles.txtProfile}>Modifier votre photo de profil</Text>
        <Button
          // onPress={this.validation}
          containerStyle={styles.btnProfile}
          style={styles.btnProfileTxt}
          onPress={this.upload}
        >
          Modifier
        </Button>   
      </View>
    );
  }
}

export default ModifProfile;
