/**
 * @file RegisterNavigation.js
 * @description This file do the register navigation.
 * @author Fernando Mondragón
 * @date 06 APR 2019
 * @version v1.1
 */
import React from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from 'react-navigation';
import RegisterHome from "../screens/RegisterHome";
import Header from '../components/HeaderLogo'

/**
 * @proyect QuickB
 * @const  {*} navigationOptions
 */
const navigationOptions = {
    headerTitle: () => <Header newStyles={styles.logoImage}/>,
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
 * @const  {*} RegisterRoutes
 */
const RegisterRoutes = {
    RegisterHome: {
        screen: RegisterHome,
        navigationOptions: {
            ...navigationOptions,
        }
    }
};

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
    logoImage: {
        width: wp('70%'),
        height: hp('9%')
    }
});

/**
 * @proyect QuickB
 * @const  {*} config
 */
const config = {
    initialRouteName: "RegisterHome"
}

/**
 * @description Export the register navigation.
 * @export {Class}
 */
export default RegisterNavigation = createStackNavigator(RegisterRoutes, config);