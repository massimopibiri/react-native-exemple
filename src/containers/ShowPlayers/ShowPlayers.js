import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	Text,
  StatusBar,
  Dimensions,
	TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import styles from './styles';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import ListOpponents from '../../components/ListOpponents/ListOpponents';
import {
  selectedPlayers
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';
import {
  // filterUsers
} from '../../functions/program';

const { width, height } = Dimensions.get('screen');

class ShowPlayers extends React.Component {
  componentDidMount() {
    // if the user is not logged, redirect to LogIn
    if (!this.props.userId) {
      Actions.login();
    //  if the user is logged, load infos
    } else {
      this.props.dispatch(selectedPlayers(this.context.websocket, this.props.arg, this.props.subArg));
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
        <ListOpponents
          users={this.props.users}
          noFunction={true}
        />
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
ShowPlayers.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    users: state.allUsers.users
  };
}

export default connect(mapStateToProps)(ShowPlayers);
