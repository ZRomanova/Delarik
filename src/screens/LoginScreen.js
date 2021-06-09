import React, { Component } from "react";
import * as Google from "expo-google-app-auth";
import { View, StyleSheet, Button, Platform} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux'
import { loadUser, addUser, deleteUser} from '../store/actions/todo'
import { THEME } from '../theme'



const IOS_CLIENT_ID = "31740686243-kcmcjvi7n0mhi86p537hdtq3v3h6u23j.apps.googleusercontent.com";
const ANDROID_CLIENT_ID = "31740686243-hne3ti5prmfmmle731trlju2g4fv9a3n.apps.googleusercontent.com";

class LoginScreen extends Component {

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["email"]
      });

      if (result.type === "success") {
        
        await this.props.addUser(result.user.email)
        await this.props.getUser()
        this.props.navigation.navigate("Todo")
          
        
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js| Error with login', e, " on ", Platform.OS);
      return { error: true };
    }
  };

  render() { 
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={this.signInWithGoogle} color={THEME.MAIN_COLOR}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(loadUser()),
    addUser: user => dispatch(addUser(user)),
    deleteUser: () => dispatch(deleteUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginScreen)