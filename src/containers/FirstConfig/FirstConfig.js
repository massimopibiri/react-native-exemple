import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	Text,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import ConfigBox from '../../components/ConfigBox/ConfigBox';
import {
	setSmoker,
	setBadEater,
	setBadSportsMan,
	setStressed,
  setThemes
} from '../../actions';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class FirstConfig extends React.Component {
  constructor() {
    super();
    this. onSetSmoker = this. onSetSmoker.bind(this);
    this. onSetBadEater = this. onSetBadEater.bind(this);
    this. onSetBadSportsMan = this. onSetBadSportsMan.bind(this);
    this. onSetStressed = this. onSetStressed.bind(this);
    this. validation = this. validation.bind(this);
  }
  componentDidMount() {
    // if the user is not logged, redirect to LogIn
    if (!this.props.userId) {
      Actions.login();
    }
    // reset all values
    this.props.dispatch(setSmoker(false));
    this.props.dispatch(setBadEater(false));
    this.props.dispatch(setBadSportsMan(false));
    this.props.dispatch(setStressed(false));
  }
	onSetSmoker() {
		this.props.dispatch(setSmoker(this.props.isSmoker));
	}
	onSetBadEater() {
		this.props.dispatch(setBadEater(this.props.isBadEater));
	}
	onSetBadSportsMan() {
		this.props.dispatch(setBadSportsMan(this.props.isBadSportsMan));
	}
	onSetStressed() {
		this.props.dispatch(setStressed(this.props.isStressed));
	}
  validation() {
    // save the parameters
    this.props.dispatch(setThemes(this.props.isSmoker, this.props.isBadEater, this.props.isBadSportsMan, this.props.isStressed));
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
          <View style={styles.titleBox}>
            <Text style={styles.title}>Définissez vos paramètres : </Text>
          </View>
          <ConfigBox
            onSetSmoker={this.onSetSmoker}
            isSmoker={this.props.isSmoker}
            onSetBadEater={this.onSetBadEater}
            isBadEater={this.props.isBadEater}
            onSetBadSportsMan={this.onSetBadSportsMan}
            isBadSportsMan={this.props.isBadSportsMan}
            onSetStressed={this.onSetStressed}
            isStressed={this.props.isStressed}
          />
          <Button 
            onPress={this.validation}
            containerStyle={styles.btn}
            style={styles.btnTxt}
          >
            Valider
        </Button>
        </ScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
FirstConfig.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    isSmoker: state.setParams.isSmoker,
    isBadEater: state.setParams.isBadEater,
    isBadSportsMan: state.setParams.isBadSportsMan,
    isStressed: state.setParams.isStressed
  };
}

export default connect(mapStateToProps)(FirstConfig);
