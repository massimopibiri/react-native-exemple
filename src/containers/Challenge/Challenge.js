import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
  StatusBar,
	View,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// components
import ListOpponents from '../../components/ListOpponents/ListOpponents';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
// actionCreators
import {
  // addAlert,
  resetPushNotifAction,
  allPlayers
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class Challenge extends React.Component {
  constructor() {
    super();
    this. selectOpponent = this. selectOpponent.bind(this);
    this. undo = this. undo.bind(this);
  }
  componentDidMount() {
    if (this.props.idProgram) {
      this.props.dispatch(allPlayers(this.context.websocket, this.props.idProgram));
    } else {
      // this.props.dispatch(addAlert('danger', 'Sorry, but an error occurred during loading'));
    }
    // reset the push notification action to avoid redirecting again 
  	this.props.dispatch(resetPushNotifAction());
  }
  selectOpponent(data) {
    if (data) {
      Actions.theme({ selOpponent: data, idProgram: this.props.idProgram });
    }
  }
  undo() {
    Actions.pop();
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
        <ListOpponents
          users={this.props.users}
          selectOpponent={this.selectOpponent}
          noFunction={false}
        />
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Challenge.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    users: state.allUsers.users
  };
}

export default connect(mapStateToProps)(Challenge);
