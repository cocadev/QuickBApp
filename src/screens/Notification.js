/**
 * @file Notification.js
 * @description This file show the comunity screen.
 * @author Fernando Mondragón
 * @date 14 MAY 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 * @description Export the Notification screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Notification extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Pantalla de notificaiones</Text>
      </View> 
    );
  }
};

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  }
});