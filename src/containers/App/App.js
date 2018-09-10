import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, Image, View, NetInfo } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { Actions, Router, Scene, Reducer, ActionConst } from 'react-native-router-flux';
import * as Keychain from 'react-native-keychain';
import { BASIC_WS_URL } from '../../api';// library to encrypt and decrypt data
import SplashScreen from '../SplashScreen/SplashScreen';
import LogIn from '../LogIn/LogIn';
import Cgu from '../Cgu/Cgu';
import FirstConfig from '../FirstConfig/FirstConfig';
import RecoverPsw from '../RecoverPsw/RecoverPsw';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Challenge from '../Challenge/Challenge';
import Allchallenge from '../Allchallenge/Allchallenge';
import Theme from '../Theme/Theme';
import SubTheme from '../SubTheme/SubTheme';
import Lasting from '../Lasting/Lasting';
import Betting from '../Betting/Betting';
import DettFreeze from '../DettFreeze/DettFreeze';
import EndChallenge from '../EndChallenge/EndChallenge';
import Notifications from '../Notifications/Notifications';
import Freezes from '../Freezes/Freezes';
import IntroFreeze from '../IntroFreeze/IntroFreeze';
import PreviewFreeze from '../PreviewFreeze/PreviewFreeze';
import DestinationFreeze from '../DestinationFreeze/DestinationFreeze';
import DestinationFreezeChall from '../DestinationFreezeChall/DestinationFreezeChall';
import ConfirmFreeze from '../ConfirmFreeze/ConfirmFreeze';
import DettChallenge from '../DettChallenge/DettChallenge';
import Acceptance from '../Acceptance/Acceptance';
import Suspect from '../Suspect/Suspect';
import SideMenu from '../SideMenu/SideMenu';
import SideMenuLimited from '../SideMenuLimited/SideMenuLimited';
import Wallet from '../Wallet/Wallet';
import Shop from '../Shop/Shop';
import Parameters from '../Parameters/Parameters';
import UploadImg from '../UploadImg/UploadImg';
import Bonus from '../Bonus/Bonus';
import Infos from '../Infos/Infos';
import Players from '../Players/Players';
import ShowPlayers from '../ShowPlayers/ShowPlayers';
import Slide from '../Slides/Slide';
import PreviewImg from '../PreviewImg/PreviewImg';
import Cash from '../Cash/Cash';
import GenConfig from '../GenConfig/GenConfig';
import Temporary from '../Temporary/Temporary';
import OpponentChalls from '../OpponentChalls/OpponentChalls';
import PushService from '../../pushNotif/PushService';
import BadgeNotifs from '../../components/BadgeNotifs/BadgeNotifs';
import NavBar from '../../components/NavBar/NavBar';
import {
	resetAllAlert,
	setRouter,
	signinWithToken,
	notificationSignup,
	setNetInfo,
	savePushNotifAction
} from '../../actions';
import styles from './styles';

const io = require('socket.io-client/dist/socket.io');
const socketEvents = require('../../socketgate/events');
// remove yellow warnings
console.disableYellowBox = true;

const back = require('../../img/left.png');
const burger = require('../../img/burger.png');
const home = require('../../img/home.png');
const homeSel = require('../../img/homeTab.png');
const user = require('../../img/user.png');
const shop = require('../../img/shop.png');
const shopSel = require('../../img/shop-r.png');
const ranking = require('../../img/ranking.png');
const rankingSel = require('../../img/ranking-r.png');
const userSel = require('../../img/userTab.png');
const bell = require('../../img/bell.png');
const bellSel = require('../../img/notifTab.png');
const thunder2 = require('../../img/thunder2.png');
const thunder2Sel = require('../../img/freezeTab.png');

const TabIconHome = ({ selected, title }) => {
	if (selected) {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={homeSel}
	      />
	    </View>
		);
	} else {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={home}
	      />
	    </View>
		);
	}
};

const TabIconNotifs = ({ selected, title }) => {
	if (selected) {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={bellSel}
	      />
	    </View>
		);
	} else {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={bell}
	      />
	      <BadgeNotifs />
	    </View>
		);
	}
};

const TabIconProfile = ({ selected, title }) => {
	if (selected) {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={userSel}
	      />
	    </View>
		);
	} else {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={user}
	      />
	    </View>
		);
	}
};

const TabIconRanking = ({ selected, title }) => {
	if (selected) {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={rankingSel}
	      />
	    </View>
		);
	} else {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={ranking}
	      />
	    </View>
		);
	}
};

