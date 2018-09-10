import { Platform } from 'react-native';

export function isAndroid() {
  if (Platform.OS === 'ios') {
  	return false;
  } else {
  	return true;
  }
}
