import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import uuid from 'uuid';
import styles from './styles';

// REACT-CAMERA -> https://github.com/lwansbrough/react-native-camera

class Freezes extends React.Component {
  constructor() {
    super();
    this. takePicture = this. takePicture.bind(this);
  }
  takePicture() {
    this.camera.capture()
      .then(
        (data) => {
          const file = {
            uri: data.path,
            name: uuid.v4() + '.jpg',
            type: 'image/jpeg'
          };
          if (this.props.challenge && this.props.challenge._id) { // for the freeze lauched from DettChallenge
	          Actions.previewfreezeChall({
          	  challenge: this.props.challenge,
          	  userId: this.props.userId,
	            file
	          });
          } else {
	          Actions.previewfreeze({
	            file
	          });
        }
          }
      )
      .catch(
        err => console.error(err)
      );
  }
  render() { 
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <View style={styles.cameraBox}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            captureTarget={Camera.constants.CaptureTarget.disk}
            aspect={Camera.constants.Aspect.fill}
            captureQuality={Camera.constants.CaptureQuality['480p']}
            // captureAudio={false}
            orientation={'portrait'}
          >
          <TouchableOpacity style={styles.capture} onPress={this.takePicture}/>
        </Camera>
        </View>
      </View>
    );
  }
}
export default connect()(Freezes);

