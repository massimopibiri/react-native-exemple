import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Alert from './Alert';

class ContainerAlerts extends React.Component {
  render() {
    const renderAlerts = () => {
      return this.props.alerts.map((alert) => {
        return (
          <Alert alert={alert} key={alert.id} />
        );
      });
    };
    return (
      <View style={styles.container}>
        { this.props.netInfoStatus === false ?
        	<Alert alert={{kind: 'danger', text: 'Désolé, mais il n\'y a aucun réseau détecté.'}} key={1} noShowRemove={true}/>
        	:
          renderAlerts()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 10
  }
});

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
    netInfoStatus: state.netinfo.status
  };
}

export default connect(mapStateToProps)(ContainerAlerts);
