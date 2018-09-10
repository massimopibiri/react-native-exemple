import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import styles from './styles';

const checked = require('../../img/checkBtn.png');
const coins = require('../../img/coins.png');

class ListBonus extends React.Component {
  constructor() {
    super();
    this. status = this. status.bind(this);
    this. bonus = this. bonus.bind(this);
  }
  status(nb, gained) {
    // set two different colors according if the bonus has been triggered
    if (nb === 1) {
      return(
        <View style={styles.status}>
          <Text style={gained === true ? styles.howmany : styles.howmanyN}><Text style={styles.addBold}>{this.props.currentPrice.activePlayers && this.props.totalNbPlayers ? Math.ceil((this.props.currentPrice.activePlayers / this.props.totalNbPlayers) * 100) : 0} %</Text> des salariés utilisent Tricky</Text>
          <Text style={gained === true ? styles.howmanyObjective : styles.howmanyObjectiveN}><Text style={styles.addColor}>Objectif :</Text></Text>
          <Text style={gained === true ? styles.howmanyObjective : styles.howmanyObjectiveN}><Text style={styles.addColor}><Text style={styles.big}>{Math.ceil((this.props.currentPrice.activePlayersLimit / this.props.totalNbPlayers) * 1000) / 10} %</Text> des salariés</Text></Text>
          {/* <Text style={styles.link}>En savoir plus</Text> */}
        </View>
      );
    } else if (nb === 2) {
      const singleBet = 'défi a été réalisé';
      const severalBet = 'défis ont été réalisés';
      return(
        <View style={styles.status}>
          <Text style={gained === true ? styles.howmany : styles.howmanyN}><Text style={styles.addBold}>{this.props.currentPrice.globalNbChal}</Text> {this.props.currentPrice.globalNbChal === 1 ? singleBet : severalBet}</Text>
          <Text style={gained === true ? styles.howmanyObjective : styles.howmanyObjectiveN}><Text style={styles.addColor}>Objectif : <Text style={styles.big}>{Math.ceil(this.props.currentPrice.nbBetsLimit)}</Text> défis</Text></Text>
        </View>
      );
    } else if (nb === 3) {
      const singlePoint = 'Trick a été gagné';
      const severalPoints = 'Tricks ont été gagnés';
      return(
        <View style={styles.status}>
          <Text style={gained === true ? styles.howmany : styles.howmanyN}><Text style={styles.addBold}>{this.props.currentPrice.globalScoreAmount}</Text> {this.props.currentPrice.globalScoreAmount === 1 ? singlePoint : severalPoints}</Text>
          <Text style={gained === true ? styles.howmanyObjective : styles.howmanyObjectiveN}><Text style={styles.addColor}>Objectif :</Text></Text>
          <Text style={gained === true ? styles.howmanyObjective : styles.howmanyObjectiveN}><Text style={styles.addColor}><Text style={styles.big}>{Math.ceil(this.props.currentPrice.tricksGainedLimit)}</Text> Tricks</Text></Text>
          {/* <Text style={styles.link}>En savoir plus</Text> */}
        </View>
      );
    }
  }
  bonus(nb, price) {
    // render a not clickable tab if the opponent didn't accept the challenge
    if (
      (nb === 1 && this.props.currentPrice.activePlayers >= this.props.currentPrice.activePlayersLimit )
      || (nb === 2 && this.props.currentPrice.globalNbChal >= this.props.currentPrice.nbBetsLimit )
      || (nb === 3 && this.props.currentPrice.globalScoreAmount >= this.props.currentPrice.tricksGainedLimit )
    ) {
      return (
        <View
          style={styles.listItem}
        >
          <View style={styles.checkedImg}>
            <Image
              source={checked}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain'
              }}
            />
          </View>
          <View style={styles.itemInner}>
            <Text style={styles.itemTitle}>BONUS {nb}</Text>
            <View style={styles.mainItem}>
              <View style={styles.coins}>
                <Image
                  source={coins}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'contain'
                  }}
                />
              </View>
              <View style={styles.itemStatus}>
                <Text style={styles.statusTxt1}>{price} €</Text>
                <Text style={styles.statusTxt2}>débloqué !</Text>
              </View>
            </View>
            <Text style={styles.itemSplit}/>
            { this.status(nb, true) }
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={styles.listItem}
        >
          <View style={styles.checkedImg}>
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
          <View style={styles.itemInnerN}>
            <Text style={styles.itemTitleN}>BONUS {nb}</Text>
            <View style={styles.mainItem}>
              <View style={styles.coins}>
                <Image
                  source={coins}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'contain'
                  }}
                />
              </View>
              <View style={styles.itemStatus}>
                <Text style={styles.statusTxt1N}>{price} €</Text>
                <Text style={styles.statusTxt2N}>à débloquer</Text>
              </View>
            </View>
            <Text style={styles.itemSplitN}/>
            { this.status(nb, false) }
          </View>
        </View>
      );
    }
  }
  render() {
    // establish the amount of the price to trigger for each bonus
    const priceRate = this.props.programStatus ? Math.floor((this.props.totalBudget / this.props.programStatus.nbOfStages) * this.props.stagesRef.amountInGame * 10) / 10 : '---';
    return (
      <View style={styles.container}>
        { this.bonus(1, priceRate) }
        { this.bonus(2, priceRate) }
        { this.bonus(3, priceRate) }
      </View>
    );
  }
}

export default ListBonus;
