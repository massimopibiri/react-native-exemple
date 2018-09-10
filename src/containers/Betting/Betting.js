import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// look in src/components/Picker/setup3 - (https://github.com/xgfe/react-native-picker-xg)
import Picker from '../../components/Picker/picker';
import { pickerBettingValues } from '../../global/challengeLists';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import { limitPointRange } from '../../functions/program';
import {
  checkpoints,
  pointLimit
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class Betting extends React.Component {
  constructor() {
    super();
    this. onActPickerConfirm = this. onActPickerConfirm.bind(this);
    this. undo = this. undo.bind(this);
  }
  componentDidMount() {
    if (!this.props.userId) {
      Actions.login();
    } else {
    	if (this.props.selOpponent && this.props.selTheme && this.props.selSubTheme && this.props.selTime) {
    		this.props.dispatch(pointLimit(null));
        this.props.dispatch(checkpoints(this.context.websocket, this.props.selOpponent));	
    	}
    }
  }
  onActPickerConfirm(str, fielded = null) {
    data = {
      selOpponent: this.props.selOpponent,
      selTheme: this.props.selTheme,
      selSubTheme: this.props.selSubTheme,
      selTime: this.props.selTime,
      selPoints: str,
      fielded
    };
    Actions.endchallenge(data);
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
        { this.props.pointlimit ?
          <Picker
            // inputValue={'2 wheel picker'}
            inputStyle={styles.textInput}
            // confirmBtnText={'confirm'}
            // cancelBtnText={'cancel'}
            opponentScore={this.props.selOpponent.score}
            pointlimit={this.props.pointlimit}
            data={limitPointRange(pickerBettingValues, this.props.pointlimit)}
            // selectIndex={[0, 1]}
            // onResult={(str) => { this.setState({ str1: str }); }}
            visible={false}
            // passe the pageName to trigger the right function in src/components/Picker/setup3
            page='betting'
            actPickerConfirm={this.onActPickerConfirm}
          />
          :
          null
        }
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Betting.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    pointlimit: state.programData.pointlimit
  };
}

export default connect(mapStateToProps)(Betting);
