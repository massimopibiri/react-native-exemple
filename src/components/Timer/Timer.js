import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { IntervalEnhance } from './intervalEnhance';
import { calcTime } from '../../functions/program';


// const TimerMixin = require('react-timer-mixin');

class Timer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    // this._countdown();
  }
  render(){
    if (this.props.seconds > 0) {
      let style = [styles.text];
      const timeRes = calcTime(this.props.seconds);
      if (this.props.origin === 'main') {
        return (
          <Text style={[style, this.props.textStyle]}>{timeRes.hours}:{timeRes.minutes > 9 ? timeRes.minutes : '0' + timeRes.minutes}:{timeRes.seconds > 9 ? timeRes.seconds : '0' + timeRes.seconds}</Text>
        );
      } else {
        return (
          <Text style={[style, this.props.textStyle]}>{timeRes.days}:{timeRes.hours > 9 ? timeRes.hours : '0' + timeRes.hours}:{timeRes.minutes > 9 ? timeRes.minutes : '0' + timeRes.minutes}:{timeRes.seconds > 9 ? timeRes.seconds : '0' + timeRes.seconds}</Text>
        );
      }
    } else {
      return (
        <Text style={[styles.termine, this.props.termineStyle]}>Terminé</Text>
      );
    }
  }
  _countdown() {
    let timer = function () {
    	let time;
      time = this.state.time - 1;
      this.setState({time: time});
      if (time > 0) {
        this.setTimeout(timer, 1000); // every second
      } else {
        this.setState({time: 0});
      }
    };
    this.setTimeout(timer.bind(this), 1000);
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  termine: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: 'transparent'
  }
});

export default IntervalEnhance(Timer);
