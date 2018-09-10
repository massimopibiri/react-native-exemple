import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Switch
} from 'react-native';
import styles from './styles';

class ConfigBox extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.choice}>
          <Text style={styles.choiceTxt}>Vous êtes fumeur</Text>
          <Switch
            onValueChange={
              () => {
                this.props.onSetSmoker(this.props.isSmoker);
              }
            }
            value={this.props.isSmoker}
            onChange={this.onSwitcher}
            onTintColor='#d9577d'
            thumbTintColor='#ffffff'
            style={styles.choiceSwitch}
          />
        </View>
        <View style={styles.choice}>
          <Text style={styles.choiceTxt}>Vous avez une mauvaise alimentation</Text>
          <Switch
            onValueChange={
              () => {
                this.props.onSetBadEater(this.props.isBadEater);
              }
            }
            onTintColor='#d9577d'
            thumbTintColor='#ffffff'
            style={styles.choiceSwitch}
            // to use the component for the second page, initiate the values with the data retrieved from server
            value={this.props.isBadEater}
          />
        </View>
        { /* <View style={styles.choice}>
          <Text style={styles.choiceTxt}>Vous ne faites pas de sport</Text>
          <Switch
            onValueChange={
              () => {
                this.props.onSetBadSportsMan(this.props.isBadSportsMan);
              }
            }
            onTintColor='#d9577d'
            thumbTintColor='#ffffff'
            style={styles.choiceSwitch}
            // to use the component for the second page, initiate the values with the data retrieved from server
            value={this.props.isBadSportsMan}
          />
        </View>
        <View style={styles.choice}>
          <Text style={styles.choiceTxt}>Vous êtes stressé</Text>
          <Switch
            onValueChange={
              () => {
                this.props.onSetStressed(this.props.isStressed);
              }
            }
            onTintColor='#d9577d'
            thumbTintColor='#ffffff'
            style={styles.choiceSwitch}
            // to use the component for the second page, initiate the values with the data retrieved from server
            value={this.props.isStressed}
          />
        </View> */ }
      </View>
    );
  }
}

export default ConfigBox;
