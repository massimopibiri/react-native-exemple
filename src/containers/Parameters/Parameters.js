import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
  TouchableOpacity,
	View,
  ScrollView,
  StatusBar,
  Dimensions,
	Text,
  TextInput,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'; // package to avoid keyboard from covering TextInput
import styles from './styles';
import ModifProfile from '../../components/ModifProfile/ModifProfile';
import ConfigBox from '../../components/ConfigBox/ConfigBox';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
  changePassword,
  writePsw,
  writeSuggestion,
  getAllParameters,
  sendSuggestion
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const goTo = require('../../img/left.png');

class Parameters extends React.Component {
  constructor() {
    super();
    this. onWritePsw = this. onWritePsw.bind(this);
    this. updatePsw = this. updatePsw.bind(this);
    this. onWriteSuggestion = this. onWriteSuggestion.bind(this);
    this. sendSuggestion = this. sendSuggestion.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getAllParameters(this.context.websocket));
  }
  onWritePsw(data) {
    this.props.dispatch(writePsw(data));
  }
  updatePsw() {
    if (this.props.userId && this.props.psw) {
      this.props.dispatch(changePassword(this.context.websocket, this.props.psw));
      this.refs['psw'].setNativeProps({text: ''});
    }
  }
  onWriteSuggestion(data) {
    this.props.dispatch(writeSuggestion(data));
  }
  sendSuggestion() {
    this.props.dispatch(sendSuggestion(this.context.websocket, this.props.sugg));
    this.refs['sugg'].setNativeProps({text: ''});
  }
  navTab(title) {
    return (
      <Button
        containerStyle={styles.navBox}
        onPress={() => Actions.genconfig({
          isSmoker: this.props.isSmoker,
          isBadEater: this.props.isBadEater,
          isBadSportsMan: this.props.isBadSportsMan,
          isStressed: this.props.isStressed
        })}
      >
        <Text style={styles.title3}>{title}</Text>
        <Image
         source={goTo}
         style={styles.navIcon}
        />
      </Button>
    );
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
        <KeyboardAwareScrollView>
	        <ScrollView>
	          {/* change profile */}
	          <View style={styles.parBox}>
	            <ModifProfile
	              imgProfile={this.props.imgProfile}
	              updateProfile={this.updateProfile}
	            />
	          </View>
	          {/* change password */}
	          <View style={styles.pswBox}>
	            <Text style={styles.title}>Indiquer votre nouveau mot de passe</Text>
	            <View style={styles.pswInnerBox}>
	              <TextInput
	                onChange={(event) => {
	                  if (event.nativeEvent.text && event.nativeEvent.text !== '') {
	                    this.onWritePsw(event.nativeEvent.text);
	                  }
	                }}
	                ref={'psw'}
	                style={styles.inputs}
	                value={this.props.psw.length > 1 ? this.props.psw : null}
	                placeholder='Nouveau mot de passe'
	                placeholderTextColor={color1}
	                underlineColorAndroid='rgba(0,0,0,0)'
	                secureTextEntry
	              />
	              <Button 
	                onPress={this.updatePsw}
	                containerStyle={styles.btn}
	                style={styles.btnTxt}
	              >
	                Confirmer
	              </Button>
	            </View>
	          </View>
	          { this.navTab('Modifier mes déclaratifs de thématiques') }
	          {/* change parametres */}
	          <View style={styles.parBox}>
	          </View>
	          {/* change parametres */}
	          <View style={styles.suggestionsBox}>
	            <Text style={styles.title2}>Une idée ? Un problème ? Une reccomandation à faire ? Aidez-nous à faire grandir Tricky.</Text>
	            <Text style={styles.title2}>Laissez-nous vos impressions.</Text>
	            <TextInput
	              onChange={(event) => {
	                if (event.nativeEvent.text && event.nativeEvent.text !== '') {
	                  this.onWriteSuggestion(event.nativeEvent.text);
	                }
	              }}
	              ref={'sugg'}
	              style={styles.textarea}
	              value={this.props.sugg > 1 ? this.props.sugg : null}
	              multiline = {true}
	              numberOfLines = {4}
	              placeholder='Commentaire'
	              placeholderTextColor={color1}
	            />
	            <Button 
	              onPress={this.sendSuggestion}
	              containerStyle={styles.btn2}
	              style={styles.btnTxt}
	            >
	              Send Suggestion
	            </Button>
	          </View>
	        </ScrollView>
	      </KeyboardAwareScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Parameters.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    isSmoker: state.setParams.isSmoker,
    isBadEater: state.setParams.isBadEater,
    isBadSportsMan: state.setParams.isBadSportsMan,
    isStressed: state.setParams.isStressed,
    show: state.toogle.show,
    name: state.form.name,
    surname: state.form.surname,
    defaultName: state.form.defaultName,
    defaultSurname: state.form.defaultSurname,
    psw: state.form.psw,
    newpsw: state.form.newpsw,
    sugg: state.form.sugg,
    imgProfile: state.profileDett.imgProfile
  };
}

export default connect(mapStateToProps)(Parameters);
