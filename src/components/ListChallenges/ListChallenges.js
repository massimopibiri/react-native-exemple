import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  View,
  // Dimensions
} from 'react-native';
import styles from './styles';
import {
  color2,
  color3,
  color4,
  color9
} from '../../global/variables';
import BoardChallengeClickable from '../BoardChallenge/BoardChallengeClickable';
import BoardChallengeNotClickable from '../BoardChallenge/BoardChallengeNotClickable';

class ListChallenges extends React.Component {
  constructor() {
    super();
    this.renderContent = this.renderContent.bind(this);
  }
  renderContent(data) {
    let baseColor;
    switch (data.item.theme) {
      case 'tabac':
        baseColor = color3;
        break;
      case 'sport':
        baseColor = color4;
        break;
      case 'nutrition':
        baseColor = color2;
        break;
      case 'relax':
        baseColor = color9;
        break;
      default: baseColor = color3;
    }
    const specStyle = {
      flex: 1,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: baseColor
    };
    const imgBorder = {
      width: 45,
      height: 45,
      resizeMode: 'cover',
      borderWidth: 3,
      borderColor: baseColor,
      borderRadius: 22.5,
      marginBottom: 5
    };
    // render a not clickable tab if the opponent didn't accept the challenge
    if (specStyle && imgBorder) {
      if (
        (data.item.challenger === this.props.userId && data.item.confirmed === false)
        || this.props.origin === 'destFreeze'
      ) {
        return (
          <View>
            <BoardChallengeNotClickable
              data={data.item}
              specStyle={specStyle}
              imgBorder={imgBorder}
              userId={this.props.userId}
	            listFunction={this.props.listFunction}
	            origin={this.props.origin}
            />
          </View>
        );
      } else {
        return (
          <View>
            <BoardChallengeClickable
              data={data.item}
              specStyle={specStyle}
              imgBorder={imgBorder}
              userId={this.props.userId}
	            listFunction={this.props.listFunction}
	            origin={this.props.origin}
            />
          </View>
        );
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.list}
          renderItem={this.renderContent}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId
  };
}

export default connect(mapStateToProps)(ListChallenges);
