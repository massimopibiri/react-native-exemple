import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import { formatPosition } from '../../functions/program';
import styles from './styles';

const defaultUser = require('../../img/avatar.png');

class ListOpponents extends React.Component {
  constructor() {
    super();
    this.renderContent = this.renderContent.bind(this);
  }
  renderContent(data) {
    if (this.props.noFunction === false) {
      return (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.props.selectOpponent(data.item)}
        >
          <Image
            source={data.item && data.item.image ? { uri: data.item.image, isStatic: true } : defaultUser}
            style={styles.img}
          />
          <Text style={styles.list}>
            {data.item.firstName + ' ' + data.item.familyName}
          </Text>
        </TouchableOpacity>
      );
    } else {
      const val = formatPosition(parseInt(data.index, 10) + 1);
      return (
        <View
          style={styles.listItem}
        >
          <View style={styles.positionBox}>
            <Text style={styles.position}>{val.nb}</Text>
            <Text style={styles.cardinal}>{val.card}</Text>
          </View>
          <Image
            source={data.item && data.item.image ? { uri: data.item.image, isStatic: true } : defaultUser}
            style={styles.img}
          />
          <Text style={styles.list}>
            {data.item.firstName + ' ' + data.item.familyName}
          </Text>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreBold}>{data.item.score}</Text>
            <Text style={styles.score}>TRICKS</Text>
          </View>
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.users}
          renderItem={this.renderContent}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

export default connect(null)(ListOpponents);
