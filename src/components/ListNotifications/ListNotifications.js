import React from 'react';
import {
	AsyncStorage,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import styles from './styles';
import {
	white,
	whiteD,
  color1,
  color2,
  color3,
  color4,
  color8,
  color9,
  color11,
  color13,
  color14,
  color15,
  color16,
  color17
} from '../../global/variables';
import { markSingleNotif, timerNotifs } from '../../functions/notifs';

const tabac = require('../../img/tabacBtnSmall.png');
const sport = require('../../img/sportBtnSmall.png');
const food = require('../../img/foodBtnSmall.png');
const relax = require('../../img/relaxBtnSmall.png');
const imgWidth = 52;

const defaultUser = require('../../img/avatar.png');

class ListNotifications extends React.Component {
  constructor() {
    super();
    this.renderContent = this.renderContent.bind(this);
    this.bonus = this.bonus.bind(this);
    this.selfDetector = this.selfDetector.bind(this);
    this.basicContent = this.basicContent.bind(this);
    this.handleExistingList = this.handleExistingList.bind(this);
    this.state ={
      refreshState: false,
      existingList: null
    };
  }
  componentDidMount() {
    // retrieve the notifications already reveived by the device
    AsyncStorage.getItem('receivedNotifs', (error, recordedItems) => {
    	if (recordedItems) {
		    const existingList = JSON.parse(recordedItems);
        // inform flatList to refresh and go to the right position
        this.handleExistingList(existingList);
    	} else {
    		this.handleExistingList([{_id: 0, date: 0, clicked: true}]);
    	}
    });
  }
  // change the state everytime the list is updated just to force the component to re-render
  handleExistingList(existingListToSave) {
    this.setState({existingList: existingListToSave});
    this.setState({refreshState: !this.state.refreshState});
  }
  // change the state everytime the list is updated just to force the component to re-render
  handleRefresh() {
    this.setState({refreshState: !this.state.refreshState});
  }
  bonus(bonus) {
  	return (
  		<Text style={styles.txt}>et vous avez gagné un bonus de <Text style={styles.bold}>{bonus} Tricks !</Text></Text>
  	);
  }
  // function to replace the name with a subject
  selfDetector(userId, referenceId, firstName, familyName) {
  	if (userId === referenceId) {
  		return 'vous';
  	} else {
  		return firstName + ' ' + familyName;
  	}
  }
  basicContent(rowData, imgAdapted, innerBox, iconToDisplay) {

    if (rowData.action === 'pendingChallenge' && rowData.opponent === this.props.userId) {

	    // ---------------------- informs the opponent of a pending Challenge ----------------//
	  	return (
	      <View style={innerBox}>
	        <View style={imgAdapted}>
	          <Image
	            source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
	            style={styles.image}
	          />
	        </View>
	        <View style={styles.listBox}>
            <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          <Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
	          <Text style={styles.txt}>
	            <Text style={styles.bold}>{rowData.playerFirstName} {rowData.playerFamilyName}</Text> vous a <Text style={styles.bold}>défié</Text>
	          </Text>
	          <Text style={styles.txt}>Acceptez ou refusez le defi !</Text>
	        </View>
	      </View>
	  	);
	  } else if ((rowData.action === 'chalAccepted' || rowData.action === 'chalMatched') && rowData.player !== this.props.userId) {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

	  	return (
	      <View style={innerBox}>
	        <View style={imgAdapted}>
	          <Image
	            source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
	            style={styles.image}
	          />
	        </View>
	        <View style={styles.listBox}>
            <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          <Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
	          {!this.props.currentChallengeId && rowData.opponent !== this.props.userId && rowData.player !== this.props.userId ?
	            <View>
	              <Text style={styles.txt}>
	                <Text style={styles.bold}>{rowData.playerFirstName} {rowData.playerFamilyName}</Text> a défié <Text style={styles.bold}>{rowData.opponentFirstName} {rowData.opponentFamilyName}</Text>
  	            </Text>
  	            <Text style={styles.txtClickable}>{'Rejoindre le défi...'.toUpperCase()}</Text>
  	          </View>
	            :
	            null
	          }
	          {!this.props.currentChallengeId && rowData.player === this.props.userId ?
	            <Text style={styles.txt}>
	              <Text style={styles.bold}>Vous</Text> avez lancé ce défié {rowData.preference} <Text style={styles.bold}>{rowData.opponentFirstName} {rowData.opponentFamilyName}</Text>
	            </Text>
	            :
	            null
	          }
	          {!this.props.currentChallengeId && rowData.opponent === this.props.userId ?
	            <Text style={styles.txt}>
	              Vous avez <Text style={styles.bold}>{rowData.action === 'chalAccepted' ? 'accepté' : 'relancé'}</Text> le défi de <Text style={styles.bold}>{rowData.playerFirstName} {rowData.playerFamilyName}</Text>
	            </Text>
	            :
	            null
	          }
	          {this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId && rowData.opponent !== this.props.userId && rowData.player !== this.props.userId ?
	            <Text style={styles.txt}>
	              <Text style={styles.bold}>{rowData.playerFirstName} {rowData.playerFamilyName}</Text> a lancé ce défi contre <Text style={styles.bold}>{rowData.opponentFirstName} {rowData.opponentFamilyName}</Text>
	            </Text>
	            :
	            null
	          }
						
	          {this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId && rowData.opponent === this.props.userId ?
	            <Text style={styles.txt}>
	              Vous avez <Text style={styles.bold}>{rowData.action === 'chalAccepted' ? 'accepté' : 'relancé'}</Text> ce défi lancé par <Text style={styles.bold}>{rowData.playerFirstName} {rowData.playerFamilyName}</Text>
	            </Text>
	            :
	            null
	          }
						
	          {this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId && rowData.player === this.props.userId ?
	            <Text style={styles.txt}>
	              Vous avez <Text style={styles.bold}>lancé</Text> ce défi contre <Text style={styles.bold}>{rowData.opponentFirstName} {rowData.opponentFamilyName}</Text>
	            </Text>
	            :
	            null
	          }

	          {rowData.bonus && rowData.bonus > 0 && rowData.opponent === this.props.userId ?
	          	this.bonus(rowData.bonus)
	          	:
	          	null
	          }
	        </View>
	      </View>
	    );
	  } else if ((rowData.action === 'chalAccepted'  || rowData.action === 'chalMatched') && rowData.player === this.props.userId) {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

    	return (
        <View style={innerBox}>
          <View style={imgAdapted}>
            <Image
              source={rowData.opponentImage ? { uri: rowData.opponentImage, isStatic: true } : defaultUser}
              style={styles.image}
            />
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          <Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
            <Text style={styles.txt}>
              Le défi que vous avez lancé à <Text style={styles.bold}>{rowData.opponentFirstName} {rowData.opponentFamilyName}</Text> a été <Text style={styles.bold}>{rowData.action === 'chalAccepted' ? 'accepté' : 'relancé'}</Text>
            </Text>
          </View>
        </View>
    	);
   	} else if (rowData.action === 'bet') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//


    	let formattedPreference;
    	if (rowData.preference === 'both') {
    		formattedPreference = 'sur les deux concurrents';
    	} else if (rowData.preference === 'for') {
    		formattedPreference = 'pour';
    	} else if (rowData.preference === 'against') {
    		formattedPreference = 'contre';
    	}
    	return (
        <View style={innerBox}>
          <View style={imgAdapted}>
            { rowData.bettor === this.props.userId ?
              <Image
                source={rowData.opponentImage ? { uri: rowData.opponentImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
              :
              <Image
                source={rowData.bettorImage ? { uri: rowData.bettorImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            }
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          <Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
            { rowData.bettor === this.props.userId && !this.props.currentChallengeId ?
              <Text style={styles.txt}>Vous venez de miser <Text style={styles.bold}>{rowData.amount ? rowData.amount : '--'} Tricks</Text> {formattedPreference} dans le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text></Text>
              :
              null
            }
            { rowData.bettor !== this.props.userId && !this.props.currentChallengeId ?
              <View>
                <Text style={styles.txt}><Text style={styles.bold}>{rowData.bettorFirstName} {rowData.bettorFamilyName}</Text> vient de miser <Text style={styles.bold}>{rowData.amount ? rowData.amount : '--'} Tricks</Text> {formattedPreference} dans le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text></Text>
                <Text style={styles.txtClickable}>{'Découvrir sa mise...'.toUpperCase()}</Text>
              </View>
              :
              null
            }
            { rowData.bettor === this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
              <Text style={styles.txt}>Vous venez de miser <Text style={styles.bold}>{rowData.amount ? rowData.amount : '--'} Tricks</Text> {formattedPreference} dans ce défi </Text>
              :
              null
            }
            { rowData.bettor !== this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
              <Text style={styles.txt}><Text style={styles.bold}>{rowData.bettorFirstName} {rowData.bettorFamilyName}</Text> vient de miser <Text style={styles.bold}>{rowData.amount ? rowData.amount : '--'} Tricks</Text> {formattedPreference} dans ce défi</Text>
              :
              null
            }
            {rowData.bonus && rowData.bonus > 0 && rowData.bettor === this.props.userId ?
            	this.bonus(rowData.bonus)
            	:
            	null
            }
          </View>
        </View>
    	);
    } else if (rowData.action === 'freeze') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

    	return (
        <View style={innerBox}>
          <View style={imgAdapted}>
            <Image
              source={rowData.image ? { uri: rowData.image, isStatic: true } : defaultUser}
              style={styles.image}
            />
          </View>
          { rowData.freezer !== this.props.userId ?
            <View style={styles.listBox}>
              <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          	<Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <Text style={styles.titleSuspect}>
                <Text style={styles.freezeTitle}>FREEZE - </Text>
                { rowData.freezer === this.props.userId && !this.props.currentChallengeId ?
                  <Text style={styles.txt}><Text style={styles.bold}>Vous</Text> avez freezé <Text style={styles.bold}>{rowData.accusedFirstName} {rowData.accusedFamilyName}</Text> dans le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text></Text>
                  :
                  null
                }
                { rowData.accused === this.props.userId && !this.props.currentChallengeId ?
                  <Text style={styles.txt}><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName}</Text> vous a freezé  dans le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text></Text>
                  :
                  null
                }
                { rowData.accused !== this.props.userId && rowData.freezer !== this.props.userId && !this.props.currentChallengeId ?
                  <Text style={styles.txt}><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName}</Text> a freezé <Text style={styles.bold}>{rowData.accusedFirstName} {rowData.accusedFamilyName}</Text> dans le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text></Text>
                  :
                  null
                }
                { rowData.freezer === this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                  <Text style={styles.txt}><Text style={styles.bold}>Vous</Text> avez freezé <Text style={styles.bold}>{rowData.accusedFirstName} {rowData.accusedFamilyName}</Text> dans ce défi.</Text>
                  :
                  null
                }
                { rowData.accused === this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                  <Text style={styles.txt}><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName}</Text> vous a freezé  dans ce défi.</Text>
                  :
                  null
                }
                { rowData.accused !== this.props.userId && rowData.freezer !== this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                  <Text style={styles.txt}><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName}</Text> a freezé <Text style={styles.bold}>{rowData.accusedFirstName} {rowData.accusedFamilyName}</Text> dans ce défi.</Text>
                  :
                  null
                }
                {rowData.bonus && rowData.bonus > 0 ?
                	this.bonus(rowData.bonus)
                	:
                	null
                }
              </Text>
              { (!rowData.used || rowData.used !== true) && rowData.freezer !== this.props.userId ?
                <Text style={styles.txtClickable}>{'Voir le freeze...'.toUpperCase()}</Text>
                :
                <Text style={styles.txtClickable}>{'Revoir le freeze...'.toUpperCase()}</Text>
              }
            </View>
            :
            <View style={styles.listBox}>
	          	<Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <View>
                <Text style={styles.titleSuspect}><Text style={styles.freezeTitle}>FREEZE - </Text><Text style={styles.bold}>Vous</Text> avez freezé <Text style={styles.bold}>{rowData.accusedFirstName} {rowData.accusedFamilyName}</Text> dans le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text></Text>
              	<Text style={styles.txtClickable}>{'Revoir le freeze...'.toUpperCase()}</Text>
              </View>
            </View>
          }
        </View>
      );
		} else if (rowData.action === 'suspect') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

	    return (
        <View style={innerBox}>
          <View style={imgAdapted}>
            <Image
              source={rowData.freezerImage ? { uri: rowData.freezerImage, isStatic: true } : defaultUser}
              style={styles.image}
            />
          </View>
          { rowData.freezer !== this.props.userId ?
            <View style={styles.listBox}>
              <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          	<Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              { rowData.accused === this.props.userId && !this.props.currentChallengeId ?
                <Text style={styles.txt}>
                  <Text style={styles.freezeTitle}>SUSPICION - </Text><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName} vous suspecte :</Text> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text>
                </Text>
                :
                null
              }
              { rowData.freezer === this.props.userId && !this.props.currentChallengeId ?
                <Text style={styles.txt}>
                  <Text style={styles.freezeTitle}>SUSPICION - </Text><Text style={styles.bold}>Vous avez suspecté {rowData.accusedFirstName} {rowData.accusedFamilyName} :</Text> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text>
                </Text>
                :
                null
              }
              { rowData.freezer !== this.props.userId && rowData.accused !== this.props.userId && !this.props.currentChallengeId ?
                <Text style={styles.txt}>
                  <Text style={styles.freezeTitle}>SUSPICION - </Text><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName} suspecte {rowData.accusedFirstName} {rowData.accusedFamilyName} :</Text> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text>
                </Text>
                :
                null
              }
              { rowData.accused === this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                <Text style={styles.txt}>
                  <Text style={styles.freezeTitle}>SUSPICION - </Text><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName} vous suspecte :</Text> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text>
                </Text>
                :
                null
              }
              { rowData.freezer === this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                <Text style={styles.txt}>
                  <Text style={styles.freezeTitle}>SUSPICION - </Text><Text style={styles.bold}>Vous avez suspecté {rowData.accusedFirstName} {rowData.accusedFamilyName} :</Text> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text>
                </Text>
                :
                null
              }
              { rowData.freezer !== this.props.userId && rowData.accused !== this.props.userId && this.props.currentChallengeId && this.props.currentChallengeId === rowData.challengeId ?
                <Text style={styles.txt}>
                  <Text style={styles.freezeTitle}>SUSPICION - </Text><Text style={styles.bold}>{rowData.freezerFirstName} {rowData.freezerFamilyName} suspecte {rowData.accusedFirstName} {rowData.accusedFamilyName} :</Text> "{rowData.suspectReason}"{"\n"}
                  Cela concerne le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text>
                </Text>
                :
                null
              }
            </View>
            :
            <View style={styles.listBox}>
	          	<Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <Text style={styles.txt}><Text style={styles.freezeTitle}>SUSPICION - </Text><Text style={styles.bold}>Vous</Text> avez suspecté <Text style={styles.bold}>{rowData.accusedFirstName} {rowData.accusedFamilyName}</Text> dans le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text></Text>
            </View>
          }
        </View>
	    );
	  } else if (rowData.action === 'challengeFreezed' || rowData.action === 'challengeReactivated') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

    	return (
        <View style={innerBox}>
          <View style={imgAdapted}>
            <Image
              source={rowData.opponentImage ? { uri: rowData.opponentImage, isStatic: true } : defaultUser}
              style={styles.image}
            />
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          <Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
            { rowData.action === 'challengeFreezed' ?
              <View>
                <Text style={styles.txt}>
                  Le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text> est terminé suite au freeze fait par <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.freezer, rowData.freezerFirstName, rowData.freezerFamilyName)}</Text>{"\n"}
                  { rowData.bonus && rowData.bonus > 0 && rowData.freezer === this.props.userId ?
                  	<Text>Car votre freeze a été validé, vous avez gagné un bonus de <Text style={styles.bold}>{rowData.bonus} Tricks</Text>. {"\n"}</Text>
                  	:
                  	<Text>qui remporte <Text style={styles.bold}>{rowData.bonus} Tricks</Text> grace à son Freeze qui vient d'être validé !{"\n"}</Text>
                  }
                </Text>
                { this.props.origin !== 'chall' ?
                  <Text style={styles.txtClickable}>{'Allez voir le resultat des gagnants !'.toUpperCase()}</Text>
                  :
                  null
                }
              </View>
              :
              <View>
                <Text style={styles.txt}>
                  Le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text> est reactivé car le freeze fait par <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.freezer, rowData.freezerFirstName, rowData.freezerFamilyName)}</Text> n'a pas été validé
                </Text>
                <Text style={styles.txtClickable}>{'Les paris sont re-ouverts !'.toUpperCase()}</Text>
              </View>
            }
          </View>
        </View>
    	);
    } else if (rowData.action === 'challFinished') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <View style={innerBox}>
          <View style={imgAdapted}>
            <Image
              source={rowData.opponentImage ? { uri: rowData.opponentImage, isStatic: true } : defaultUser}
              style={styles.image}
            />
          </View>
          <View style={styles.listBox}>
            <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          <Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
            <Text style={styles.txt}>
              Le défi entre <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text> et <Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text> est terminé
            </Text>
            { this.props.origin !== 'chall' ?
              <Text style={styles.txt}>Allez voir le resultat des gagnants !</Text>
              :
              null
            }
          </View>
        </View>
      );
    }
  }
  // render the list - selectNotif alows to select the tab to show the right content
  renderContent(data) {
  	const rowData = data.item;
    let baseColor;
    let iconToDisplay;
		let itemSuspictionColor;
    // give a differente backgroundColor to the notifications already clicked
    let index;
    if (this.state.existingList && this.state.existingList.length > 0) {
      index = this.state.existingList.map((single) => {return single._id}).indexOf(rowData._id);
    }
    // display the right icon according to the theme
    switch (rowData.theme) {
      case 'tabac':
        iconToDisplay = tabac;
        break;
      case 'sport':
        iconToDisplay = sport;
        break;
      case 'nutrition':
        iconToDisplay = food;
        break;
      case 'relax':
        iconToDisplay = relax;
        break;
      default: iconToDisplay = tabac;
    }
    // display the right back color according to the argument
    switch (rowData.action) {
      case 'bet':
      case 'chalAccepted':
      case 'chalMatched':
      case 'challengeReactivated':
      case 'pendingChallenge':
      	// give the right color to the board
        baseColor = color3;
				// give the right color to clicked notifs
				if (
					(
						this.state.existingList
						&& this.state.existingList[index]
						&& this.state.existingList[index].clicked
						&& this.state.existingList[index].clicked === true
					)
					|| ((
						rowData.action === 'chalAccepted'
						|| rowData.action === 'chalMatched'
						|| rowData.action === 'pendingChallenge'
						) && rowData.player === this.props.userId
					)
					|| (rowData.action === 'pendingChallenge' && rowData.used === true)
				) {
					itemColor = color16;
				} else {
					itemColor = white;
				}
        break;
      case 'challengeFreezed':
      case 'challFinished':
      	// give the right color to the board
        baseColor = color4;
				// give the right color to clicked notifs
				if (
					this.state.existingList
					&& this.state.existingList[index]
					&& this.state.existingList[index].clicked
					&& this.state.existingList[index].clicked === true
				) {
					itemColor = color15;
				} else {
					itemColor = white;
				}
        break;
      case 'avatar':
      case 'chalRefused':
      case 'endStage':
      case 'endProgram':
      	// give the right color to the board
        baseColor = color2;
				// give the right color to clicked notifs
				if (
					(
						this.state.existingList
						&& this.state.existingList[index]
						&& this.state.existingList[index].clicked
						&& this.state.existingList[index].clicked === true
					)
					|| rowData.action === 'chalRefused'
					|| rowData.action === 'endStage'
					|| rowData.action === 'endProgram'
				) {
					itemColor = color14;
				} else {
					itemColor = white;
				}
        break;
      case 'onBoardingWelcome':
      case 'onBoarding1':
      case 'onBoarding2':
      case 'morningIncentive':
      	// give the right color to the board
        baseColor = color9;
				// give the right color to clicked notifs
				if (
					(
						this.state.existingList
						&& this.state.existingList[index]
						&& this.state.existingList[index].clicked
						&& this.state.existingList[index].clicked === true
					)
					|| rowData.action === 'onBoarding2'
				) {
					itemColor = color13;
				} else {
					itemColor = white;
				}
        break;
      case 'freeze':
      case 'suspect':
      	// give the right color to the board
        baseColor = color1;
				// give the right color to clicked notifs
				if (
					(
						this.state.existingList
						&& this.state.existingList[index]
						&& this.state.existingList[index].clicked
						&& this.state.existingList[index].clicked === true
					)
					|| rowData.action === 'suspect'
				) {
					itemColor = color11;
				} else {
					itemColor = white;
				}
        break;
      default: baseColor = color1;
    }
    const fondAdapted = {
      alignSelf: 'stretch',
      justifyContent: 'center',
      marginTop: 2,
      marginHorizontal: 26,
      marginVertical: 15,
      borderRadius: 8,
      backgroundColor: baseColor
    };
    const imgAdapted = {
      width: imgWidth,
      height: imgWidth,
      borderWidth: 3,
      borderColor: baseColor,
      borderRadius: imgWidth / 2,
      marginBottom: 5
    };
    const innerBox = {
    	flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
    	marginHorizontal: 10,
      paddingVertical: 17,
    	backgroundColor: itemColor,
      paddingHorizontal: 10
    };
    // make the notification clickable when it is not in a challenge detail
    if (rowData.action === 'pendingChallenge' && rowData.player === this.props.userId) {

    // ---------------------- informs the challenger of the pending Challenge he made ----------------//

      return (
        <View
          style={fondAdapted}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.opponentImage ? { uri: rowData.opponentImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
              <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          	<Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <Text style={styles.txt}>
                Vous avez defié <Text style={styles.bold}>{rowData.opponentFirstName} {rowData.opponentFamilyName}</Text>
              </Text>
              {rowData.bonus && rowData.bonus > 0 ?
              	this.bonus(rowData.bonus)
              	:
              	null
              }
              <Text style={styles.txt}>Votre défi attend d'être accepté</Text>
            </View>
          </View>
        </View>
      );

    // pending challenges wher the user is opponent and the challenge is not older that the time limit for validation
    } else if (rowData.action === 'pendingChallenge' && (rowData.currentTime - new Date(rowData.date).getTime()) > rowData.oldMax) {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <View
          style={fondAdapted}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
              <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          	<Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <Text style={styles.txt}>
                Le défi que <Text style={styles.bold}>{rowData.playerFirstName} {rowData.playerFamilyName}</Text> vous a lancé ne peut plus être accepté car le temps limite a été dépassé.
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (rowData.action === 'avatar') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <TouchableOpacity
          style={fondAdapted}
          onPress={() => {
          	markSingleNotif(rowData._id, rowData.date, () => {
          		Actions.bonusMain();
          		this.handleRefresh();
          	});
          }}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
	          	<Text style={styles.txtTimeNoIcon}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <Text style={styles.txt}>
                <Text style={styles.bold}>Vous</Text> venez d'enregistrer votre avatar{"\n"}
                {rowData.bonus && rowData.bonus > 0 ?
                	this.bonus(rowData.bonus)
                	:
                	null
                }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (rowData.action === 'onBoardingWelcome') {

    // ---------------------- welcome message ----------------//

      return (
        <TouchableOpacity
          style={fondAdapted}
          onPress={() => {
          	markSingleNotif(rowData._id, rowData.date, () => {
	          	if (this.props.origin === 'main' || this.props.origin === 'chall') {
	          	  Actions.tutorial({format: 'tuto'});
	          	} else {
	          	  Actions.tutorialNot({format: 'tuto'});
	          	}
          		this.handleRefresh();
          	});
          }}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
              <Text style={styles.txt}>
                <Text style={styles.bold}>Bienvenue sur Tricky !</Text> Êtes-vous prêt à relever les défis ?
              </Text>
              <Text style={styles.txtClickable}>{'Besoin d\'aide ?'.toUpperCase()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (rowData.action === 'onBoarding1') {

    // ---------------------- incentive tue user to launch a challenge ----------------//

      return (
        <TouchableOpacity
          style={fondAdapted}
          onPress={() => {
          	markSingleNotif(rowData._id, rowData.date, () => {
          	  Actions.challenge({ idProgram: this.props.idProgram });
          		this.handleRefresh();
          	});
          }}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
              <Text style={styles.txt}>
                <Text style={styles.bold}>Lancez</Text> votre premier défi à un collègue, et tentez de doubler votre mise !
              </Text>
              <Text style={styles.txtClickable}>{'Je commence !'.toUpperCase()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (rowData.action === 'onBoarding2') {

    // ---------------------- incentive tue user to launch a challenge ----------------//

      return (
        <View
          style={fondAdapted}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
              <Text style={styles.txt}>
                <Text style={styles.bold}>Sur Tricky</Text> en lançant des défis à vos collègues vous les incitez à prendre soin de leur santé.{"\n"}
                Si vous misez bien vous gagnez des points qui pourront être convertibles en <Text style={styles.bold}>chèque cadeau</Text> !
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (rowData.action === 'morningIncentive') {

    // ---------------------- incentive tue user to launch a challenge ----------------//

      return (
        <TouchableOpacity
          style={fondAdapted}
          onPress={() => {
          	markSingleNotif(rowData._id, rowData.date, () => {
          		Actions.challenge({ idProgram: this.props.idProgram });
          		this.handleRefresh();
          	});
          }}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
              <Text style={styles.txt}>
                <Text style={styles.bold}>Bonjour {rowData.playerFirstName},</Text> aujourd'hui tu as {rowData.amount ? rowData.amount : '--'} Tricks soit XXX Euros à la fin de cette partie !
              </Text>
              <Text style={styles.txtClickable}>{'J\'augmente mes Tricks...'.toUpperCase()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (rowData.action === 'chalRefused') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <View
          style={fondAdapted}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
              <View style={styles.iconTheme}><Image source={iconToDisplay} style={styles.imageIcon}/></View>
	          	<Text style={styles.txtTime}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              { this.props.userId === rowData.player ?
                <Text style={styles.txt}><Text style={styles.bold}>{this.selfDetector(this.props.userId, rowData.opponent, rowData.opponentFirstName, rowData.opponentFamilyName)}</Text> a réfusé le défi que vous avez lancé</Text>
                :
                null
              }
              { this.props.userId === rowData.opponent ?
                <Text style={styles.txt}><Text style={styles.bold}>Vous</Text> avez réfusé le défi lancé par {this.selfDetector(this.props.userId, rowData.player, rowData.playerFirstName, rowData.playerFamilyName)}</Text>
                :
                null
              }
            </View>
          </View>
        </View>
      );
    } else if (rowData.action === 'endStage') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <View
          style={fondAdapted}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
	          	<Text style={styles.txtTimeNoIcon}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <Text style={styles.txt}>
                <Text style={styles.bold}>Congratulations !</Text> La premiere partie du jeu est <Text style={styles.bold}>terminée</Text>{"\n"}
                Vos Tricks ont été réinitialisés et votre gagne calculé.{"\n"}
                Allez voir dans la <Text style={styles.bold}>page boutique</Text> le montant que vous avez <Text style={styles.bold}>gagné !</Text>
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (rowData.action === 'endProgram') {

    // ---------------------- informs the opponent of a pending Challenge ----------------//

      return (
        <View
          style={fondAdapted}
        >
          <View style={innerBox}>
            <View style={imgAdapted}>
              <Image
                source={rowData.playerImage ? { uri: rowData.playerImage, isStatic: true } : defaultUser}
                style={styles.image}
              />
            </View>
            <View style={styles.listBox}>
	          	<Text style={styles.txtTimeNoIcon}>{timerNotifs(rowData.currentTime, rowData.date).toUpperCase()} :</Text>
              <Text style={styles.txt}>
                <Text style={styles.bold}>Congratulations !</Text> Le programme du jeu est arrivé à sa <Text style={styles.bold}>fin.</Text>{"\n"}
                Votre gagne final a été calculé.{"\n"}
                Allez voir dans la <Text style={styles.bold}>page boutique</Text> le montant que vous avez <Text style={styles.bold}>gagné !</Text>
              </Text>
            </View>
          </View>
        </View>
      );

    // assign a clickable or not clickable container
    } else if (
    	this.props.notClickable
    	&& this.props.notClickable === true
    	&& (rowData.action !== 'freeze' && rowData.action !== 'suspect')
    ) {
    	return (
        <View
          style={fondAdapted}
        >
    	    { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </View>
    	);
    } else if (rowData.action === 'pendingChallenge' && rowData.used === true) {
    	return (
        <View
          style={fondAdapted}
        >
    	    { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </View>
    	);
    } else if (rowData.action !== 'freeze' && rowData.action !== 'suspect') {
    	return (
        <TouchableOpacity
          style={fondAdapted}
          onPress={() => {
          	markSingleNotif(rowData._id, rowData.date, () => {
            	this.props.selectNotif(rowData.challengeId, rowData.action);
          		this.handleRefresh();
          	});
          }}
        >
    	    { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </TouchableOpacity>
    	);

    } else if (rowData.action === 'freeze' || rowData.action === 'suspect') {
    	return (
        <TouchableOpacity
          style={fondAdapted}
          onPress={() => {
          	markSingleNotif(rowData._id, rowData.date, () => {
          		if (rowData.action === 'freeze') {
		          	// check if the freeze as been already jugged
		          	if (!rowData.used || rowData.used !== true) {
		            	if (this.props.origin === 'main' || this.props.origin === 'chall') {
		            		Actions.dettFreeze({ idFreeze: rowData.freezeId, freezer: rowData.freezer, accusedId: rowData.accused, idChallenge: rowData.challengeId, image: rowData.image, comment: rowData.comment ? rowData.comment : null });
		            	} else {
		            		Actions.dettFreezeNot({ idFreeze: rowData.freezeId, freezer: rowData.freezer, accusedId: rowData.accused, idChallenge: rowData.challengeId, image: rowData.image, comment: rowData.comment ? rowData.comment : null });
		            	}
		          	} else {
		            	if (this.props.origin === 'main' || this.props.origin === 'chall') {
		                Actions.dettFreeze({ idFreeze: rowData.freezeId, freezer: rowData.freezer, accusedId: rowData.accused, idChallenge: rowData.challengeId, image: rowData.image, updated: true, comment: rowData.comment ? rowData.comment : null });
		              } else {
		              	Actions.dettFreezeNot({ idFreeze: rowData.freezeId, freezer: rowData.freezer, accusedId: rowData.accused, idChallenge: rowData.challengeId, image: rowData.image, updated: true, comment: rowData.comment ? rowData.comment : null });
		              }
		          	}
          		} else if (rowData.action === 'suspect') {
		            this.props.selectNotif(rowData.challengeId, rowData.action);
          		}
          		this.handleRefresh();
          	});
          }}
        >
    	    { this.basicContent(rowData, imgAdapted, innerBox, iconToDisplay) }
        </TouchableOpacity>
    	);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notifs}
          renderItem={this.renderContent}
          keyExtractor={item => item._id}
          // that informs the component that the state changes
          // extraData={this.state}
        />
      </View>
    );
  }
}

export default ListNotifications;
