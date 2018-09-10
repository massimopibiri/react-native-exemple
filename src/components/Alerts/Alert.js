import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback
} from 'react-native';
import {
	color2,
	color18
} from '../../global/variables';

import { removeAlert } from '../../actions';

const removeIc = require('./icones/remove.png');

class Alert extends React.Component {
  constructor() {
    super();
    this. onRemoveAlert = this. onRemoveAlert.bind(this);
  }
  onRemoveAlert() {
    this.props.dispatch(removeAlert(this.props.alert.id));
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRemoveAlert}>
        { this.props.alert.kind === 'danger' ?
          <View style={styles.containerDanger}>
            { this.props.noShowRemove && this.props.noShowRemove === true ? 
            	null
            	:
	            <View style={styles.removeBox}>
	              <Image
	                source={removeIc}
	                style={styles.removeIc}
	                resizeMode='cover'
	              />
	            </View>
            }
            <Text style={styles.textDanger}>
              {this.props.alert.text}
            </Text>
          </View>
          :
          <View style={styles.container}>
            { this.props.noShowRemove && this.props.noShowRemove === true ? 
            	null
            	:
	            <View style={styles.removeBox}>
	              <Image
	                source={removeIc}
	                style={styles.removeIc}
	                resizeMode='cover'
	              />
	            </View>
            }
            <Text style={styles.text}>
              {this.props.alert.text}
            </Text>
          </View>
        }
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  containerDanger: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: color18,
    borderColor: '#ebccd1',
    borderWidth: 2,
    borderRadius: 8,
    position: 'relative',
    zIndex: 1,
    marginBottom: 3
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: color2,
    borderColor: '#ebccd1',
    borderWidth: 2,
    borderRadius: 8,
    position: 'relative',
    zIndex: 1,
    marginBottom: 3
  },
  removeBox: {
    position: 'absolute',
    top: 4,
    right: 5,
    padding: 0,
    zIndex: 10,
  },
  removeIc: {
    height: 20,
    width: 20
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  textDanger: {
    color: 'white',
    backgroundColor: 'transparent'
  }
});

export default connect()(Alert);
