import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import Button from 'react-native-button';
import styles from './styles';
import Timer from '../Timer/Timer';

const defaultUser = require('../../img/avatar.png');
const tabac = require('../../img/tabacBtnSmall.png');
const sport = require('../../img/sportBtnSmall.png');
const food = require('../../img/foodBtnSmall.png');
const relax = require('../../img/relaxBtnSmall.png');
const vs1 = require('../../img/vs1.png');

export default class BoardChallengeNotClickable extends React.Component {
  constructor() {
    super();
    this. reverseCount = this. reverseCount.bind(this);
    this. source = this. source.bind(this);
    this. formatRole = this. formatRole.bind(this);
  }
  reverseCount(currentTime, finishing, confirmed, won) {
    const finish = new Date(finishing).getTime();
    if (finish < currentTime || won === true) {
      return (
        <Text style={styles.finished}>terminé</Text>
      );
    } else if (confirmed !== true) {
      return (
        <Text>En attente...</Text>
      );
    } else {
      return (
        <Timer
          time={Math.ceil((finish - currentTime) / 1000)} //default starting time
          textStyle={{fontSize: 13, textAlign: 'center'}} //default color black
          origin='main'
        />
      );
    }
  }
  source(theme) {
    switch (theme) {
      case 'tabac':
        return tabac;
      case 'sport':
        return sport;
      case 'nutrition':
        return food;
      case 'relaxation':
        return relax;
      default:
        return tabac;
    }
  }
  formatRole(role, time) {
  	if ((role === 'challenger' || role === 'bettor') && time === 'past') {
  		return 'aviez';
  	} else if ((role === 'challenger' || role === 'bettor') && time === 'present') {
  		return 'avez';
  	} else if (role === 'opponent' && time === 'past') {
  		return 'aviez été';
  	} else if (role === 'opponent' && time === 'present') {
  		return 'êtes';
  	}
  }
  btn(data, target) {
    // set position accordin if the challenge is a match
    let positionFreezeBtn = {};
    if (data.match === true && data.challenger !== this.props.userId) {
      positionFreezeBtn = {alignItems: 'center'};
    } else {
      positionFreezeBtn = {alignItems: 'flex-start', marginLeft: 10};
    }
    if (
      (target === 'challenger' && data.challenger !== this.props.userId && data.match === true)
      || (target === 'opponent' && data.opponent !== this.props.userId)
    ) {
      return (
        <View style={[styles.btnFreezeBox, positionFreezeBtn]}>
          <Button
            onPress={() => this.props.listFunction(data, target)}
            containerStyle={styles.btnFreeze}
            style={styles.btnFreezeTxt}
          >
            Selectionner
          </Button>
        </View>
      );
    } else {
      return (
        <View style={styles.btnFreezeBox}/>
      );
    }
  }
  render() {
    // establish betting initial values to show in the board
    const {
    	data,
    	specStyle,
    	imgBorder,
    	userId
    } = this.props;
    // establish betting initial values to show in the board
    let forBet = 0;
    let bothBet = 0;
    let againtsBet = 0;
    if (
      data.fielded === 'for'
      || (data.fielded === 'againts' && data.match === true)
    ) {
      forBet = data.amount;
    }
    if (data.fielded === 'againts') {
      againtsBet = data.amount;
    }
    // add the values of every fielded bet
    if (data && data.for && data.for.length > 0) {for (let i = 0; i < data.for.length; i++) {forBet += data.for[i].amount;}}
    if (data && data.both && data.both.length > 0) {for (let j = 0; j < data.both.length; j++) {bothBet += data.both[j].amount;}}
    if (data && data.againts && data.againts.length > 0) {for (let k = 0; k < data.againts.length; k++) {againtsBet += data.againts[k].amount;}}
    // if the user betted in the challenge, retrieve the role and the amount
    let betOfUser;
    if (data.for && data.for.map((sg) => {return sg.id}).indexOf(userId) >= 0) {
    	betOfUser = data.for[data.for.map((sg) => {return sg.id}).indexOf(userId)].amount;
    } else if (data.both && data.both.map((sg) => {return sg.id}).indexOf(userId) >= 0) {
    	betOfUser = data.both[data.both.map((sg) => {return sg.id}).indexOf(userId)].amount;
    } else if (data.againts && data.againts.map((sg) => {return sg.id}).indexOf(userId) >= 0) {
    	betOfUser = data.againts[data.againts.map((sg) => {return sg.id}).indexOf(userId)].amount;
    }
    // define if the challenge is finished or not
    let conditionChal;
    if (new Date(data.finishing).getTime() < new Date(data.currentTime).getTime() || data.won === true) {
    	conditionChal = 'past';
    } else {
    	conditionChal = 'present';
    }
    return (
      <View style={styles.singleChallenge}>
        <View style={specStyle}>
          <View style={styles.subThemeBox}>
          	<Text style={styles.subTheme}>{data.subTheme}</Text>
	          <View style={this.props.origin === 'destFreeze' ? styles.innerBox : [styles.padding, styles.innerBox]}>
	            { data.match === true ?
	              <View style={styles.profile}>
	                <Image
	                  source={data.imageChallenger ? { uri: data.imageChallenger, isStatic: true } : defaultUser}
	                  style={imgBorder}
	                />
	                { this.props.userId === data.challenger ?
	                  <Text style={styles.names}>Vous</Text>
	                  :
	                  <Text style={styles.names}>{data.nameChallenger && data.nameChallenger.firstName ? data.nameChallenger.firstName : ''}</Text>
	                }
	                { this.props.userId !== data.challenger ?
	                  <Text style={styles.names}>{data.nameChallenger && data.nameChallenger.familyName ? data.nameChallenger.familyName : ''}</Text>
	                  :
	                  <Text style={styles.names}> </Text>
	                }
	              </View>
	              :
	              <View style={styles.profile}>
	                <Image
	                  source={data.imageOpponent ? { uri: data.imageOpponent, isStatic: true } : defaultUser}
	                  style={imgBorder}
	                />
	                { this.props.userId === data.opponent ?
	                  <Text style={styles.names}>Vous</Text>
	                  :
	                  <Text style={styles.names}>{data.nameOpponent && data.nameOpponent.firstName ? data.nameOpponent.firstName : ''}</Text>
	                }
	                { this.props.userId !== data.opponent ?
	                  <Text style={styles.names}>{data.nameOpponent && data.nameOpponent.familyName ? data.nameOpponent.familyName : ''}</Text>
	                  :
	                  <Text style={styles.names}> </Text>
	                }
	              </View>
	            }
	            { data.match === true ?
	              <View style={styles.center}>
	                { this.props.origin !== 'destFreeze' ?
	                  <Text>pending...</Text>
	                  :
	                  null
	                }
	                <View style={styles.vs}>
	                  <Image
	                    source={vs1}
	                    style={{
	                      flex: 1,
	                      width: null,
	                      height: null,
	                      resizeMode: 'contain'
	                    }}
	                  />
	                </View>
	                { /* -------- show if the user played in this challenge -------- */ }
	                { betOfUser && data.confirmed !== false ?
	                  <View><Text style={styles.involvement}>Vous {this.formatRole('bettor', conditionChal)} parié</Text><Text style={styles.involvement}><Text style={styles.bold}>{betOfUser} Tricks</Text></Text></View>
	                  :
	                  null
	                }
	                { /* ----------------------------------------------------------------- */ }
	              </View>
	              :
	              null
	            }
	            { data.match === true ?
	              <View style={styles.profile}>
	                <Image
	                  source={data.imageOpponent ? { uri: data.imageOpponent, isStatic: true } : defaultUser}
	                  style={imgBorder}
	                />
	                { this.props.userId === data.opponent ?
	                  <Text style={styles.names}>Vous</Text>
	                  :
	                  <Text style={styles.names}>{data.nameOpponent && data.nameOpponent.firstName ? data.nameOpponent.firstName : ''}</Text>
	                }
	                { this.props.userId !== data.opponent ?
	                  <Text style={styles.names}>{data.nameOpponent && data.nameOpponent.familyName ? data.nameOpponent.familyName : ''}</Text>
	                  :
	                  <Text style={styles.names}> </Text>
	                }
	              </View>
	              :
	              <View style={styles.challenge}>
	                { this.reverseCount(data.currentTime, data.finishing, data.confirmed, data.won) }
	                <Text style={styles.challengeTxt}>CHALLENGE</Text>
	                { /* -------- show if the user played in this challenge -------- */ }
	                { userId === data.challenger && data.match === false && data.confirmed !== false ?
	                  <View><Text style={styles.involvement}>Vous {this.formatRole('challenger', conditionChal)} défié pour</Text><Text style={styles.involvement}><Text style={styles.bold}>{data.amount} Tricks</Text></Text></View>
	                  :
	                  null
	                }
	                { userId === data.opponent && data.match === false && data.confirmed !== false ?
	                  <View><Text style={styles.involvement}>Vous {this.formatRole('opponent', conditionChal)} défié</Text></View>
	                  :
	                  null
	                }
	                { betOfUser && data.match === false && data.confirmed !== false ?
	                  <View><Text style={styles.involvement}>Vous {this.formatRole('bettor', conditionChal)} parié</Text><Text style={styles.involvement}><Text style={styles.bold}>{betOfUser} Tricks</Text></Text></View>
	                  :
	                  null
	                }
	                { /* ----------------------------------------------------------------- */ }
	              </View>
	            }
	          </View>
	        </View>
          { this.props.origin === 'destFreeze' ?
            <View style={styles.freezeBox}>
              { this.btn(data, 'challenger') }
              <View style={styles.gap}/>
              { this.btn(data, 'opponent') }
            </View>
            :
            <View style={styles.betsBox}>
              <Text style={styles.bets}><Text style={styles.betBig}>{againtsBet}</Text>ts</Text>
              <Text style={styles.betsCenter}><Text style={styles.betBig}>{bothBet}</Text>ts</Text>
              <Text style={styles.bets}><Text style={styles.betBig}>{forBet}</Text>ts</Text>
            </View>
          }
        </View>
        <View style={styles.themeIcon}>
          <Image
            source={this.source(data.theme)}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover'
            }}
          />
        </View>
      </View>
    );
  }
}
