import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Button from 'react-native-button';
import styles from './styles';
import { readeableMonth } from '../../functions/profile';
import { formatDate } from '../../functions/program';

const open = require('../../img/down-arrow.png');

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class GainsByMonth extends React.Component {
  constructor() {
    super();
    this. _renderRow = this. _renderRow.bind(this);
  }
  _renderRow(rowData) {
    return (
      <View style={styles.listItem}>
        <Text style={styles.txtStage}>Partie n° {rowData.stage} :  <Text style={styles.txtBig}>{rowData.total}</Text> <Text style={styles.txtSmall}>{rowData.total === 1 ? 'TRICK' : 'TRICKS'}</Text></Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.lines}/>
        { this.props.list.length > 1 ?
	        <Button
	           onPress={() => this.props.toogleBox()}
	           containerStyle={styles.btn}
	        >
	          <Image
	            source={open}
	            style={this.props.show === false ? styles.btnIcon : styles.btnIconFlipped}
	          />
	        </Button>
	        :
	        null
        }
        { this.props.show === false ?
          <View style={styles.listItem}>
            <Text style={styles.txtStage}>Partie n° {this.props.list[0].stage} :  <Text style={styles.txtBig}>{this.props.list[0].total}</Text> <Text style={styles.txtSmall}>{this.props.list[0].total === 1 ? 'TRICK' : 'TRICKS'}</Text></Text>
          </View>
          :
          <ListView 
            dataSource={ds.cloneWithRows(this.props.list)}
            renderRow={this._renderRow}
            enableEmptySections
          />
        }
        <View style={styles.lines}/>
      </View>
    );
  }
}

export default GainsByMonth;
