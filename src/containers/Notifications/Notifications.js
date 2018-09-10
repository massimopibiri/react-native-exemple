import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  AsyncStorage,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import ListNotifications from '../../components/ListNotifications/ListNotifications';
import {
  loadNotifs,
  selectDest
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const loading = require('../../img/loading1.gif');

const { width, height } = Dimensions.get('screen');

class Notifications extends React.Component {
  constructor() {
    super();
    this. tabs = this. tabs.bind(this);
    this. onSelect = this. onSelect.bind(this);
    this. selectNotif = this. selectNotif.bind(this);
    this. listNotifs = this. listNotifs.bind(this);
  }
  componentDidMount() {
    if (!this.props.userId) {
      Actions.login();
    } else {
    	this.props.dispatch(selectDest(this.props.selectedTab ? this.props.selectedTab : 'Moi'));
      this.props.dispatch(loadNotifs(this.context.websocket, 'personal'));
    }
  }
  onSelect(title) {
    // handle the select feedback for tabs
    this.props.dispatch(selectDest(title));
    const target = title === 'Moi' ? 'personal' : 'all';
    // load the data according to select specification
    this.props.dispatch(loadNotifs(this.context.websocket, target));
  }
  selectNotif(idChallenge, action) {
  	if (action === 'pendingChallenge') {
      Actions.acceptanceNot({ idChallenge: idChallenge });
  	} else {
      Actions.dettchallengenot({ idChallenge: idChallenge });
  	}
  }
  tabs(title) {
    // check if the item is selected to render the selected classes
    if (title === this.props.selectedTab) {
      // return the selected tag
      return (
        <View style={styles.selectedTabsItem}>
          <TouchableOpacity
            onPress={
              () => this.onSelect(title)
            }
          >
            <Text style={styles.selectedTabsText}>{title}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // return the normal tag
      return (
        <View style={styles.tabsItem}>
          <TouchableOpacity
            onPress={
              () => this.onSelect(title)
            }
          >
            <Text style={styles.tabsText}>{title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  listNotifs() {
    if (this.props.notifsPers.length > 0 && this.props.selectedTab === 'Moi') {
      return (
        <ListNotifications
          notifs={this.props.notifsPers}
          userId={this.props.userId}
          selectNotif={this.selectNotif}
          origin='notif'
          idProgram={this.props.idProgram}
        />
      );
    } else if (this.props.notifsAll.length > 0 && this.props.selectedTab === 'Mon reseau') {
      return (
        <ListNotifications
          notifs={this.props.notifsAll}
          userId={this.props.userId}
          selectNotif={this.selectNotif}
          origin='notif'
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
          <View style={styles.tabsBox}>
            { this.tabs('Mon reseau') }
            { this.tabs('Moi') }
          </View>
          { this.listNotifs() }
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Notifications.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    idProgram: state.profileDett.idProgram,
    notifsAll: state.notifications.itemsAll,
    notifsPers: state.notifications.itemsPers,
    selectNot: state.notifications.selectNot,
    selectedTab: state.notifications.selectedTab
  };
}

export default connect(mapStateToProps)(Notifications);
