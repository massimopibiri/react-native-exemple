import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// components
import ListChallenges from '../../components/ListChallenges/ListChallenges';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
  challengeToFreeze
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class DestinationFreeze extends React.Component {
  constructor() {
    super();
    this. chooseFreezed = this. chooseFreezed.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(challengeToFreeze(this.context.websocket));
  }
	chooseFreezed(dataChallenge, target) {
		if (dataChallenge) {
      if (this.props.challengeType === 'freeze') {
        Actions.confirmfreeze({
          userId: this.props.userId,
          idChallenge: dataChallenge._id,
          targetId: target === 'challenger' ? dataChallenge.challenger : dataChallenge.opponent,
          target:  target === 'challenger' ? dataChallenge.nameChallenger : dataChallenge.nameOpponent,
          imageTarget: target === 'challenger' ? dataChallenge.imageChallenger : dataChallenge.imageOpponent,
          theme: dataChallenge.theme,
          subTheme: dataChallenge.subTheme,
          date: dataChallenge.date,
          lasting: dataChallenge.lasting,
          amount: dataChallenge.amount,
          file: this.props.file,
          comment: this.props.comment,
          challengeType: this.props.challengeType,
          match: dataChallenge.match
        });
      } else {
        Actions.confirmfreeze({
          userId: this.props.userId,
          idChallenge: dataChallenge._id,
          targetId: target === 'challenger' ? dataChallenge.challenger : dataChallenge.opponent,
          target:  target === 'challenger' ? dataChallenge.nameChallenger : dataChallenge.nameOpponent,
          imageTarget: target === 'challenger' ? dataChallenge.imageChallenger : dataChallenge.imageOpponent,
          theme: dataChallenge.theme,
          subTheme: dataChallenge.subTheme,
          date: dataChallenge.date,
          lasting: dataChallenge.lasting,
          amount: dataChallenge.amount,
          suspectReason: this.props.suspectReason,
          comment: this.props.comment,
          challengeType: this.props.challengeType,
          match: dataChallenge.match
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
        <ListChallenges
          list={this.props.listChallenges}
          listFunction={this.chooseFreezed}
          origin='destFreeze'
        />
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
DestinationFreeze.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    listChallenges: state.challenges.list
  };
}

export default connect(mapStateToProps)(DestinationFreeze);
