import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import styles from './styles';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import { createChallenge } from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const defaultUser = require('../../img/avatar.png');

class EndChallenge extends React.Component {
  constructor() {
    super();
    this. confirm = this. confirm.bind(this);
    this.state = {disable: false};
  }
  componentDidMount() {
    if (!this.props.userId) {
      Actions.login();
    }
  }
  confirm() {
    if (
        this.props.userId
        && this.props.fielded
        && this.props.selOpponent._id
        && this.props.selTheme
        && this.props.selSubTheme
        && this.props.selTime
        && this.props.selPoints
      ) {
    	this.setState({disable: true});
      this.props.dispatch(createChallenge(this.context.websocket, this.props.fielded, this.props.selOpponent._id, this.props.selTheme, this.props.selSubTheme, this.props.selTime, this.props.selPoints));
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
        <ScrollView>
          <View style={styles.opponentBox}>
            <Text style={styles.opponentText}>Vous challengez:</Text>
            <View style={styles.opponentImg}>
              <Image
                source={this.props.selOpponent && this.props.selOpponent.image ? { uri: this.props.selOpponent.image, isStatic: true } : defaultUser}
                style={styles.img}
              />
            </View>
            <Text style={styles.opponentName}>{this.props.selOpponent.firstName}</Text>
            <Text style={styles.opponentName}>{this.props.selOpponent.familyName}</Text>
          </View>
          <View style={styles.detailsBox}>
            <Text style={styles.txtSimple}>sur le thème de</Text>
            <Text style={styles.txtBold}>{this.props.selSubTheme}</Text>
            <Text style={styles.txtSimple}>pendant <Text style={styles.txtBold}>{this.props.selTime}h </Text>pour <Text style={styles.txtBold}>{this.props.selPoints} Tricks</Text></Text>
          </View>
          { this.state.disable === false ?
            <Button
              onPress={() => this.confirm()}
              containerStyle={styles.btn}
              style={styles.btnTxt}
            >
              Confirmer
            </Button>
            :
            <View style={styles.btnDis}>
              <Text style={styles.btnTxtDis}>Attendre...</Text>
            </View>
          }
        </ScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
EndChallenge.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps)(EndChallenge);
