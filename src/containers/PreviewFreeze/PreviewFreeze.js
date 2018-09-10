import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Keyboard
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import {
  writeComment,
  toogleBox
} from '../../actions';

const pencil = require('../../img/pencil.png');
const valid = require('../../img/valid.png');
const { width, height} = Dimensions.get('screen');

class PreviewFreeze extends React.Component {
  constructor() {
    super();
    this. onConfirm = this. onConfirm.bind(this);
    this. onShowCommentbox = this. onShowCommentbox.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(toogleBox(true));
    this.props.dispatch(writeComment(''));
  }
  onShowCommentbox() {
    this.props.dispatch(toogleBox(this.props.show));
  }
  onConfirm() {
    const type = 'freeze';
    Keyboard.dismiss();
    // datinationfreeze is used for both suspiction and freeze, as the following three pages
    if (this.props.challenge && this.props.challenge._id) {
      Actions.destinationFreezeChall({ // for the freeze lauched from DettChallenge
        file: this.props.file,
        challengeType: type,
        comment: this.props.comment,
        challenge: this.props.challenge,
        userId: this.props.userId,
	      challengeType: 'freeze',
        origin: 'dettChall'
      });
    } else {
      Actions.destinationfreeze({
        file: this.props.file,
        challengeType: type,
        comment: this.props.comment
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <View style={styles.previewBox}>
          <Image
            source={{ uri: this.props.file.uri, isStatic: true }}
            style={{ flex: 1, resizeMode: 'cover' }}
          />
        </View>
        { this.props.show === false ?
          <TouchableOpacity
            style={styles.toogleBtn}
            onPress={this.onShowCommentbox}
          >
            <Image
              source={pencil}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain'
              }}
            />
          </TouchableOpacity>
          :
          null
        }
        <TouchableOpacity
          style={styles.validBtn}
          onPress={this.onConfirm}
        >
          <Image
            source={valid}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain'
            }}
          />
        </TouchableOpacity>
        { this.props.show === true ?
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.textArea}
            autoFocus={true}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ffffff'
            placeholder="Ecrivez un commentaire..."
            onChange={(event) => {
              this.props.dispatch(writeComment(event.nativeEvent.text));
            }}
          />
          :
          null
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    comment: state.form.comment,
    show: state.toogle.show
  };
}

export default connect(mapStateToProps)(PreviewFreeze);
