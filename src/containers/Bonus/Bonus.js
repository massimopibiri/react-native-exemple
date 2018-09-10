import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	Text,
	Image,
  StatusBar,
  Dimensions,
	ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// components
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
// actionCreators
import {
  currentScore
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const thunder = require('../../img/thunder.png');
const logo = require('../../img/logoBig.png');
const checked = require('../../img/checkedDark.png');

class Bonus extends React.Component {
  constructor() {
    super();
    this. checked = this. checked.bind(this);
    this. action = this. action.bind(this);
  }
  componentDidMount() {
    if (!this.props.userId) {
      Actions.login();
    } else {
      this.props.dispatch(currentScore(this.context.websocket));
    }
  }
  checked(type) {
    if (!this.props.done || this.props.done.map((item) => {return item;}).indexOf(type) < 0) {
      return (
        <View style={styles.spotN} />
      );
    } else {
      return (
        <View style={styles.spot}>
          <Image
            source={checked}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover'
            }}
          />
        </View>
      );
    }
  }
  action(type, txt, value) {
  	return (
      <View style={styles.row}>
        <View style={styles.left}>
          { this.checked(type) }
        </View>
        <View style={styles.center}><Text style={styles.title}>{txt}</Text></View>
        <View style={styles.right}>
          <Text style={styles.valueV}>{value}</Text>
          <Text style={styles.valueT}>Tricks</Text>
        </View>
      </View>
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
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.icon}>
              <Image
                source={logo}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'contain'
                }}
              />
            </View>
            <Text style={styles.h1}>Gagnez des Tricks !</Text>
            <Text style={styles.p1}>Aujourd'hui vous avez déjà gagné:</Text>
            <Text style={styles.p2}>{this.props.score ? this.props.score : '---'}</Text>
            <Text style={styles.p3}>Tricks</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.p1}>Pour gagner plus de Tricks, valider les actions suivantes:</Text>
          </View>

          { this.action('avatar', 'Ajouter un avatar', 40) }
          { this.action('challenge', 'Lancer un challenge', 30) }
          { this.action('match', 'Relancer un adversaire lors d\'un défi', 60) }
          { this.action('bet', 'Parier des points dans un défi', 20) }
          { this.action('win', 'Remporter un défi', 80) }

          <View style={styles.footer}>
            <View style={styles.blurFooter}/>
            <View style={styles.iconFooter}>
              <Image
                source={thunder}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'contain'
                }}
              />
            </View>
            <View style={styles.raccomandations}>
              <Text style={styles.p1}>Les freezes vous permettent de gagner<Text style={styles.p1Bold}> 100 Tricks </Text>si ils sont validés.</Text>
              <Text style={styles.p1}>Attention à ne pas en abuser en réalisant des faux freezes...</Text>
              <Text style={styles.p1}>ou c'est la pénalité!</Text>
            </View>
          </View>

          <ContainerAlerts />
        </ScrollView>
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Bonus.contextTypes = {
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    score: state.wallet.score,
    done: state.wallet.done
  };
}

export default connect(mapStateToProps)(Bonus);