const TabIconShop = ({ selected, title }) => {
	if (selected) {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={shopSel}
	      />
	    </View>
		);
	} else {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={shop}
	      />
	    </View>
		);
	}
};

const TabIconFreeze = ({ selected, title }) => {
	if (selected) {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={thunder2Sel}
	      />
	    </View>
		);
	} else {
		return (
			<View style={styles.tabIcon}>
	      <Image
	        style={{
	        	flex: 1,
	        	width: null,
	        	height: 1,
	        	resizeMode: 'contain'
	        }}
	        source={thunder2}
	      />
	    </View>
		);
	}
};

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=>{
    return defaultReducer(state, action);
  }
};

class App extends Component {
  constructor() {
    super();
    this. burgerBtnGetToSideMenu = this. burgerBtnGetToSideMenu.bind(this);
    this. getToHome = this. getToHome.bind(this);
    this. getToSidemenuToHome = this. getToSidemenuToHome.bind(this);
    this. getToFreeze = this. getToFreeze.bind(this);
    this. handleConnectionChange = this. handleConnectionChange.bind(this);
    this. handleOnPushRegister = this. handleOnPushRegister.bind(this);
    this. handleOnPushNotification = this. handleOnPushNotification.bind(this);
    this. globalSocketInit = this. globalSocketInit.bind(this);
    this. getToLogin = this. getToLogin.bind(this);
  }
  state = {}
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  async globalSocketInit() {
  	const secret = await Keychain.getGenericPassword();
  	// use the userId retrieved from keychain under the name of 'username'
  	if (secret && secret.username) {
      // initialize the socket connection with the passwordToken
      const websocket = await io(BASIC_WS_URL, {
        jsonp: false,
        // forceNew:true,
        transports: ['websocket'], // you need to explicitly tell it to use websockets
        query: {
          token: secret.password
        }
      });
      // connect to socket
      await websocket.connect();
      await websocket.on('connect', (socket) => {});
      await websocket.on('reconnect', (socket) => {});
      await websocket.on('disconnect', (socket) => {});
      await websocket.on('error', (error) => {});
    	await this.setStateAsync({websocket: websocket});
    	await socketEvents(websocket, this.context.store);
  	}
  }
  handleOnPushRegister(data) {
	  this.props.dispatch(notificationSignup(this.state.websocket, data));
  }
  handleOnPushNotification(data) {
  	if (data && data.action) {
  		this.props.dispatch(savePushNotifAction(data.action, data.challengeId));
  	}
  }
  // Turn the function into async to be able to retrieve the keychain
  async componentDidMount() {
    // check if there is connection
    await NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
    await NetInfo.isConnected.fetch().done((isConnected) => {
    	this.props.dispatch(setNetInfo(isConnected));
    });
    // verify signature in the server
    await this.props.dispatch(signinWithToken());
    // initialize socket.io
    await this.globalSocketInit();
  	// add the correspondig functions to the pushService class -> in this way we can retrieve the result of the class process
    await PushService.setCallbacks(this.handleOnPushRegister, this.handleOnPushNotification);
  }
  componentWillUnmount() {
    if (this.state.websocket) {
      this.state.websocket.disconnect();
    }
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }
	handleConnectionChange(isConnected) {
  	this.props.dispatch(setNetInfo(isConnected));
	}
  burgerBtnGetToSideMenu() {
    return (
      <TouchableOpacity
        onPress={() => Actions.sidemenu()}
      >
        <Image
          style={styles.burger}
          source={require('../../img/burger.png')}
        />
      </TouchableOpacity>
    );
  }
  getGeneralBack() {
    return (
      <TouchableOpacity
        onPress={() => Actions.pop()}
      >
        <Image
          style={styles.back}
          source={back}
        />
      </TouchableOpacity>
    );
  }
  getToSideNav() {
    return (
      <TouchableOpacity
        onPress={() => Actions.sidemenu()}
      >
        <Image
          style={styles.back}
          source={back}
        />
      </TouchableOpacity>
    );
  }
  getToLogin() {
    return (
      <TouchableOpacity
        onPress={() => Actions.login()}
      >
        <Image
          style={styles.back}
          source={back}
        />
      </TouchableOpacity>
    );
  }
  getToHome() {
    return (
      <TouchableOpacity
        onPress={() => Actions.home()}
      >
        <Image
          style={{ width: 19, height: 19, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
          source={require('../../img/remove.png')}
        />
      </TouchableOpacity>
    );
  }
  getToNotifs() {
    return (
      <TouchableOpacity
        onPress={() => Actions.notif()}
      >
        <Image
          style={{ width: 19, height: 19, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
          source={require('../../img/remove.png')}
        />
      </TouchableOpacity>
    );
  }
  getToFreezeToHome() {
    return (
      <TouchableOpacity
        onPress={() => {
        	Actions.introfreeze();
        	Actions.home();
        }}
      >
        <Image
          style={{ width: 19, height: 19, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
          source={require('../../img/remove.png')}
        />
      </TouchableOpacity>
    );
  }
  getToSidemenuToHome() {
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.sidemenu();
          Actions.home();
        }}
      >
        <Image
          style={{ width: 19, height: 19, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
          source={require('../../img/remove.png')}
        />
      </TouchableOpacity>
    );
  }
  getToFreeze() {
    return (
      <TouchableOpacity
        onPress={() => {Actions.freeze();}}
      >
        <Image
          style={{ width: 19, height: 19, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
          source={require('../../img/remove.png')}
        />
      </TouchableOpacity>
    );
  }
  getToProfilGen() {
    return (
      <TouchableOpacity
        onPress={() => Actions.profilgen()}
      >
        <Image
          style={{ width: 19, height: 19, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
          source={require('../../img/remove.png')}
        />
      </TouchableOpacity>
    );
  }
  getToSidemenuToProfilGen() {
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.sidemenu();
        	Actions.profilgen();
        }}
      >
        <Image
          style={{ width: 22, height: 22, marginRight: 15 }}
          source={require('../../img/remove.png')}
        />
      </TouchableOpacity>
    );
  }
  getChildContext() {
    return {websocket: this.state.websocket};
  }
  render() {
  	// this.props.dispatch(resetAllAlert());
  	// displayed until we get the response from server about which router configuration to displlay
  	if (!this.props.executed || this.props.executed !== true) {
  		return (
  			<SplashScreen />
  		);
  	// router and structure displayed if the program is finished
  	} else if (this.props.limitedRouter && this.props.limitedRouter === true) {
	    return (
        <Router createReducer={reducerCreate}>
          <Scene key='root'>
            <Scene
              key='splashscreen'
              component={SplashScreen}
              hideNavBar
              initial
              type={ActionConst.REPLACE}
            />
            <Scene 
              key='login'
              component={LogIn}
              title='IDENTIFIEZ-VOUS'
              type={ActionConst.REPLACE}
              navigationBarStyle={styles.navBar}
              navTransparent
              titleStyle={styles.navBarTitle}
            />
            <Scene 
              key='temporary' 
              component={Temporary}
              title='STAND BY'
              navigationBarStyle={styles.navBar}
              navTransparent
              renderBackButton={this.getToLogin}
              titleStyle={styles.navBarTitle}
              type={ActionConst.REPLACE}
            />
            <Scene 
              key='recoverpsw' 
              component={RecoverPsw}
              title='MOT DE PASSE OUBLIÈ'
              navigationBarStyle={styles.navBar}
              navTransparent
              titleStyle={styles.navBarTitle}
              renderBackButton={this.getToLogin}
              type={ActionConst.REPLACE}
            />
            {/* PRESENTATION (displayed just at the first connection) */}
            <Scene 
              key='cgu'
              component={Cgu}
              navigationBarStyle={styles.navBar}
              navTransparent
              hideNavBar
              type={ActionConst.REPLACE}
            />
            <Scene 
              key='firstconfig'
              component={FirstConfig}
              navigationBarStyle={styles.navBar}
              navTransparent
              hideNavBar
              type={ActionConst.REPLACE}
            />
            {/* TABS MENU */}
            <Scene 
              key='tabbar'
              tabs
              hideNavBar 
              // tabBarStyle={{ backgroundColor: 'white' }}
              type={ActionConst.REPLACE}
            >
              <Scene key='profilgen' title='Profile' icon={TabIconProfile}>
                <Scene 
                  key='profile'
                  component={Profile}
                	title='BIENVENUE'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                	// renderRightButton={this.burgerBtnGetToSideMenu}
                />
              </Scene>
              <Scene key='shop' title='Shop' icon={TabIconShop}>
                <Scene 
                  key='shopCont'
                  component={Shop}
                  title='BOUTIQUE'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                	// renderRightButton={this.burgerBtnGetToSideMenu}
                />
              </Scene>
              <Scene key='players' title='Classement' icon={TabIconRanking}>
                <Scene 
                  key='playersCont'
                  component={Players}
                  title='CLASSEMENT PAR...'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                	// renderRightButton={this.burgerBtnGetToSideMenu}
                />
                <Scene 
                  key='showplayers'
                  component={ShowPlayers}
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                  title='JOUEURS'
                  hideTabBar
                  renderBackButton={this.getGeneralBack}
                  // renderRightButton={this.getToProfilGen}
                />
              </Scene>
              {/* OTHER NOT IN TAB */}
              <Scene key='sidemenu' title='SideMenu'>
                <Scene 
                  key='sidemenuCont'
                  component={SideMenuLimited}
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                  // renderRightButton={this.getToProfilGen}
                  hideTabBar
                />
                <Scene 
                  key='infos'
                  component={Infos}
                  title='TRICKY VOUS CONSEIL SUR'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                  renderBackButton={this.getGeneralBack}
                  // renderRightButton={this.getToSidemenuToProfilGen}
                  hideTabBar
                />
                <Scene 
                  key='parameters'
                  component={Parameters}
                  title='PARAMETRES'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                  renderBackButton={this.getToSideNav}
                  // renderRightButton={this.getToSidemenuToProfilGen}
                  hideTabBar
                />
			          <Scene 
			            key='genconfig'
			            component={GenConfig}
                  title='CONFIGURATION'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                  renderBackButton={this.getGeneralBack}
                  // renderRightButton={this.getToSidemenuToProfilGen}
                  hideTabBar
			          />
                <Scene 
                  key='uploadimg'
                  component={UploadImg}
                  title='PRENDS UN SELFIE'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                  renderBackButton={this.getGeneralBack}
                  // renderRightButton={this.getToSidemenuToProfilGen}
                />
                <Scene 
                  key='previewimg'
                  component={PreviewImg}
                  title='L IMAGE T ARRANGE?'
                	navigationBarStyle={styles.navBar}
                  navTransparent
                	titleStyle={styles.navBarTitle}
                  renderBackButton={this.getGeneralBack}
                  // renderRightButton={this.getToSidemenuToProfilGen}
                />
              </Scene>
            </Scene>
          </Scene>
        </Router>
	    );
  	// router and structure displayed if the program is NOT finished
  	} else {
	    return (
        <Router createReducer={reducerCreate}>
  	      <Scene key='root'>
            <Scene
              key='splashscreen'
              component={SplashScreen}
              hideNavBar
              initial
              type={ActionConst.REPLACE}
            />
            <Scene 
              key='login'
              component={LogIn}
              title='IDENTIFIEZ-VOUS'
              type={ActionConst.REPLACE}
              navigationBarStyle={styles.navBar}
              navTransparent
              titleStyle={styles.navBarTitle}
            />
            <Scene 
              key='recoverpsw' 
              component={RecoverPsw}
              title='MOT DE PASSE OUBLIÈ'
              navigationBarStyle={styles.navBar}
              navTransparent
              renderBackButton={this.getToLogin}
              titleStyle={styles.navBarTitle}
              type={ActionConst.REPLACE}
            />
            <Scene 
              key='temporary' 
              component={Temporary}
              title='STAND BY'
              navigationBarStyle={styles.navBar}
              navTransparent
              renderBackButton={this.getToLogin}
              titleStyle={styles.navBarTitle}
              type={ActionConst.REPLACE}
            />
            {/* PRESENTATION (displayed just at the first connection) */}
            <Scene 
              key='cgu'
              component={Cgu}
              navigationBarStyle={styles.navBar}
              navTransparent
              hideNavBar
              type={ActionConst.REPLACE}
            />
            <Scene key='firstIntro' type={ActionConst.REPLACE}>
  	          <Scene
  	            key='slide'
  	            component={Slide}
  	            hideNavBar
  	            format='intro'
  	          />
  	          <Scene 
  	            key='firstconfig'
  	            component={FirstConfig}
  	            navigationBarStyle={styles.navBar}
                navTransparent
  	            hideNavBar
  	          />
  	        </Scene>
              {/* TABS MENU */}
              <Scene 
                key='tabbar'
                tabs
                hideNavBar 
                // tabBarStyle={{ backgroundColor: 'white' }}
                type={ActionConst.REPLACE}
              >
                {/* HOME PAGE */}
                <Scene key='home' title='Home' icon={TabIconHome}>
                  <Scene
                    key='main'
                    component={Main}
                  	title='BIENVENUE'
                    // navBar={NavBar}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                  	// renderRightButton={this.burgerBtnGetToSideMenu}
                  	// globalSocketInit={this.globalSocketInit}
                    type={ActionConst.REPLACE}
                  	// websocket={this.state.websocket}
                  />
  			          <Scene
  			            key='tutorial'
  			            component={Slide}
                  	title='TUTORIAL'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
  			          />
                  <Scene 
                    key='shopMain'
                    component={Shop}
                    title='BOUTIQUE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                  />
                  <Scene 
                    key='walletMain'
                    component={Wallet}
                    title='CAGNOTTE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='bonusMain'
                    component={Bonus}
                    title='GAGNEZ DES TRICKS'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  {/* CHALLENGE PATH */}
                  <Scene 
                    key='challenge'
                    component={Challenge}
                    title='CHALLENGEZ UN JOUEUR'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene
                    key='allchallenge'
                    component={Allchallenge}
                    title='TOUS LES DEFIS'
                    navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                    // renderLeftButton={NavigationItems.menuButton}
                  />
                  <Scene 
                    key='theme'
                    component={Theme}
                    title='LE THEME DU DEFI'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='subtheme'
                    component={SubTheme}
                    title='LE SOUS-THEME'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='lasting'
                    component={Lasting}
                    title='COMBIEN DE TEMPS ?'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='betting'
                    component={Betting}
                    title='COMBIEN VOUS PARIEZ ?'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='endchallenge'
                    component={EndChallenge}
                    title='CONFIRMATION'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  {/* OPPONENT CHALLENGES */}
                  <Scene 
                    key='opponentChalls'
                    component={OpponentChalls}
                    title='...SES DÉFIS'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  {/* DETAIL CHALLENGES */}
                  <Scene 
                    key='dettchallenge'
                    component={DettChallenge}
                    title='DÉTAILS DU DÉFI'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                    origin='main'
                  />
                  <Scene 
                    key='dettFreeze'
                    component={DettFreeze}
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToHome}
                    hideTabBar
                    origin='challenge'
                  />
                  <Scene 
                    key='acceptance'
                    component={Acceptance}
                    title='VOUS AVEZ ETE DEFIE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='notificationshome'
                    component={Notifications}
                    title='NOTIFICATIONS'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    // renderRightButton={this.getToHome}
                    renderBackButton={this.getGeneralBack}
                  />
                  <Scene 
                    key='freezesChall'
                    component={Freezes}
                    hideTabBar
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToHome}
                  />
                  <Scene 
                    key='suspectChall'
                    component={Suspect}
                    title='SUSPICION'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToFreeze}
                    hideTabBar
                  />
                  <Scene 
                    key='previewfreezeChall'
                    component={PreviewFreeze}
                    hideTabBar
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToHome}
                  />
                  <Scene 
                    key='destinationFreezeChall'
                    component={DestinationFreezeChall}
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='confirmfreezeChall'
                    component={ConfirmFreeze}
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='dettchallengeChall'
                    component={DettChallenge}
                    title='RECAP DU DEFI'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={()=>(null)}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                </Scene>
                {/* NOTIFICATIONS PAGE */}
                <Scene key='notif' title='NOTIFICATIONS' icon={TabIconNotifs}>
                  <Scene 
                    key='notifications'
                    component={Notifications}
                    title='NOTIFICATIONS'
                    // renderRightButton={this.burgerBtnGetToSideMenu}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    type={ActionConst.REPLACE}
                  />
  			          <Scene
  			            key='tutorialNot'
  			            component={Slide}
                  	title='TUTORIAL'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToNotifs}
                    hideTabBar
  			          />
                  {/* DETAIL CHALLENGES */}
                  <Scene 
                    key='dettchallengenot'
                    component={DettChallenge}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    title='DÉTAILS DU DÉFI'
                    // renderRightButton={this.getToNotifs}
                    hideTabBar
                    origin='notif'
                  />
                  <Scene 
                    key='dettFreezeNot'
                    component={DettFreeze}
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToNotifs}
                    hideTabBar
                    origin='notifs'
                  />
                  <Scene 
                    key='acceptanceNot'
                    component={Acceptance}
                    title='VOUS AVEZ ETE DEFIE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToNotifs}
                    hideTabBar
                  />
                </Scene>
                {/* PROFILE PAGE */}
                <Scene key='profilgen' title='VOTRE PROFIL' icon={TabIconProfile}>
                  <Scene 
                    key='profile'
                    component={Profile}
                    title='VOTRE PROFIL'
                    // renderRightButton={this.burgerBtnGetToSideMenu}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    type={ActionConst.REPLACE}
                  />
                </Scene>
                {/* FREEZES PAGE */}
                <Scene key='freeze' title='FREEZES' icon={TabIconFreeze}>
                  <Scene 
                    key='introfreeze'
                    component={IntroFreeze}
                    title='FREEZES'
                    // renderRightButton={this.burgerBtnGetToSideMenu}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                  	type={ActionConst.REPLACE}
                  />
                  <Scene 
                    key='freezes'
                    component={Freezes}
                    hideTabBar
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToFreezeToHome}
                  />
                  <Scene 
                    key='previewfreeze'
                    component={PreviewFreeze}
                    hideTabBar
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToFreezeToHome}
                  />
                  <Scene 
                    key='destinationfreeze'
                    component={DestinationFreeze}
                    title='SELECTIONNER UN UTILISATEUR'
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    // renderRightButton={this.getToFreezeToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='confirmfreeze'
                    component={ConfirmFreeze}
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                    // renderRightButton={this.getToFreezeToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='dettchallengefreeze'
                    component={DettChallenge}
                    title='DETAIL DU CHALLENGE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    // renderRightButton={this.getToFreezeToHome}
                    renderBackButton={()=>(null)}
                    hideTabBar
                  />
                  <Scene 
                    key='suspect'
                    component={Suspect}
                    title='SUSPICION'
                    renderBackButton={this.getGeneralBack}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    // renderRightButton={this.getToFreezeToHome}
                    hideTabBar
                  />
                </Scene>
                {/* OTHER NOT IN TAB */}
                <Scene key='sidemenu' title='SideMenu'>
                  <Scene
                    key='sidemenuCont'
                    component={SideMenu}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    // renderRightButton={this.getToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='players'
                    component={Players}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    title='CLASSEMENT PAR...'
                    hideTabBar
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                  />
                  <Scene 
                    key='showplayers'
                    component={ShowPlayers}
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    title='JOUEURS'
                    hideTabBar
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                  />
                  <Scene
                    key='allchallengeSide'
                    component={Allchallenge}
                    title='TOUS LES DEFIS'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='cash'
                    component={Cash}
                    title='DEBLOQUER DES BONUS'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='wallet'
                    component={Wallet}
                    title='CAGNOTTE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='shop'
                    component={Shop}
                    title='BOUTIQUE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                  />
                  <Scene 
                    key='bonus'
                    component={Bonus}
                    title='GAGNEZ DES TRICKS'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='infos'
                    component={Infos}
                    title='TRICKY VOUS CONSEIL SUR'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                    hideTabBar
                  />
                  <Scene 
                    key='parameters'
                    component={Parameters}
                    title='PARAMETRES'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getToSideNav}
                    // renderRightButton={this.getToSidemenuToHome}
                    hideTabBar
                  />
  			          <Scene 
  			            key='genconfig'
  			            component={GenConfig}
                    title='CONFIGURATION'
                  	navigationBarStyle={styles.navBar}
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                    hideTabBar
  			          />
                  <Scene 
                    key='uploadimg'
                    component={UploadImg}
                    title='PRENDS UN SELFIE'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                  />
                  <Scene 
                    key='previewimg'
                    component={PreviewImg}
                    title='L IMAGE T ARRANGE?'
                  	navigationBarStyle={styles.navBar}
                    navTransparent
                  	titleStyle={styles.navBarTitle}
                    renderBackButton={this.getGeneralBack}
                    // renderRightButton={this.getToSidemenuToHome}
                  />
                </Scene>
              </Scene>
          </Scene>
        </Router>
	    );
  	}
  }
}
App.childContextTypes = {
  websocket: PropTypes.object
}
// access context.type to get the store to pass to socket.io initialization
App.contextTypes = {
  store: PropTypes.object
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    limitedRouter: state.programData.limitedRouter,
    idProgram: state.profileDett.idProgram,
    executed: state.programData.executed,
    nbNewNotifs: state.notifications.nbNewNotifs
  };
}

export default connect(mapStateToProps)(App);
