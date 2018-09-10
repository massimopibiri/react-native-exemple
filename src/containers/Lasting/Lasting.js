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
// https://github.com/xgfe/react-native-picker-xg
import Picker from '../../components/Picker/picker';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import { pickerLastingValues } from '../../global/challengeLists';
import { limitTimeRange } from '../../functions/program';
import {
  checklimit,
  timeRemaining
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class Lasting extends React.Component {
  constructor() {
    super();
    this. onActPickerConfirm = this. onActPickerConfirm.bind(this);
    this. undo = this. undo.bind(this);
  }
  componentDidMount() {
    if (!this.props.userId) {
      Actions.login();
    } else {
    	if (this.props.selOpponent && this.props.selTheme && this.props.selSubTheme) {
        this.props.dispatch(timeRemaining(null));
        this.props.dispatch(checklimit(this.context.websocket));
      }
    }
  }
  onActPickerConfirm(str) {
    data = {
      selOpponent: this.props.selOpponent,
      selTheme: this.props.selTheme,
      selSubTheme: this.props.selSubTheme,
      selTime: str
    };
    Actions.betting(data);
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
        { this.props.timeremaining ?
          <Picker
            // inputValue={'2 wheel picker'}
            inputStyle={styles.textInput}
            // confirmBtnText={'confirm'}
            // cancelBtnText={'cancel'}
            data={limitTimeRange(pickerLastingValues, this.props.timeremaining)}
            // selectIndex={[0, 1]}
            // onResult={(str) => { this.setState({ str1: str }); }}
            visible={false}
            page='lasting'
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
Lasting.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    timeremaining: state.programData.timeremaining
  };
}

export default connect(mapStateToProps)(Lasting);
