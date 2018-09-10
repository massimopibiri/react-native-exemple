import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import ContainerAlerts from '../../components/Alerts/ContainerAlerts';
// components
import ListGains from '../../components/ListGains/ListGains';
import { gainData } from '../../global/lists';
import {
  conditionInEuros,
  resetPushNotifAction,
  buy,
  selectToBuy
} from '../../actions';
import {
  color1,
  color2
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

class Shop extends React.Component {
  constructor() {
    super();
    this.select = this.select.bind(this);
    this.buy = this.buy.bind(this);
    this.state = {bought: false};
  }
  componentDidMount() {
    // if the user is not logged, redirect to LogIn
    if (!this.props.userId) {
      Actions.login();
    //  if the user is logged, load infos
    } else {
      this.props.dispatch(conditionInEuros(this.context.websocket));
    }
    // reset the push notification action to avoid redirecting again 
  	this.props.dispatch(resetPushNotifAction());
  }
  select(title, price) {
    if (title, price) {
      this.props.dispatch(selectToBuy(title, price));
    }
  }
  buy() {
  	if (this.props.selectedToBuy && this.props.selectedToBuy.title) {
    	this.props.dispatch(buy(this.context.websocket, this.props.selectedToBuy.title, this.props.selectedToBuy.price));
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
        <ScrollView>
          <View style={styles.resume}>
            <Text style={styles.resume_p}>Votre cagnotte réelle.</Text>
            <Text style={styles.resume_p}>Vous avez gagné:</Text>
            <Text style={styles.resume_h}>{this.props.gain ? Math.floor(this.props.gain * 10) / 10 : 0} €</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.resume_p}>Selectionnez la carte cadeau</Text>
            <Text style={styles.resume_p}>que vous voulez acheter</Text>
          </View>
          { this.props.gain > 0 ?
            <ListGains
              list={gainData}
              type={'toBuy'}
              select={this.select}
              gain={this.props.gain}
              products={this.props.products}
              selected={this.props.selectedToBuy && this.props.selectedToBuy.title ? this.props.selectedToBuy.title : null}
            />
            :
            <View style={styles.chalWarning}>
              <View  style={styles.emptyBoard}>
                <Text style={styles.noChals}>Un peu de patience, il faudra attendre la fin de la partie pour convertir vos points en chèques cadeaux.</Text>
              </View>
            </View>
          }
          { this.props.gain && this.props.gain > 0  && this.state.bought === false ?
            <Button
              onPress={() => this.buy()}
              containerStyle={styles.btn}
              style={styles.btnTxt}
            >
              Acheter
            </Button>
            :
            null
          }
          { this.props.gain && this.props.gain > 0  && this.state.bought === true ?
            <View style={styles.btnBgt}>
              <Text style={styles.btnTxtBgt}>Attendre...</Text>
            </View>
            :
            null
          }
          <View style={styles.title2}>
            <Text style={styles.txtSections}>MES CARTES CADEAUX ACHETEES</Text>
          </View>
          { this.props.products && this.props.products.length > 0 ?
            <ListGains
              list={this.props.products}
              products={this.props.products}
              type={'bought'}
            />
            :
            <View style={styles.chalWarning}>
              <View  style={styles.emptyBoard}>
                <Text style={styles.noChals}>Vous n'avez pas encore de carte cadeau</Text>
              </View>
            </View>
          }
        </ScrollView>
        <ContainerAlerts />
      </View>
    );
  }
}
// access context.type to get the store to pass to socket.io initialization
Shop.contextTypes = {
  store: PropTypes.object,
  websocket: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    gain: state.wallet.gain,
    products: state.wallet.products,
    selectedToBuy: state.toogle.selectedToBuy
  };
}

export default connect(mapStateToProps)(Shop);
