// combine reducers to get a unique global reducer
import { combineReducers } from 'redux';
import form from './form/value';
import auth from './auth/auth';
import allUsers from './users/allUsers';
import categories from './users/categories';
import profileDett from './profile/details';
import selectTabs from './profile/selectTabs';
import toogle from './tools/toogle';
import tools from './tools/general';
import notifications from './notifications/show';
import creationFreeze from './freeze/create';
import setParams from './parameter/setParams';
import alerts from './alerts/message';
import challenges from './challenges/load';
import wallet from './wallet/store';
import infos from './infos/set';
import programData from './program/data';
import pushnotif from './pushnotif/handle';
import netinfo from './netinfo/status';

const rootReducer = combineReducers({
  form,
  auth,
  allUsers,
  categories,
  profileDett,
  selectTabs,
  netinfo,
  notifications,
  challenges,
  creationFreeze, 
  setParams,
  toogle,
  alerts,
  wallet,
  infos,
  programData,
  pushnotif,
  tools
});

export default rootReducer;
