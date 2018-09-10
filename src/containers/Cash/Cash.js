import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// components
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import Timer from '../../components/Timer/Timer';
import ListBonus from '../../components/ListBonus/ListBonus';
// actionCreators
import {
  getCashData,
  resetProgramStatus
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const loading = require('../../img/loading1.gif');
const { width, height } = Dimensions.get('screen');

class Cash extends React.Component {
  componentDidMount() {
    // the timer needs to be reseted
    this.props.dispatch(resetProgramStatus());
    if (!this.props.userId) {
      Actions.login();
    } else {
      this.props.dispatch(getCashData(this.context.websocket));
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
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerLeftTxt}>DUREE</Text>
              <Text style={styles.headerLeftTxt}>DE LA PARTIE</Text>
              { this.props.programStatus && this.props.programStatus.timeMissing ?
                <Timer
                  time={Math.ceil(this.props.programStatus.timeMissing / 1000)} //default starting time
                  textStyle={styles.timer} //default color black
                />
                :
                <Text style={styles.headerLeftTxt}>--:--:--:--</Text>
              }
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerRightTxt}>PARTIE</Text>
              <Text style={styles.headerRightTxt}>EN COURS</Text>
              { this.props.programStatus && this.props.programStatus.currentStage && this.props.programStatus.nbOfStages ?
            	  <Text style={styles.currentStage}>{this.props.programStatus.currentStage}/{this.props.programStatus.nbOfStages}</Text>
                :
                <Text style={styles.currentStage}>---/---</Text>
              }
            </View>
          </View>
          {
            (this.props.stagesRef && this.props.stagesRef !== {})
            && (this.props.totalBudget || this.props.totalBudget === 0)
            && (this.props.currentPrice && this.props.currentPrice !== {})
            && (this.props.programStatus && this.props.programStatus !== {})
            && (this.props.totalNbPlayers || this.props.totalNbPlayers === 0) ?
            <ListBonus
              stagesRef={this.props.stagesRef}
              totalBudget={this.props.totalBudget}
              currentPrice={this.props.currentPrice}
              programStatus={this.props.programStatus}
              totalNbPlayers={this.props.totalNbPlayers}
            />
            :
		      	<View style={styles.gifBox}>
		          <Image
		            style={styles.loading}
		            source={loading}
		          />
		      	</View>
          }
          <ContainerAlerts />
        </ScrollView>
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Cash.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    stagesRef: state.wallet.stagesRef,
    totalBudget: state.wallet.totalBudget,
    currentPrice: state.wallet.currentPrice,
    programStatus: state.wallet.programStatus,
    totalNbPlayers: state.wallet.totalNbPlayers
  };
}

export default connect(mapStateToProps)(Cash);
