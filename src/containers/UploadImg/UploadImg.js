import React from 'react';
import { connect } from 'react-redux';
import {
  View, 
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import Button from 'react-native-button';
import Camera from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import {
  addAlert
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

// REACT-CAMERA -> https://github.com/lwansbrough/react-native-camera

class UploadImg extends React.Component {
  constructor() {
    super();
    this. takePicture = this. takePicture.bind(this);
  }
  takePicture() {
    this.camera.capture()
    .then(
      (data) => Actions.previewimg({ img: data.path })
    )
    .catch(
      (err) => {
        this.props.dispatch(addAlert('danger', 'An error has occurred while taking the picture'));
      }
    );
  }
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
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality["480p"]}
          type={Camera.constants.Type.front}
          captureTarget={Camera.constants.CaptureTarget.disk}
          mirrorImage={true}
          orientation={'portrait'}
        />
        <View style={styles.btnBox}>
          <Button
            onPress={this.takePicture}
            containerStyle={styles.btn}
            style={styles.btnTxt}
          >
            CAPTURER
          </Button>
        </View>
      </View>
    );
  }
}

export default connect()(UploadImg);
