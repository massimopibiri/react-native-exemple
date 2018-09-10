import {
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  white,
  pXS,
  pM,
  pS,
  pB,
  h1,
  h2,
  h3,
  color1,
  color2,
  color12,
  grey,
  black
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const avatarWidth = 53;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 85,
    borderTopWidth: 1,
    borderTopColor: grey,
    position: 'relative'
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 85,
    width: width,
    backgroundColor: black,
    opacity: 0.15
  },
  positionSection: {
    width: 60,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  positionSectionLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  positionBold: {
    fontSize: h3,
    fontWeight: '700',
    color: white,
    backgroundColor: 'transparent'
  },
  position: {
    fontSize: pS,
    fontWeight: '400',
    color: white,
    backgroundColor: 'transparent'
  },
  img: {
    width: avatarWidth,
    height: avatarWidth,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: color12,
    borderRadius: avatarWidth / 2,
    marginRight: 10,
    marginLeft: 20
  },
  tricks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tricksTxt1: {
    paddingRight: 10,
    fontSize: pB,
    borderRightWidth: 1,
    borderRightColor: white,
    color: white,
    backgroundColor: 'transparent'
  },
  scoreBox: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 10
  },
  tricksTxt2: {
    fontSize: h3,
    color: white,
    fontWeight: '300',
    backgroundColor: 'transparent'
  },
  tricksTxt3: {
    fontSize: pS - 3,
    color: white,
    fontWeight: '300',
    marginTop: -3,
    backgroundColor: 'transparent'
  },
  nameSection: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  nameTxt: {
    color: white,
    fontSize: pM - 1,
    backgroundColor: 'transparent'
  },
  roleTxt: {
    color: white,
    fontWeight: '300',
    fontSize: pXS,
    backgroundColor: 'transparent'
  },
  warn: {
    color: white,
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: 'transparent'
  },
  bold: {
  	fontWeight: '700'
  }
});
