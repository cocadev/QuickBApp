/**
 * @file PasswordRecovery.js
 * @description This file show the password recovery screen.
 * @author Fernando Mondragón
 * @date 10 APR 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, Alert, TouchableOpacity, Platform, Image } from 'react-native';
import Text  from '../components/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Images from '../constants/Images';
import Header from '../components/HeaderLogo';

/**
 * @description Export the PasswordRecovery screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class PasswordRecovery extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header newStyles={styles.logoImage}/>,
      headerLeft: (
        <TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
          <Image
            source={ Images.left }
            fadeDuration={0}
            style={styles.imageBack}
          />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      navigation: this.props.navigation,
      email: ''
    }
  }

  passwordRecoveryAction() {
    var email = this.state.email;
    if (email == null || email == "") {
      Alert.alert(
        'Campos incompletos', 'Todos los campos deben estar llenos',
        [{
          text: 'OK'
        }],
      );
    } else {
      Alert.alert(
        'Enviado', 'Se ha enviado un mensaje a tu correo',
        [{
          text: 'OK', onPress: () => this.succesAction()
        }],
      );
    }
  }

  succesAction() {
    this.state.navigation.navigate('Login');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <View style={styles.bottomContainer} />
        <View style={styles.centerContainer}>
          <Text style={styles.textContainer} type="GeosansLight">
            Ingrese su correo para enviarle su nueva contraseña.
          </Text>
          <Text style={styles.label} type="GeosansLight">Email</Text>
          <TextInput 
            placeTextColor="rgba(44, 62, 80,0.9)"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={value => this.setState({email: value.trim()})}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.passwordRecoveryAction()}>
            <Text style={styles.buttonText} type="GeosansLight">Enviar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer} />
      </KeyboardAvoidingView>
    );
  }
};

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
  logoImage: {
    width: Platform.OS === 'ios' ? wp('60%') : wp('70%'),
    height: Platform.OS === 'ios' ? hp('8%') : hp('9%')
  },
  leftHeader: {
    padding: 20,
    marginBottom: 20,
  },
  imageBack: {
    resizeMode: "contain",
    height: hp('7%'),
    width: wp('7%')
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer:{
    flex: 0.7,
    padding: 20,
    height: 10
  },
  textContainer:{
    fontSize: hp('6%'),
    textAlign: 'justify',
  },
  label: {
    color: '#2c3e50',
    fontSize: hp('3%'),
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: hp('4%'),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  borderContainer:{
    flex: 0.3,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 80,
    height: hp('5%'),
    marginTop: wp('4%'),
  },
  buttonText: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: hp('3%'),
  }
});