import React from 'react';
import { StyleSheet, FlatList, View, Image, Text } from 'react-native';
import Button from 'react-native-button';
import styles from './styles';
import {
  color1,
  color2,
  white
} from '../../global/variables';

const defaultUser = require('../../img/avatar.png');

class ListComments extends React.Component {
  constructor() {
    super();
    this.content = this.content.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  content(rowData) {
    return (
      <View style={styles.innerBox}>
        <View
          // onPress={() => this.props.listFunction(rowData)}
          style={styles.item}
        >
          <View style={styles.itemLeft}>
            <Image
              source={rowData.img ? { uri: rowData.img, isStatic: true } : defaultUser}
              style={styles.img}
            />
          </View>
          <View style={styles.itemRight}>
            { rowData.commentatorId === this.props.userId ?
              <Text style={styles.commentator}>Moi</Text>
              :
              <Text style={styles.commentator}>{rowData.firstName} {rowData.familyName}</Text>
            }
            <Text style={styles.txt}>{rowData.comment}</Text>
          </View>
        </View>
        { rowData.previous === '0' ?
          <Button
            style={styles.responseBox}
            onPress={() => {
              this.props.showInputComment(rowData._id)
            }}
          >
            répondre
          </Button>
          :
          null
        }
      </View>
    );
  }
  renderContent(data) {
    if (data.item.previous === '0') {
      return (
        <View style={styles.itemBox}>
          { this.content(data.item) }
        </View>
      );
    } else {
      return (
        <View style={styles.itemBoxB}>
          { this.content(data.item) }
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.comments}
          renderItem={this.renderContent}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

export default ListComments;
