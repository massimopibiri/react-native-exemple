import React from 'react';
import { 
  StyleSheet,
  FlatList,
  View,
  Text,
  Image
} from 'react-native';
import Button from 'react-native-button';
import styles from './styles';
import { formatDate } from '../../functions/program';

const fnac = require('../../img/fnac.png');
const disney = require('../../img/disney.png');
const lafayette = require('../../img/lafayette.png');

class ListCurrentGains extends React.Component {
  constructor() {
    super();
    this.content = this.content.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.source = this.source.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.state ={
      refreshState: false
    };
  }
  source(title) {
    switch(title) {
      case 'fnac':
        return fnac;
      case 'lafayette':
        return lafayette;
      case 'disney':
        return disney;
      default:
        return fnac;
    }
  }
  content(rowData, gain = null) {
    return(
      <View style={this.props.selected && this.props.selected === rowData.title && this.props.type === 'toBuy' ? styles.listSelected : styles.listItem}>
        <View style={styles.img}>
          <Image
            source={this.source(rowData.title)}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain'
            }}
          />
        </View>
        { this.props.type !== 'toBuy' ?
          <Text style={styles.date}>{formatDate(rowData.date)}</Text>
          :
          null
        }
        { this.props.type === 'toBuy' ?
          <Text style={styles.price}>{gain} €</Text>
          :
          <Text style={styles.price}>{rowData.price} €</Text>
        }
      </View>
    );
  }
  // change the state everytime the list is updated just to force the component to re-render
  handleRefresh() {
    this.setState({refreshState: !this.state.refreshState});
  }
  renderContent(data) {
    if (this.props.type == 'toBuy') {
      const gain = Math.floor(this.props.gain * 10) / 10;
      return (
        <Button
          containerStyle={styles.listContent}
          onPress={() => {
          	this.props.select(data.item.title, Math.floor(this.props.gain * 10) / 10);
          	this.handleRefresh();
          }}
        >
          { this.content(data.item, gain) }
        </Button>
      );
    } else {
      return (
        <View style={styles.listContent}>
          { this.content(data.item) }
        </View>
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.list}
          renderItem={this.renderContent}
          keyExtractor={item => item._id}
          // that informs the component that the state changes
          extraData={this.state}
        />
      </View>
    );
  }
}

export default ListCurrentGains;
