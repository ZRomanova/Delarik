import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux'
import { loadUser} from '../store/actions/todo'

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    await this.props.getUser()
    this.props.navigation.navigate(this.props.app.user ? "App" : 'Auth') 
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

function mapStateToProps(state) {
    return state
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getUser: () => dispatch(loadUser())
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps) (AuthLoadingScreen)