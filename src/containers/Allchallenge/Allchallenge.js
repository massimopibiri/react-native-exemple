import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import ListChallenges from '../../components/ListChallenges/ListChallenges';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
  selectDef,
  changeSwitch,
  getAllChallenges
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class AllChallenge extends React.Component {
  constructor() {
    super();
    this. tabs = this. tabs.bind(this);
    this. onSwitcher = this. onSwitcher.bind(this);
    this. selectChallenge = this. selectChallenge.bind(this);
    this. listFunction = this. listFunction.bind(this);
  }
  componentDidMount() {
    // empty the list to be sure the data is consistent
    const challengeState = this.props.selectDef === 'Défis passés' ? 'finished' : 'current';
    const switcher = this.props.switcher === true ? 'personal' : 'all';
    this.props.dispatch(getAllChallenges(this.context.websocket, challengeState, switcher, 30));
  }
  onSwitcher() {
    // prepare for the query
    const challengeState = this.props.selectDef === 'Défis passés' ? 'finished' : 'current';
    const switcher = this.props.switcher === true ? 'all' : 'personal';

    // change the value of the switcher
    this.props.dispatch(changeSwitch(this.props.switcher));
    // call the new query in database
    this.props.dispatch(getAllChallenges(this.context.websocket, challengeState, switcher, 30));
  }
  selectChallenge(title) {
    this.props.dispatch(selectDef(title));
    // prepare for the query
    const challengeState = this.props.selectDef === 'Défis passés' ? 'current' : 'finished';
    const switcher = this.props.switcher === true ? 'personal' : 'all';
    // call the new query in database
    this.props.dispatch(getAllChallenges(this.context.websocket, challengeState, switcher, 30));
  }
  listFunction(data) {
    if (this.props.userId === data.opponent && data.match === false && data.confirmed !== true) {
      Actions.acceptance({ idChallenge: data._id });
    } else {
      Actions.dettchallenge({ idChallenge: data._id });
    }
  }
  tabs(title) {
    // check if the item is selected to render the selected classes
    if (title === this.props.selectDef) {
      // return the selected tag
      return (
        <TouchableOpacity
          style={styles.selectedTabsItem}
          onPress={() => this.selectChallenge(title)}
        >
          <Text style={styles.selectedTabsText}>{title}</Text>
        </TouchableOpacity>
      );
    } else {
      // return the normal tag
      return (
        <TouchableOpacity
          style={styles.tabsItem}
          onPress={() => this.selectChallenge(title)}
        >
          <Text style={styles.tabsText}>{title}</Text>
        </TouchableOpacity>
      );
    }
  }
  render() {
		const listToRender = this.props.selectDef === 'Défis passés' ? this.props.listOfPastChallenges : this.props.listOfChallenges;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <LinearGradient
          start={{x: 1.0, y: 0.3}} end={{x: 0.5, y: 1.0}}
          locations={[0, 0.9]}
          colors={[color1, color2]}
          style={{position: 'absolute', width: width, height: height, top: 0, left: 0}}
        />
        <View style={styles.tagsBox}>
          { this.tabs('Défis en cours')}
          { this.tabs('Défis passés')}
        </View>

        <View style={styles.boxfiltre}>
          <View style={styles.filtreLeft}>
            <Switch
              style={styles.switchbtn}
              value={this.props.switcher}
              onChange={this.onSwitcher}
              onTintColor='#d9577d'
              thumbTintColor='#ffffff'
            />
            <Text style={styles.switchTxt}>Mes défis</Text>
          </View>
        </View>
        <ScrollView>
        { listToRender && listToRender.length > 0 ?
          <ListChallenges
            list={listToRender}
            listFunction={this.listFunction}
          />
          :
          <View style={styles.chalWarning}>
            <View  style={styles.emptyBoard}>
              <Text style={styles.noChals}>Vous n'avez pas de défis pour l'instant!</Text>
            </View>
          </View>
        }
        </ScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
AllChallenge.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    selectDef: state.challenges.selectDef,
    switcher: state.challenges.switcher,
    listOfChallenges: state.challenges.list,
    listOfPastChallenges: state.challenges.listPast
  };
}

export default connect(mapStateToProps)(AllChallenge);
