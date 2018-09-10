import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
  TextInput,
  Keyboard,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'; // package to avoid keyboard from covering TextInput
import Button from 'react-native-button';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import {
  writeComment
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class Suspect extends React.Component {
  constructor() {
    super();
    this. onConfirm = this. onConfirm.bind(this);
  }
  componentDidMount() {
    if (!this.props.userId) {
      Actions.login();
    }
    this.props.dispatch(writeComment(''));
  }
  onConfirm() {
    const type = 'suspect';
    if (this.props.comment) {
      Keyboard.dismiss();
      // datinationfreeze is used for both suspiction and freeze, as the following three pages
      if (this.props.challenge && this.props.challenge._id) { // for the freeze lauched from DettChallenge
	      Actions.destinationFreezeChall({
	      	challenge: this.props.challenge,
          userId: this.props.userId,
	        suspectReason: this.props.comment,
	        challengeType: 'suspect',
          origin: 'dettChall'
	      });
      } else {
	      Actions.destinationfreeze({
	        suspectReason: this.props.comment,
	        challengeType: type
	      });
      }
    }
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
        <View style={styles.choiceBox}>
          <KeyboardAwareScrollView>
	          <ScrollView>
	            <Text style={styles.title}>Ecrivez une Suspicion :</Text>
	            <TextInput
	              multiline
	              numberOfLines={6}
	              style={styles.textArea}
	              returnKeyType='done'
	              placeholder='SVP, remplissez le motif de votre suspicion' 
	              underlineColorAndroid='rgba(0,0,0,0)'
	              onChange={(event) => {
	                this.props.dispatch(writeComment(event.nativeEvent.text));
	              }}
	              // value={this.props.comment > 1 ? this.props.comment : null}
	            />
		          { this.props.comment ?
		            <Button
		               containerStyle={styles.sendBtn}
		               style={styles.sendBtnTxt}
		               onPress={this.onConfirm}
		            >
	  	            Envoyer
		            </Button>
		            :
		            <View
		               style={styles.sendBtnDis}
		            >
		              <Text style={styles.sendBtnTxtDis}>SVP, choisissez la raison du suspect</Text>
		            </View>
	            }
	          </ScrollView>
	        </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    comment: state.form.comment
  };
}

export default connect(mapStateToProps)(Suspect);
