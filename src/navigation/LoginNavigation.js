/**
 * @file LoginNavigation.js
 * @description This file do the login navigation.
 * @author Fernando Mondragón
 * @date 02 APR 2019
 * @version v1.1
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Login from "../screens/Login";
import Register from "../screens/Register";
import PasswordRecovery from "../screens/PasswordRecovery";
  
/**
 * @proyect QuickB
 * @const  {*} navigationOptions
 */
const navigationOptions = {
    headerStyle: {
        borderTopWidth: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        borderTopColor: 'rgba(241, 196, 15,1.0)',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: hp('15%'),
    },
}

/**
 * @proyect QuickB
 * @const  {*} LoginRoutes
 */
const LoginRoutes = {
    Login: {
        screen: Login,
        navigationOptions: {
            ...navigationOptions,
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            ...navigationOptions,
        }
    },
    PasswordRecovery: {
        screen: PasswordRecovery,
        navigationOptions: {
            ...navigationOptions,
        }
    }
};

/**
 * @proyect QuickB
 * @const  {*} config
 */
const config = {
    initialRouteName: "Login"
}

/**
 * @description Export the login navigation.
 * @export {Class}
 */
export default LoginNavigator = createStackNavigator(LoginRoutes, config);