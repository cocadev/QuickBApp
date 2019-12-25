/**
 * @file RegisterHome.js
 * @description This file show the register home screen.
 * @author Fernando Mondragón
 * @date 06 MAY 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Text  from '../components/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Images from '../constants/Images';

/**
 * @description Export the register home screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class RegisterHome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      navigation: this.props.navigation,
    }
  }

  continueAction() {
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title} type="GeosansLight">¡Felicidades!</Text>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.textContainer} type="GeosansLight">
            Ya eres parte de
            <Text style={styles.textQuickB} type="GeosansLight"> 
              {'\t'} QuickB {'\t'}
            </Text>
            te llegará un correo para verificar tu cuenta ya puedes continuar y buscar lo que necesites.
          </Text>
        </View>
        <TouchableOpacity style={styles.bottomContainer} onPress={() => this.continueAction()}>
          <Text style={styles.buttonText} type="GeosansLight"> 
            Continuar
          </Text>
          <Image
            source={ Images.right }
            fadeDuration={0}
            style={styles.imageBack}
          />
        </TouchableOpacity>
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
  },
  topContainer: {
    flex: 1,
    alignItems:'center',
  },
  title: {
    color: '#2c3e50',
    width: wp('60%'),
    textAlign: 'center',
    opacity: 0.9,
    fontSize: hp('6%'),
    flex: 2,
  },
  viewContainer: {
    flex: 2,
    padding: 20,
  },
  textContainer: {
    fontSize: hp('5%'),
    textAlign: 'justify',
  },
  textQuickB: {
    color: 'rgba(241, 196, 15,1.0)',
  },
  bottomContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: hp('5%'),
    padding: 20,
    paddingLeft: 130,
  },
  imageBack: {
    resizeMode: "contain",
    height: hp('7%'),
    width: wp('7%')
  },
});