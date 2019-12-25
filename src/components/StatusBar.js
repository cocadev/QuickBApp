/**
 * @file StatusBar.js
 * @description This file create a status bar component for use in all app.
 * @author Fernando Mondragón
 * @date 07 AUG 2019
 * @version v1.1
 */
import React from 'react';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';

/**
 * @proyect QuickB
 * @const  {*} GeneralStatusBarColor
 */
const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

/**
 * @proyect QuickB
 * @const  {Integer} STATUSBAR_HEIGHT
 */
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }
});

/**
 * @description Export the class for than we can use in other side.
 * @export {Const}
 */
export default GeneralStatusBarColor;