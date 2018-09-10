import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  Modal,
  TouchableHighlight,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import Timer from '../../components/Timer/Timer';
import {
  storeWallet,
  showModal,
  resetProgramStatus,
  resetPushNotifAction,
  loadWallet
} from '../../actions';
import ListRanking from '../../components/ListRanking/ListRanking';
// import WalletConversion from '../../components/WalletConversion/WalletConversion';
import { Actions } from 'react-native-router-flux';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const loading = require('../../img/loading1.gif');
const remove = require('../../img/remove-black.png');

// const xxx = false;
class Wallet extends React.Component {
  constructor() {
    super();
    this. onShowModal = this. onShowModal.bind(this);
    this. modalContent = this. modalContent.bind(this);
  }
  componentDidMount() {
    // the timer needs to be reseted
    this.props.dispatch(resetProgramStatus());
    // if the user is not logged, redirect to LogIn
    if (!this.props.userId) {
      Actions.login();
    //  if the user is logged, load infos
    } else {
      this.props.dispatch(loadWallet(this.context.websocket));
    }
    // reset the push notification action to avoid redirecting again 
  	this.props.dispatch(resetPushNotifAction());
  }
  onShowModal() {
    this.props.dispatch(showModal(this.props.showMod));
  }
  modalContent() {
    // formula =  (score of the user) X (total budget aviable) / (total score of the user having played in at least a challenge)
    const gain = this.props.currentScore && this.props.price && this.props.totalScore ? Math.round(this.props.currentScore * (this.props.price.currentPrice) / (this.props.totalScore / 10)) / 10 : 0;
    return(
      <View style={styles.modalContent}>
        <Text style={styles.advert}>La somme indiquée varie en fonction des performances de chacun des joueurs</Text>
        <View style={styles.modalBlock}>
          <Text style={styles.modalTxt}>La somme débloqué</Text>
          <Text style={styles.modalNb}>{this.props.price ? Math.floor(this.props.price.currentPrice * 10) / 10 : '0'}€</Text>
        </View>
        <Text style={styles.itemSplit}/>
        { this.props.currentScore ?
          <View style={styles.modalBlock}>
            <Text style={styles.modalTxt}>Votre somme débloquée</Text>
            <Text style={styles.modalNb}>{Math.floor((this.props.currentScore / this.props.totalScore) * 1000) / 10}%</Text>
          </View>
          :
          null
        }
        <Text style={styles.itemSplit}/>
        <View style={styles.modalBlock}>
          <Text style={styles.modalTxt}>Indice moyen des joueurs</Text>
          <Text style={styles.modalNb}>{Math.floor(1000 / this.props.players.length) / 10}%</Text>
        </View>
        <Text style={styles.itemSplit}/>
        <Text style={styles.modalResult}>VOS GAINS POTENTIELS</Text>
        <Text style={styles.modalResultNb}>{gain}€</Text>
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
        { this.props.program ?
          <View style={styles.subContainer}>
            <ScrollView>
              { /* HEADER */ }
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Text style={styles.headerTxt}>DUREE</Text>
                  <Text style={styles.headerTxt}>DE LA PARTIE</Text>
                  { this.props.programStatus && this.props.programStatus.timeMissing ?
                    <Timer
                      time={Math.ceil(this.props.programStatus.timeMissing / 1000)} //default starting time
                      textStyle={styles.timer} //default color black
                    />
                    :
                    <Text style={styles.waitingData}>--:--:--:--</Text>
                  }
                </View>
                <View style={styles.headerRight}>
                  <Text style={styles.headerTxt}>PARTIE</Text>
                  <Text style={styles.headerTxt}>EN COURS</Text>
                  { this.props.programStatus && this.props.programStatus.currentStage && this.props.programStatus.nbOfStages ?
                    <Text style={styles.fraction}>{this.props.programStatus.currentStage}/{this.props.programStatus.nbOfStages}</Text>
                    :
                    <Text style={styles.waitingData}>---/---</Text>
                  }
                </View>
              </View>
              { /* USER CONDITION */ }
              { this.props.currentScore && this.props.totalScore ?
                <View style={styles.walletBox}>
                  <Text style={styles.walletTitle}>Vous avez</Text>
                  <Text style={styles.walletTitle}>actuellement le</Text>
                  <Text style={styles.walletScore}>{Math.floor((this.props.currentScore / this.props.totalScore) * 1000) / 10}%</Text>
                  <Text style={styles.walletTitle}>du budget mensuel</Text>
                  <Button 
                    onPress={this.onShowModal}
                    containerStyle={styles.btn}
                    style={styles.btnTxt}
                  >
                    Estimer mes gains
                  </Button>
                </View>
                :
	              <View style={styles.chalWarning}>
	                <View  style={styles.emptyBoard}>
                  	<Text style={styles.walletTitle}>Aucun challenge auquel vous avez participé n'est terminé dans la partie en cours</Text>
	                </View>
	              </View>
              }
              { /* RANKING */ }
              { this.props.players && this.props.userId && this.props.totalScore && this.props.currentScore ?
	              <View style={styles.rankingBox}>
	                <Text style={styles.title}>MA POSITION</Text>
	                <ListRanking
	                  list={this.props.players}
	                  userId={this.props.userId}
	                  totalScore={this.props.totalScore}
	                  currentScore={this.props.currentScore}
	                />
	              </View>
	              :
	              null
              }
              { this.props.totalAmount ?
	              <View style={styles.total}>
	                <Text style={styles.totalTxt}>Total de Tricks pariés</Text>
	                <Text style={styles.totalBold}>{this.props.totalAmount ? this.props.totalAmount : 0}</Text>
	                <Text style={styles.totalSmall}>TRICKS</Text>
	              </View>
	              :
	              null
              }
            </ScrollView>
            { /* MODAL WINDOW FOR ESTIMATION */ }
            { this.props.currentScore && this.props.price && this.props.totalScore && this.props.players ?
	            <Modal
	              animationType={"slide"}
	              transparent={true}
	              visible={this.props.showMod}
	              onRequestClose={this.onShowModal}
	            >
	              <TouchableHighlight
	                style={styles.modalBack}
	                onPress={this.onShowModal}
	              >
	                <View style={styles.modalFront}>
	                  { this.modalContent() }
	                </View>
	              </TouchableHighlight>
	            </Modal>
	            :
	            null
            }
          </View>
          :
	      	<View style={styles.gifBox}>
	          <Image
	            style={styles.loading}
	            source={loading}
	          />
	      	</View>
        }
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Wallet.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    price: state.wallet.price,
    program: state.wallet.program,
    programStatus: state.wallet.programStatus,
    totalAmount: state.wallet.totalAmount,
    players: state.wallet.players,
    totalScore: state.wallet.totalScore,
    currentScore: state.wallet.currentScore,
    showMod: state.toogle.showMod
  };
}

export default connect(mapStateToProps)(Wallet);
