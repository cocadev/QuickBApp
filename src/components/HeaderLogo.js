/**
 * @file HeaderLogo.js
 * @description This file make styles for the header logo.
 * @author Fernando Mondragón
 * @date 08 MAY 2019
 * @version v1.1
 */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Images from '../constants/Images';

/**
 * @proyect QuickB
 * @const  {*} Header
 */
const Header = ({ newStyles, ...props }) => (
    <View style={styles.logoContainer}>
        <Image 
            style={[styles.logo, newStyles]}{...props}
            source={Images.logo}
        />
    </View>
);

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        paddingBottom: 13
    },
    logo: {
        resizeMode: 'contain'
    }
});

/**
 * @description Export the class for than we can use in other side.
 * @export {Const}
 */
export default Header 
