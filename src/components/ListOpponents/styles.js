import {
	StyleSheet
} from 'react-native';
import {
	white,
	color12,
	pB,
  pM,
  pS,
  h2,
  h1
} from '../../global/variables';

const picture = 58;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingBottom: 53
  },
  listItem: {
  	borderBottomColor: white,
  	borderBottomWidth: 1,
    marginTop: 2,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  img: {
    width: picture,
    height: picture,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: color12,
    borderRadius: picture / 2,
    marginHorizontal: 20
  },
  positionBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 60
  },
  position: {
    color: white,
    fontSize: h1,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  cardinal: {
    fontSize: pM,
    color: white,
    backgroundColor: 'transparent'
  },
  list: {
    flex: 1,
    color: white,
    fontSize: pB,
    paddingVertical: 15,
    backgroundColor: 'transparent'
  },
  scoreBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  scoreBold: {
    fontSize: h1 + 2,
    fontWeight: '700',
    color: white,
    backgroundColor: 'transparent'
  },
  score: {
    fontSize: pS -2,
    fontWeight: '300',
    color: white,
    textAlign: 'right',
    marginTop: -6,
    backgroundColor: 'transparent'
  }
});
