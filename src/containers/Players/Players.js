import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	FlatList,
	Text,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import styles from './styles';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
import { byCategories } from '../../global/lists';
import {
  showDett,
  selectArg,
  getServices
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const down = require('../../img/down-arrow.png');

class Players extends React.Component {
  constructor() {
    super();
    this.subMenu = this.subMenu.bind(this);
    this.select = this.select.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderContentInt = this.renderContentInt.bind(this);
    this.state ={
      refreshState: false
    };
  }
  componentDidMount() {
    // if the user is not logged, redirect to LogIn
    if (!this.props.userId) {
      Actions.login();
    //  if the user is logged, load infos
    } else {
      this.props.dispatch(getServices(this.context.websocket));
    }
  }
  // change the state everytime the list is updated just to force the component to re-render
  handleRefresh() {
    this.setState({refreshState: !this.state.refreshState});
  }
  renderContentInt(data) {
    return (
  		<Button
  		  containerStyle={styles.subItem}
        style={styles.subTxt}
  	  	onPress={() => Actions.showplayers({arg: this.props.arg, subArg: data.item.arg})}
  		>
  		  {data.item.title}
  		</Button>
    );
  }
  subMenu(list) {
  	return (
      <FlatList 
        data={list}
          renderItem={this.renderContentInt}
          keyExtractor={item => item.arg}
      />
  	);
  }
  select(arg) {
  	this.props.dispatch(selectArg(arg));
  	if (arg === this.props.arg || this.props.show === false) {
  	  this.props.dispatch(showDett(this.props.show));
  	}
  }
  renderContent(data) {
    return (
    	<View style={styles.itemWrapper}>
        { this.props.show === true && data.item.arg === this.props.arg ?
          <View style={styles.backBlur}/>
          :
          null
        }
        { this.props.show === true && data.item.arg === this.props.arg ?
          <Image
            source={down}
            style={styles.iconFliped}
          />
          :
          <Image
            source={down}
            style={styles.icon}
          />
        }
    	  { data.item.list.length > 0 ?
  	  	  <Button
  	  	    containerStyle={styles.item}
  	  	    onPress={() => {
  	  	    	this.select(data.item.arg);
  	  	    	this.handleRefresh();
  	  	    }}
            style={styles.txt}
  	  	  >
  	  	    {data.item.title}
  	  	  </Button>
  	  	  :
  	  	  <Button
  	  	    containerStyle={styles.item}
  	  	    onPress={() => Actions.showplayers({arg: data.item.arg})}
            style={styles.txt}
  	  	  >
  	  	    {data.item.title}
  	  	  </Button>
  	  	}
	  	  { this.props.show === true && data.item.arg === this.props.arg ?
	  	  	this.subMenu(data.item.list)
	  	  	:
	  	  	null
	  	  }
  	  </View>
    );
  }
  render() {
  	// add the list of services retrieved from server to the hard-coded array
  	byCategories[0].list = this.props.services;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
        <LinearGradient
          start={{x: 1.0, y: 0.3}} end={{x: 0.5, y: 1.0}}
          locations={[0, 0.9]}
          colors={[color1, color2]}
          style={{position: 'absolute', width: width, height: height, top: 0, left: 0}}
        />
        <FlatList 
          data={byCategories}
          renderItem={this.renderContent}
          keyExtractor={item => item.arg}
          // that informs the component that the state changes
          extraData={this.state}
        />
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Players.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    starting: state.categories.starting,
    lasting: state.categories.lasting,
    services: state.categories.services,
    show: state.categories.show,
    arg: state.categories.arg
  };
}

export default connect(mapStateToProps)(Players);
