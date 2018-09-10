import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'uuid';
import styles from './styles';
import { RNS3 } from 'react-native-aws3';
// import ImageResizer from 'react-native-image-resizer'; !IMPORTANT -> uninstalled because of bugs
import { forProfile } from '../../amazonConfig/amazonConfig';
import {
  addAlert,
  setAvatar
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

// REACT-CAMERA -> https://github.com/lwansbrough/react-native-camera
const defaultImg = require('../../icons/user.png');

class PreviewImg extends React.Component {
  constructor() {
    super();
    this. uploadImg = this. uploadImg.bind(this);
  }
	uploadImg() {
    // resize the image into two different versions (width, height, format, quality, rotation)
    /*
    ImageResizer.createResizedImage(this.props.img, 150, 150, 'JPEG', 100, null)
    .then(
      (resizedImageUri) => {
        */
        const file = {
          uri: this.props.img,
          name: uuid.v4() + '.jpg',
          type: 'image/jpeg'
        };
        // save the image in AmazonS3 storage
        RNS3.put(file, forProfile)
        .then(response => {
          if (response.status !== 201) {
            this.props.dispatch(addAlert('danger', 'L\'image n\'a pas été uploadée dans le serveur'));
          }
          if (response && response.body.postResponse.location) {
            // store the profile image in the server wit hte link for the picture stored in Amazon-S3
            this.props.dispatch(setAvatar(this.context.websocket, response.body.postResponse.location));
            // at the moment it just sends the picture to the parameters img. Soon registering in Amazon database
            Actions.parameters({img: this.props.img});
          }
        })
        .catch(
          (error) => {
            if (error) {
              this.props.dispatch(addAlert('danger', 'L\'image n\'a pas été uploadée dans le serveur'));
            }
          }
        );
        /*
      }
    ).catch((err) => {
    });
    */
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
        <View style={styles.top}>
          <View style={styles.previewBox}>
            <Image
              source={this.props.img ? { uri: this.props.img, isStatic: true } : defaultImg}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <Button 
            onPress={this.uploadImg}
            containerStyle={styles.btn}
            style={styles.btnTxt}
          >
            Choisir cette image
          </Button>
        </View>
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
PreviewImg.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps)(PreviewImg);

