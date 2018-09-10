import React from 'react';
import { connect } from 'react-redux';
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
// components
import ListThemes from '../../components/ListThemes/ListThemes';
// function to clean the array from indesired values
import { formatPlayerTheme } from '../../functions/challenge';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class Theme extends React.Component {
  constructor() {
    super();
    this. undo = this. undo.bind(this);
    this. chooseTheme = this. chooseTheme.bind(this);
  }
  undo() {
    Actions.pop();
  }
  chooseTheme(title) {
    if (title) {
      const data = {
      	idProgram: this.props.idProgram,
        selOpponent: this.props.selOpponent,
        selTheme: title
      };
      Actions.subtheme(data);
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
        { !this.props.selOpponent.isSmoker && !this.props.selOpponent.isBadSportsMan && !this.props.selOpponent.isBadEater  && !this.props.selOpponent.isStressed ?
          <Text style={styles.warn}>Le collegue selectionné n'a pas encore parametré son profil</Text>
          :
          <ListThemes
            themes={formatPlayerTheme(this.props.selOpponent)}
            chooseTheme={this.chooseTheme}
            origin='theme'
          />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps)(Theme);
