import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Carousel from 'react-native-carousel-control';
// import PushNotification from 'react-native-push-notification';
import styles from './styles';
// import PushController from '../../pushNotif/PushController';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import ListChallengesHorizontal from '../../components/ListChallengesHorizontal/ListChallengesHorizontal';
import ListNotifications from '../../components/ListNotifications/ListNotifications';
import {
  getMain,
  loadProfile,
  loadHorzChallenges,
  loadNotifsMain,
  resetPushNotifAction
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const defaultUser = require('../../icons/user.png');
const btnChallenge = require('../../img/plusBtn.png');
const fond = require('../../img/fond.png');
const logo = require('../../img/logoSmall.png');
const right = require('../../img/right-spec.png');

class Main extends React.Component {
  constructor() {
    super();
    this. listFunction = this. listFunction.bind(this);
    this. selectNotif = this. selectNotif.bind(this);
  }
  async componentDidMount() {
  	if (this.context.websocket) {
  		// if connection has not been established, first initialize websocket (passed as prop from App.js), then retrieve data
  		await this.props.globalSocketInit();
  		await Actions.refresh();
  	}
		// if connection has been established, retrieve data
    await this.props.dispatch(getMain(this.context.websocket));

    // redirect to the specific challenge if a push notification is pressed
    if (this.props.actionPush && this.props.actionPush === 'pendingChallenge' && this.props.extraData) {
    	await Actions.acceptance({ idChallenge: this.props.extraData });

    } else if (this.props.actionPush && this.props.actionPush === 'goToChallenge' && this.props.extraData) {
    	await Actions.dettchallenge({ idChallenge: this.props.extraData });

    } else if (this.props.actionPush && this.props.actionPush === 'launchChallenge') {
    	await Actions.challenge({ idProgram: this.props.idProgram });

    } else if (this.props.actionPush && this.props.actionPush === 'goToGains') {
    	await Actions.shopMain();

    } else if (this.props.actionPush && this.props.actionPush === 'goToWallet') {
    	await Actions.walletMain();

    }
    // reset the push notification action to avoid redirecting again 
  	await this.props.dispatch(resetPushNotifAction());
  }
  listFunction(data) {
    if (this.props.userId === data.opponent && data.match === false && data.confirmed !== true) {
      Actions.acceptance({ idChallenge: data._id });
    } else {
      Actions.dettchallenge({ idChallenge: data._id });
    }
  }
  selectNotif(idChallenge, action) {
  	if (action === 'pendingChallenge') {
      Actions.acceptance({ idChallenge: idChallenge });
  	} else {
      Actions.dettchallenge({ idChallenge: idChallenge });
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
          <Image
            source={fond}
            style={styles.fond}
          />
          <View style={styles.headBox}>
            <TouchableHighlight
              onPress={() => {
                Actions.walletMain();
              }}
              style={styles.genInfosLeft}
            >
              <View>
                <Text style={styles.textgain}>MES TRICKS DU MOIS</Text>
                <Text style={styles.textgainVal}>{ this.props.score ? this.props.score : '---' }<Text style={styles.textgain}>Ts</Text></Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                Actions.challenge({ idProgram: this.props.idProgram })
              }}
            >
              <Image
                source={btnChallenge}
                style={styles.btnChallenge}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                Actions.walletMain();
              }}
              style={styles.genInfosRight}
            >
              <View>
                <Text style={styles.textAchieve}>{'Réussite dans mes défis'.toUpperCase()}</Text>
                <Text style={styles.textAchieveVal}>{this.props.achieve}<Text style={styles.textAchievePlus}>%</Text></Text>
              </View>
            </TouchableHighlight>
            <Text style={styles.btnTxt}>{'Lancer un défi !'.toUpperCase()}</Text>
          </View>

          {/* CHALLENGES */}
          <View style={styles.challengesBox}>
            <View style={styles.challengesHeader}>
              {/* go to complete list of challenges */}
              <Text style={styles.currentChals}>{'Mes défis en cours'.toUpperCase()}</Text>
              <TouchableHighlight
                style={styles.allChalsBox}
                onPress={() => {
                  Actions.allchallenge({ userId: this.props.userId })
                }}
              >
                <Text style={styles.allChals}>Tous les défis</Text>
              </TouchableHighlight>
            </View>

            {/* show the 5 most recent CHALLENGES in the carousel */}
            { !this.props.mychallenges || this.props.mychallenges.length <= 0 ?
              <View style={styles.chalWarning}>
                <View  style={styles.emptyBoard}>
                  <Text style={styles.noChals}>Vous n'avez pas de défis en cours</Text>
                </View>
              </View>
              :
              <ListChallengesHorizontal userId={this.props.userId} list={this.props.mychallenges} listFunction={this.listFunction}/>
            }
          </View>

          <View style={styles.otherChallsBox}>
            <Text style={styles.centerTxt}><Text style={styles.btnTxt}>{'Allez voir les défis de vos collegues !'.toUpperCase()}</Text></Text>
            <Button
              onPress={() => Actions.allchallenge({ userId: this.props.userId })}
              containerStyle={styles.btn}
              style={styles.btnTxt2}
            >
              {'Miser'.toUpperCase()}
              <Image
                source={right}
                style={styles.right}
              />
            </Button>
          </View>

          {/* NOTIFICATIONS */}
          <View style={styles.challengesBox}>
            <View style={styles.challengesHeader}>
              {/* go to complete list of challenges */}
              <Text style={styles.currentChals}>{'Les dernières activités'.toUpperCase()}</Text>
              <TouchableHighlight
                style={styles.allChalsBox}
                onPress={() => {
                  Actions.notificationshome()
                }}
              >
                <Text style={styles.allChals}>Toutes mes activités</Text>
              </TouchableHighlight>
            </View>
            {/* show the 5 most recent NOTIFICATIONS in the carousel */}
            { this.props.myactivities.length <= 0 ?
              <View style={styles.chalWarning}>
                <View  style={styles.emptyBoard}>
                  <Text style={styles.noChals}>Vous n'avez pas encore d'activités</Text>
                </View>
              </View>
              :
              <ListNotifications
                notifs={this.props.myactivities}
                userId={this.props.userId}
                selectNotif={this.selectNotif}
                origin='main'
                idProgram={this.props.idProgram}
              />
            }
          </View>
        </ScrollView>
      <View style={styles.logoBox}>
        <Image
          source={logo}
          style={styles.logo}
        />
      </View>
      <ContainerAlerts />
      { /* <PushController /> */ }
    </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Main.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    firstName: state.profileDett.firstName,
    familyName: state.profileDett.familyName,
    email: state.profileDett.email,
    idProgram: state.profileDett.idProgram,
    score: state.profileDett.score,
    achieve: state.profileDett.achieve,
    mychallenges: state.challenges.listHorz,
    myactivities: state.notifications.itemsMain,
    actionPush: state.tools.actionPush,
    extraData: state.tools.extraData
  };
}

export default connect(mapStateToProps)(Main);

