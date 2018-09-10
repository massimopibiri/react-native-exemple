import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';
// https://github.com/benjreinhart/react-native-aws3
// https://medium.com/@knowbody/react-native-image-upload-to-s3-bucket-5220941bfea2#.1m38o77nc
import { RNS3 } from 'react-native-aws3';
import styles from './styles';
import {
  addAlert,
  registerFreeze
} from '../../actions';
import { forFreezes } from '../../amazonConfig/amazonConfig';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
  color1,
  color2
} from '../../global/variables';

const defaultUser = require('../../img/avatar.png');

const { width, height } = Dimensions.get('window');

class ConfirmFreeze extends React.Component {
  constructor() {
    super();
    this. yes = this. yes.bind(this);
    this. non = this. non.bind(this);
    this. chooseBox = this. chooseBox.bind(this);
    this. content = this. content.bind(this);
    this.state = {choosen: false};
  }
	yes(id) {
		this.setState({choosen: true});
    let data = {};
    if (this.props.challengeType === 'freeze') {
      // set the loading message to true
      // save the image in AmazonS3 storage
      RNS3.put(this.props.file, forFreezes)
      .then(response => {
        // set the loading message to false
        if (response.status !== 201) {
          this.props.dispatch(addAlert('danger', 'L\'image n\'a pas été uploadée'));
        }
        if (response && response.body.postResponse.location) {
          // store the freeze in the server wit hte link for the picture stored in Amazon-S3
          data = {
            userId: this.props.userId,
            idChallenge: this.props.idChallenge,
            accused: id,
            file: response.body.postResponse.location,
            comment: this.props.comment,
            challengeType: this.props.challengeType
          };
          // send data to server for saving the freeze
          this.props.dispatch(registerFreeze(this.context.websocket, data));
          if (this.props.origin === 'dettChall') {
          	Actions.dettchallengeChall({ idChallenge: this.props.idChallenge });
          } else {
            Actions.dettchallengefreeze({ idChallenge: this.props.idChallenge });
          }
        }
      })
      .catch(
        (error) => {
          // set the loading message to false
          if (error) {
            this.props.dispatch(addAlert('danger', 'L\'image n\'a pas été uploadée'));
          }
        }
      );
    } else {
      data = {
        userId: this.props.userId,
        idChallenge: this.props.idChallenge,
        accused: id,
        suspectReason: this.props.suspectReason,
        comment: this.props.comment,
        challengeType: this.props.challengeType
      };
      // send data to server for saving the freeze
      this.props.dispatch(registerFreeze(this.context.websocket, data));
      if (this.props.origin === 'dettChall') {
      	Actions.dettchallengeChall({ idChallenge: this.props.idChallenge });
      } else {
        Actions.dettchallengefreeze({ idChallenge: this.props.idChallenge });
      }
    }
	}
	non() {
		Actions.home();
	}
  chooseBox() {
    return (
      <View style={styles.chooseBox}>
        { this.state.choosen === false ?
	        <Button 
	          onPress={() => this.yes(this.props.targetId)}
	          containerStyle={styles.btnYes}
	          style={styles.btnYesTxt}
	        >
	          Oui
	        </Button>
	        :
	        <View style={styles.waiting}>
	          <Text style={styles.waitingTxt}>Attendre...</Text>
	        </View>
        }
        {this.state.choosen === false ?
	        <Button 
	          onPress={this.non}
	          containerStyle={styles.btnNon}
	          style={styles.btnNonTxt}
	        >
	          Annuller
	        </Button>
	        :
	        null
        }
      </View>
    );
  }
  content() {
    if (this.props.challengeType === 'freeze') {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.props.file.uri, isStatic: true }}
            style={styles.background}
            resizeMode="cover"
          />
          <View style={styles.item}>
            <View style={styles.profile}>
              <Image
                source={this.props.imageTarget ? { uri: this.props.imageTarget, isStatic: true } : defaultUser}
                style={styles.img}
              />
              <Text style={styles.txt}>Etes vous sûr(e) de vouloir freezer</Text>
              <Text style={styles.txt}>{this.props.target.firstName} {this.props.target.familyName} ?</Text>
            </View>
            { this.chooseBox() }
          </View>
          <ContainerAlerts />
        </View>
      );
    } else {    
      return (
        <View style={styles.container}>
          <View style={styles.item}>
            <View style={styles.itemBox}>
              <View style={styles.profile}>
                <Image
                  source={this.props.imageTarget ? { uri: this.props.imageTarget, isStatic: true } : defaultUser}
                  style={styles.img}
                />
                <Text style={styles.txt}>Etes vous sûr(e) de vouloir lancer la suspicion à</Text>
                <Text style={styles.txt}>{this.props.target.firstName} {this.props.target.familyName}</Text>
                <Text style={styles.txt}>pour la raison suivante :</Text>
                <Text style={styles.txt}>" {this.props.suspectReason} " </Text>
              </View>
              { this.chooseBox() }
            </View>
          </View>
          <ContainerAlerts />
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.base}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <LinearGradient
          start={{x: 1.0, y: 0.3}} end={{x: 0.5, y: 1.0}}
          locations={[0, 0.9]}
          colors={[color1, color2]}
          style={{position: 'absolute', width: width, height: height, top: 0, left: 0}}
        />
        { this.content() }
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
ConfirmFreeze.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps)(ConfirmFreeze);
