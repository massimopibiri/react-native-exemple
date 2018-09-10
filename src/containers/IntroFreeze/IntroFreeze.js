import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import styles from './styles';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
  checkIfExists
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables'

const cameraIcon = require('../../img/cameraBig.png');
const suspectIcon = require('../../img/suspectBig.png');
const { width, height } = Dimensions.get('window');

class IntroFreeze extends React.Component {
  constructor() {
    super();
    this. authorized = this. authorized.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(checkIfExists(this.context.websocket));
  }
  authorized() {
    return (
      <View style={styles.container}>
        <Button 
          onPress={() => Actions.freezes()}
          containerStyle={styles.btn}
        >
          <Image
            source={cameraIcon}
            style={styles.icon}
          />
        </Button>
        <Button 
          onPress={() => Actions.suspect()}
          containerStyle={styles.btn2}
        >
          <Image
            source={suspectIcon}
            style={styles.icon}
          />
        </Button>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.total}>
        <LinearGradient
          start={{x: 1.0, y: 0.3}} end={{x: 0.5, y: 1.0}}
          locations={[0, 0.9]}
          colors={[color1, color2]}
          style={{position: 'absolute', width: width, height: height, top: 0, left: 0}}
        />
          <ScrollView>
            { this.props.authorizeFreeze === true ?
              this.authorized()
              :
              <View style={styles.chalWarning}>
                <View  style={styles.emptyBoard}>
                  <Text style={styles.noChals}>Vous devez participer à un défi pour pouvoir lancer un freeze</Text>
                </View>
              </View>
            }
          </ScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
IntroFreeze.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    authorizeFreeze: state.challenges.authorizeFreeze
  };
}

export default connect(mapStateToProps)(IntroFreeze);
