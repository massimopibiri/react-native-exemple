import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import {
  getProfile,
  selectTab,
  loadStats,
  resetPushNotifAction,
  toogleBox
} from '../../actions';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import ListStats from '../../components/ListStats/ListStats';
import GainsByMonth from '../../components/GainsByMonth/GainsByMonth';
import {
  color1,
  color2
} from '../../global/variables';


const { width, height } = Dimensions.get('screen');

const loading = require('../../img/loading1.gif');
const user = require('../../img/avatar.png');

class Profile extends React.Component {
  constructor() {
    super();
    this. profileIntro = this. profileIntro.bind(this);
    this. themes = this. themes.bind(this);
    this. toogleBox = this. toogleBox.bind(this);
  }
  async componentDidMount() {
    if (!this.props.userId) {
      // if the user is not logged, redirect to logIn
      Actions.login();
    } else { // if logged, load infos from server
      await this.props.dispatch(getProfile(this.context.websocket));

	    // redirect to the specific challenge if a push notification is pressed
	    if (this.props.actionPush && this.props.actionPush === 'goToGainsFinal') {
	    	await Actions.shop();
	    }
	    // reset the push notification action to avoid redirecting again 
	  	await this.props.dispatch(resetPushNotifAction());
    }
  }
  profileIntro() {
    return (
      <View style={styles.profileBox}>
        <View style={styles.profileHeader}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerLeftTxt1}>MES TRICKS DU MOIS</Text>
            <Text style={styles.headerLeftTxt2}>{this.props.score ? this.props.score : '---'}</Text>
            <Text style={styles.headerLeftTxt3}>TRICKS</Text>
          </View>
          <Image
            source={this.props.picture ? { uri: this.props.picture, isStatic: true } : user}
            style={styles.picture}
          />
          <View style={styles.headerRight}>
            <Text style={styles.headerRightTxt1}>REUSSITES DANS MES DEFIS</Text>
            <Text style={styles.headerRightTxt2}>{this.props.achieve}%</Text>
          </View>
        </View>
        <Text style={styles.name}>{this.props.firstName ? this.props.firstName : null} {this.props.familyName ? this.props.familyName : null}</Text>
        <Text style={styles.company}>Service</Text>
        <Text style={styles.company2}>{this.props.service ? this.props.service.toUpperCase() : null}</Text>
      </View>
    );
  }
  toogleBox() {
    this.props.dispatch(toogleBox(this.props.show));
  }
  themes() {
    // render a number of items equal to the number of themes chose by the user
    let themesToRender = [
      {
        type: 'Tabac',
        nbAchieved: this.props.tabacoTheme.nbAchieved,
        tricksGained: this.props.tabacoTheme.tricksGained,
        last: this.props.tabacoTheme.last
      },
      {
        type: 'Nutrition',
        nbAchieved: this.props.foodTheme.nbAchieved,
        tricksGained: this.props.foodTheme.tricksGained,
        last: this.props.foodTheme.last
      },
      {
        type: 'Sport',
        nbAchieved: this.props.sportTheme.nbAchieved,
        tricksGained: this.props.sportTheme.tricksGained,
        last: this.props.sportTheme.last
      },
      {
        type: 'Relaxation',
        nbAchieved: this.props.relaxTheme.nbAchieved,
        tricksGained: this.props.relaxTheme.tricksGained,
        last: this.props.relaxTheme.last
      }
    ];
    if (themesToRender && themesToRender.length > 0) {
      return (
        <ListStats
          list={themesToRender}
        />
      );
    } else {
      return (
      	<View style={styles.gifBox}>
          <Image
            style={styles.loading}
            source={loading}
          />
      	</View>
      );
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
        <ScrollView style={styles.scrollView}>
          { this.profileIntro() }
          { this.props.byStage && this.props.byStage.length > 0 ?
            <GainsByMonth
              list={this.props.byStage}
              toogleBox={this.toogleBox}
              show={this.props.show}
              byStage={this.props.byStage}
            />
            :
            null
          }
          <Text style={styles.titleStats}>VOS STATISTIQUES</Text>
          { this.themes() }
        </ScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Profile.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    firstName: state.profileDett.firstName,
    familyName: state.profileDett.familyName,
    familyName: state.profileDett.familyName,
    email: state.profileDett.email,
    picture: state.profileDett.picture,
    company: state.profileDett.company,
    service: state.profileDett.service,
    score: state.profileDett.score,
    gain: state.profileDett.gain,
    gainByMonth: state.profileDett.gainByMonth,
    selected: state.selectTabs.selected,
    stats: state.profileDett.stats,
    nbWellAchieved: state.profileDett.nbWellAchieved,
    tabacoTheme: state.profileDett.tabacoTheme,
    sportTheme: state.profileDett.sportTheme,
    foodTheme: state.profileDett.foodTheme,
    relaxTheme: state.profileDett.relaxTheme,
    isSmoker: state.profileDett.isSmoker,
    isBadEater: state.profileDett.isBadEater,
    isBadSportsMan: state.profileDett.isBadSportsMan,
    isStressed: state.profileDett.isStressed,
    byStage: state.profileDett.byStage,
    achieve: state.profileDett.achieve,
    show: state.toogle.show,
    actionPush: state.tools.actionPush,
    extraData: state.tools.extraData
  };
}

export default connect(mapStateToProps)(Profile);
