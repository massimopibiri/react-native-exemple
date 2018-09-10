import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	Text,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import styles from './styles';
// components
import ListThemes from '../../components/ListThemes/ListThemes';
import {
	challengesIsEngagedInReset,
  checkIfOppEngaged
} from '../../actions';
import {
	subTabac,
	subFood
} from '../../global/challengeLists';
import {
  color1,
  color2
} from '../../global/variables';
import {
	revealFreeSubThemes
} from '../../functions/challenge';

const { width, height } = Dimensions.get('screen');
const down = require('../../img/down-arrow.png');

class SubTheme extends React.Component {
  constructor() {
    super();
    this. undo = this. undo.bind(this);
    this. chooseTheme = this. chooseTheme.bind(this);
    this. seeChallenges = this. seeChallenges.bind(this);
  }
  componentDidMount() {
  	// reset to avoid bugs
  	this.props.dispatch(challengesIsEngagedInReset());
  	// get the list of challenges the opponent is engaged in
    if (this.props.idProgram && this.props.selOpponent) {
      this.props.dispatch(checkIfOppEngaged(this.context.websocket, this.props.idProgram, this.props.selOpponent._id));
    }
  }
  undo() {
    Actions.pop();
  }
  chooseTheme(title) {
    if (title) {
      const data = {
        selOpponent: this.props.selOpponent,
        selTheme: this.props.selTheme,
        selSubTheme: title
      };
      Actions.lasting(data);
    }
  }
  seeChallenges() {
  	Actions.opponentChalls({opponent: this.props.selOpponent, theme: this.props.selTheme});
  }
  render() {
    let listToShow;
    switch (this.props.selTheme) {
      case 'tabac': listToShow = subTabac;
        break;
      case 'nutrition': listToShow = subFood;
        break;
      default:
        return listToShow = subTabac;
    }
    let listDefToShow;
    let showInternalButton = false;;
    if (this.props.listChallengesEngaged && listToShow) {
      listDefToShow = revealFreeSubThemes(this.props.showSubThemes === true, listToShow, this.props.listChallengesEngaged);
      if (listDefToShow && listDefToShow.length !== listToShow.length) {
        showInternalButton = true;
      }
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <LinearGradient
          start={{x: 1.0, y: 0.3}} end={{x: 0.5, y: 1.0}}
          locations={[0, 0.9]}
          colors={[color1, color2]}
          style={{position: 'absolute', width: width, height: height, top: 0, left: 0}}
        />
        { this.props.showSubThemes === true && listDefToShow && listDefToShow.length > 0 ?
	        <ListThemes
	          themes={listDefToShow}
	          chooseTheme={this.chooseTheme}
	          seeChallenges={this.seeChallenges}
	          origin='subtheme'
	          showInternalButton={showInternalButton}
	        />
	        :
	      	null
        }
        { /* showed when the user has already been challenged in all the categories */ }
        { this.props.showSubThemes === true && listDefToShow && listDefToShow.length === 0 ?
        	<View style={styles.emptyBox}>
          	<Text style={styles.emptyListTxt}>Votre collegue a déjà été défié dans toutes les catégories. Ses défis sont soit accéptés, soit en attente de validation.</Text>
          	<Text style={styles.emptyListTxt}>Vous pouvez malgré ça miser dans un de ses défis en cours.</Text>
            <View style={styles.rankingBtnContainer}>
              <Image
                source={down}
                style={styles.downArrow}
              />
            </View>
            <Button
              onPress={() => this.seeChallenges()}
              containerStyle={styles.btn}
              style={styles.btnTxt}
            >
              Voir ses défis
            </Button>
          </View>
        	:
        	null
        }
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
SubTheme.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    listChallengesEngaged: state.challenges.listChallenges,
    showSubThemes: state.challenges.showSubThemes
  };
}

export default connect(mapStateToProps)(SubTheme);
