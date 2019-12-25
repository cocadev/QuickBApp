/**
 * @file MainNavigation.js
 * @description This file do the main navigation.
 * @author Fernando Mondragón
 * @date 02 APR 2019
 * @version v1.1
 */
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, } from 'react-native';
import AuthStack from "./LoginNavigation";
import AppStack from "./HomeNavigation";
import RegisterStack from "./RegisterNavigation";

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * @class AuthLoadingScreen
 * @description This class validate the AsyncStorage for know if we have a session or not.
 * @param {*} params
 * @return {Object} 
 */
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('user');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default" hidden={true} />
      </View>
    );
  }
}

/**
 * @description Export the main navigation.
 * @export {Class}
 */
export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    RegisterApp: RegisterStack,
  },{
    initialRouteName: 'AuthLoading',
  })
);
