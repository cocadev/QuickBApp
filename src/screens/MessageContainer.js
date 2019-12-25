/**
 * @file MessageContainer.js
 * @description This file show all the message about all bussiness.
 * @author Fernando Mondragón
 * @date 20 AUG 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 * @description Export the message container screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class MessageContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Pantalla del contenedor de Mensajes</Text>
      </View> 
    );
  }
};

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  }
});