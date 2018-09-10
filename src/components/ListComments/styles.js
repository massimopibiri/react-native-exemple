import {
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  white,
  pM,
  pS,
  pB,
  h1,
  h2,
  color1,
  color2,
  color12,
  grey,
  black
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const imgWidth = 36;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  itemBox: {
    marginTop: 15,
    alignItems: 'stretch',
    width: width
  },
  itemBoxB: {
    alignSelf: 'flex-end',
    alignItems: 'stretch',
    width: (width / 5) * 4
  },
  innerBox: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: white,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    // backgroundColor: 'transparent'
  },
  itemLeft: {
    width: imgWidth,
    height: imgWidth,
    borderRadius: imgWidth / 2,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'transparent'
  },
  img: {
    flex: 1,
    width: imgWidth,
    height: imgWidth,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: imgWidth / 2
  },
  itemRight: {
    flex: 1,
    paddingHorizontal: 15
  },
  commentator: {
    fontWeight: '700'
  },
  responseBox: {
    marginTop: -4,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 15,
    color: white,
    fontSize: pS,
    fontWeight: '300',
    marginRight: 5,
    backgroundColor: 'transparent'
  }
});
