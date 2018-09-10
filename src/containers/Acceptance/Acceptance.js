import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// import ListComments from '../../components/ListComments/ListComments';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
	acceptance,
  loadSingleChallenge,
  resetPushNotifAction,
  saveSingleChallenge
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';
import { fromHoursToDays } from '../../functions/challenge';

const { width, height } = Dimensions.get('screen');

const defaultUser = require('../../img/avatar.png');

class Acceptance extends React.Component {
  constructor() {
    super();
    this. accept = this. accept.bind(this);
    this. match = this. match.bind(this);
    this. refuse = this. refuse.bind(this);
    this.state = {choosen: false};
  }
  componentDidMount() {
    this.props.dispatch(saveSingleChallenge({}));
    this.props.dispatch(loadSingleChallenge(this.context.websocket, this.props.idChallenge));
    // reset the push notification action to avoid redirecting again 
  	this.props.dispatch(resetPushNotifAction());
  }
  accept(challengeId) {
  	this.setState({choosen: true});
    this.props.dispatch(acceptance(this.context.websocket, challengeId, this.props.dataChallenge.amount, this.props.dataChallenge.challenger, this.props.dataChallenge.opponent, 'accept'));
  }
  match(challengeId) {
  	this.setState({choosen: true});
    this.props.dispatch(acceptance(this.context.websocket, challengeId, this.props.dataChallenge.amount, this.props.dataChallenge.challenger, this.props.dataChallenge.opponent, 'match'));
  }
  refuse(challengeId) {
  	this.setState({choosen: true});
    this.props.dispatch(acceptance(this.context.websocket, challengeId, this.props.dataChallenge.amount, this.props.dataChallenge.challenger, this.props.dataChallenge.opponent, 'refuse'));
  }
  render() {
  	// set if the challenger can be matched or not
  	let showMatch = true;
  	if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'nutrition') {
  		if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isBadEater === false) {
  			showMatch = false;
  		}
  	} else if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'tabac') {
  		if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isSmoker === false) {
  			showMatch = false;
  		}
  	} else if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'sport') {
  		if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isBadSportsMan === false) {
  			showMatch = false;
  		}
  	} else if (this.props.dataChallenge && this.props.dataChallenge.theme && this.props.dataChallenge.theme === 'relaxation') {
  		if (this.props.dataChallenge && this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.isStressed === false) {
  			showMatch = false;
  		}
  	}
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <LinearGradient
          start={{x: 1.0, y: 0.3}} end={{x: 0.5, y: 1.0}}
          locations={[0, 0.9]}
          colors={[color1, color2]}
          style={{position: 'absolute', width: width, height: height, top: 0, left: 0}}
        />
        { this.props.dataChallenge.challengerDett ?
          <ScrollView>
            <Text style={styles.argument}>Vous êtes challengé par</Text>
            <Image
              source={this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.image ? { uri: this.props.dataChallenge.challengerDett.image, isStatic: true } : defaultUser}
              style={styles.img}
            />
            <Text style={styles.name}>{this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.firstName}</Text>
            <Text style={styles.name}>{this.props.dataChallenge.challengerDett && this.props.dataChallenge.challengerDett.familyName}</Text>
            <Text style={styles.introDett}>Réussirez-vous le défi suivant?</Text>
            <Text style={styles.theme}>{this.props.dataChallenge.subTheme}</Text>
            <View style={styles.dettBox}>
              <Text style={styles.dettWrt}>Pendant <Text style={styles.dettBold}>{fromHoursToDays(this.props.dataChallenge.lasting)}</Text> pour <Text style={styles.dettBold}>{this.props.dataChallenge.amount} Trick{this.props.dataChallenge.amount !== 1 ? 's' : null}</Text></Text>
            </View>
            { this.props.dataChallenge && this.props.dataChallenge.opponentDett && this.props.dataChallenge.opponentDett.score && this.props.dataChallenge.opponentDett.score < this.props.dataChallenge.amount ?
	            <View style={styles.noPossibleRelaunch}>
	              <Text style={styles.noPossibleRelaunchTxt}>Vous n'avez pas assez de Tricks pour relancer au défi. Cependant vous pouvez toujours le rélever.</Text>
	            </View>
	            :
	            null
            }
            {
            	this.props.dataChallenge.programStages
            	&& this.props.dataChallenge.programStages.stages
            	&& this.props.dataChallenge.programStages.stages[this.props.dataChallenge.programStages.currentStage]
            	&& this.props.dataChallenge.programStages.stages[this.props.dataChallenge.programStages.currentStage].time
            	&& this.props.dataChallenge.programStages.stages[this.props.dataChallenge.programStages.currentStage].time > this.props.dataChallenge.currentTime + this.props.dataChallenge.lasting * 60 * 60 * 1000
            	?
	            <View style={styles.buttonBox}>
	              { this.state.choosen === false ?
		              <Button
		                onPress={() => this.accept(this.props.dataChallenge._id)}
		                containerStyle={styles.btn}
		                style={styles.btnTxt}
		              >
		                Accepter
		              </Button>
		              :
		              null
	              }
	              { /* not to show if the challenger doesn't stop the same vice or if the challenge is fielded 'for' */
	              	this.props.dataChallenge.fielded && this.props.dataChallenge.fielded !== 'for' && showMatch === true && this.state.choosen === false && this.props.dataChallenge.opponentDett && this.props.dataChallenge.opponentDett.score && this.props.dataChallenge.opponentDett.score > this.props.dataChallenge.amount ?
		              <Button
		                onPress={() => this.match(this.props.dataChallenge._id)}
		                containerStyle={styles.btn}
		                style={styles.btnTxt}
		              >
		                Relancer
		              </Button>
		              :
		              null
	              }
	            </View>
            	:
            	<View style={styles.warningBox}>
            	  <Text style={styles.warningTxt}>Vous n’avez pas assez de Tricks pour relancer le défi et passer en mode Match !</Text>
            	  <Text style={styles.warningLittle}>Cependant vous pouvez toujours relever le défi et tenter de gagner des Tricks !</Text>
            	</View>
            }
            { this.state.choosen === false ?
	            <Button
	              style={styles.refuse}
	              onPress={() => this.refuse(this.props.dataChallenge._id)}
	            >
	              Refuser
	            </Button>
	            :
	            <View style={styles.waiting}>
	              <Text style={styles.waitingTxt}>Attendre...</Text>
	            </View>
	          }
          </ScrollView>
          :
          null
          }
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Acceptance.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    dataChallenge: state.challenges.data
  };
}

export default connect(mapStateToProps)(Acceptance);
