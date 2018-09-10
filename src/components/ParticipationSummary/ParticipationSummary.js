import React from 'react';
import { StyleSheet, FlatList, View, Text, Image } from 'react-native';
import styles from './styles';

const avatar = require('../../img/avatar.png');

class ParticipationSummary extends React.Component {
  constructor() {
    super();
    this.renderContent = this.renderContent.bind(this);
  }
  renderContent(data) {
  	let role;
  	const indexChallenger = this.props.list.map((single) => {return single.fielded;}).indexOf('challenger');
  	const indexOpponent = this.props.list.map((single) => {return single.fielded;}).indexOf('opponent');

  	if (data.item.fielded === 'opponent' && indexChallenger < 0 && data.item._id === this.props.userId) { // opponent did not start a match
  		role = 'j\'ai été défié';
  	} 
  	else if (data.item.fielded === 'opponent' && indexChallenger < 0) {
  		role = 'a été défié';
  	} 
  	else if (data.item.fielded === 'opponent' && indexChallenger >= 0 && data.item._id === this.props.userId) {
  		role = 'j\'ai été défié(e) et j\ai relancé';
  	} 
  	else if (data.item.fielded === 'opponent' && indexChallenger >= 0) {
  		role = 'a été défié(e) et a relancé';
  	} 
  	else if (data.item.fielded === 'challenger' && indexChallenger < 0 && data.item._id === this.props.userId) {
  		role = 'j\'ai défié';
  	} 
  	else if (data.item.fielded === 'challenger' && indexChallenger < 0) {
  		role = 'a défié';
  	} 
  	else if (data.item.fielded === 'challenger' && indexChallenger >= 0 && data.item._id === this.props.userId) {
  		role = 'j\'ai défié(e) et j\ai été relancé';
  	} 
  	else if (data.item.fielded === 'challenger' && indexChallenger >= 0) {
  		role = 'a défié et a été relancé(e)';
  	} 
  	else if (data.item.fielded === 'againts' && indexChallenger < 0 && data.item._id === this.props.userId) {
  		role = 'j\'ai misé pour la défaite';
  	} 
  	else if (data.item.fielded === 'againts' && indexChallenger < 0) {
  		role = 'a misé pour la défaite';
  	} 
  	else if (data.item.fielded === 'againts' && indexChallenger >= 0 && data.item._id === this.props.userId) {
  		role = 'j\'ai misé pour ' + this.props.list[indexChallenger].firstName;
  	} 
  	else if (data.item.fielded === 'againts' && indexChallenger >= 0) {
  		role = 'a misé pour ' + this.props.list[indexChallenger].firstName;
  	} 
  	else if (data.item.fielded === 'both' && data.item._id === this.props.userId) {
  		role = 'j\'ai misé pour la victoire des deux';
  	} 
  	else if (data.item.fielded === 'both') {
  		role = 'a misé pour la victoire des deux';
  	} 
  	else if (data.item.fielded === 'for' && indexChallenger < 0 && data.item._id === this.props.userId) {
  		role = 'j\'ai misé pour la réussite';
  	} 
  	else if (data.item.fielded === 'for' && indexChallenger < 0) {
  		role = 'a misé pour la réussite';
  	} 
  	else if (data.item.fielded === 'for' && indexChallenger >= 0 && data.item._id === this.props.userId) {
  		role = 'j\'ai misé pour ' + this.props.list[indexOpponent].firstName;
  	} 
  	else if (data.item.fielded === 'for' && indexChallenger >= 0) {
  		role = 'a misé pour ' + this.props.list[indexOpponent].firstName;
  	} 
  	else {
  		role = '';
  	}
    return (
      <View style={styles.listItem}>
        <View style={styles.blur}/>
        <Image
          source={data.item.image ? { uri: data.item.image, isStatic: true } : avatar}
          style={styles.img}
          resizeMode='cover'
        />
        <View style={styles.nameSection}>
          { data.item._id === this.props.userId ?
            <Text style={styles.nameTxt}><Text style={styles.bold}>MOI</Text></Text>
            :
            <Text style={styles.nameTxt}>{data.item.firstName} {data.item.familyName}</Text>
          }
          <Text style={styles.roleTxt}><Text style={styles.bold}>{role}</Text></Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.tricksTxt2}>{data.item.amount}</Text>
          <Text style={styles.tricksTxt3}>TRICKS</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.tricksTxt2}>{data.item.score}</Text>
          <Text style={styles.tricksTxt3}>TRICKS</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        { this.props.list ?
          <FlatList
            data={this.props.list}
            renderItem={this.renderContent}
            keyExtractor={item => item._id}
          />
          :
          <Text>...loading</Text>
        }
      </View>
    );
  }
}

export default ParticipationSummary;
