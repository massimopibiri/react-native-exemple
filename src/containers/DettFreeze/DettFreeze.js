import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// new React-Native button -> works with the same result on both platforms (ios and andorid)
import Button from 'react-native-button';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import {
  validateFreeze
} from '../../actions';

class DettFreeze extends React.Component {
  constructor() {
    super();
    this. onValidateFreeze = this. onValidateFreeze.bind(this);
    this.state = {validated: false};
  }
  onValidateFreeze(decision, id, accusedId, challengeId) {
    if (decision && id && accusedId && challengeId) {
    	this.setState({validated: true});
      this.props.dispatch(validateFreeze(this.context.websocket, decision, id, accusedId, challengeId));
      if (this.props.origin === 'notifs') {
        Actions.pop();
      } else {
      	Actions.dettchallengeChall({ idChallenge: challengeId });
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <View style={styles.previewBox}>
          <Image
            source={{ uri: this.props.image, isStatic: true }}
            style={styles.img}
          >
	          { this.props.comment ?
          	  <Text style={styles.comment}>{this.props.comment}</Text>
          	  :
          	  null
	          }
            { (this.props.updated && this.props.updated === true) || this.state.validated === true || this.props.freezer === this.props.userId ?
            	null
            	:
		          <Button
		            onPress={() => this.onValidateFreeze('validate', this.props.idFreeze, this.props.accusedId, this.props.idChallenge)}
		            containerStyle={styles.btnMod}
		            style={styles.btn}
		          >
		            Valider
		          </Button>
            }
            { (this.props.updated && this.props.updated === true) || this.state.validated === true || this.props.freezer === this.props.userId ?
            	null
            	:
		          <Button 
		            onPress={() => this.onValidateFreeze('decline', this.props.idFreeze, this.props.accusedId, this.props.idChallenge)}
		            containerStyle={styles.btnMod}
		            style={styles.btn}
		          >
		            Décliner
		          </Button>
		        }
		      </Image>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    show: state.toogle.show
  };
}
// access context.type to get the store to pass to socket.io initialization
DettFreeze.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

export default connect(mapStateToProps)(DettFreeze);
