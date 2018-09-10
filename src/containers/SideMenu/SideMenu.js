import React from 'react';
import { connect } from 'react-redux';
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
import Button from 'react-native-button';
import styles from './styles';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import {
  backgroundColor1,
  color1,
  color2
} from '../../global/variables';
import {
  logOut
} from '../../actions';

const gear = require('../../img/gear.png');
const logout = require('../../img/logout.png');
const { width, height } = Dimensions.get('screen');

class SideMenu extends React.Component {
  constructor() {
    super();
    this. logOut = this. logOut.bind(this);
  }
  logOut() {
    this.props.dispatch(logOut());
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
          <View style={styles.content}>
            {/* <TouchableOpacity onPress={() => Actions.home()} style={styles.listItem}>
                  <Text style={styles.listTxt}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.profilgen()} style={styles.listItem}>
                  <Text style={styles.listTxt}>Profile</Text>
                </TouchableOpacity> */}
            <Button
              onPress={() => Actions.players()}
              containerStyle={styles.listItem}
              style={styles.listTxt}
            >
              <Text style={styles.listTxt}>Classement</Text>
            </Button>
            <Button
              onPress={() => Actions.allchallengeSide({ userId: this.props.userId })}
              containerStyle={styles.listItem}
              style={styles.listTxt}
            >
              Défi
            </Button>
            <Button
              onPress={() => Actions.cash()}
              containerStyle={styles.listItem}
              style={styles.listTxt}
            >
              Bonus
            </Button>
            <Button
              onPress={() => Actions.wallet()}
              containerStyle={styles.listItem}
              style={styles.listTxt}
            >
              Cagnotte
            </Button>
            <Button
              onPress={() => Actions.shop()}
              containerStyle={styles.listItem}
              style={styles.listTxt}
            >
              Boutique
            </Button>
            <Button
              onPress={() => Actions.bonus()}
              containerStyle={styles.listItem}
              style={styles.listTxt}
            >
              Gagner des Tricks
            </Button>
            { <Button
              onPress={() => Actions.infos({argToDisplay: 'reason', idToDisplay: 10})}
              containerStyle={styles.listItem}
              style={styles.listTxt}
            >
              FAQ
            </Button> }
            <View style={styles.separated}>
              <Button
                onPress={() => Actions.parameters()}
                containerStyle={styles.listItem}
                style={styles.listTxt}
              >
                <Image
                  source={gear}
                  style={styles.img}
                />
                Paramètres
              </Button>
              {/* <TouchableOpacity onPress={() => Actions.home()} style={styles.listItem}>
                    <Text style={styles.listTxt}>Partager l'app</Text>
                  </TouchableOpacity> */}
              <Button
                onPress={this.logOut} 
                containerStyle={styles.listItem}
                style={styles.listTxt}
              >
                <Image
                  source={logout}
                  style={styles.img}
                />
                Log Out
              </Button>
            </View>
          </View>
        </ScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps)(SideMenu);
