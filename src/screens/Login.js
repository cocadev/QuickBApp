/**
 * @file Login.js
 * @description This file show the login screen.
 * @author Fernando Mondragón
 * @date 01 APR 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { 
  AsyncStorage, 
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Text  from '../components/CustomText';
import Loader from '../components/Loader';
import { ApiClient } from '../components/Api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/HeaderLogo';

/**
 * @description Export the login screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Login extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: <Header newStyles={styles.logoImage}/>
    } 
  };

  constructor(props) {
    super(props)
    this.state = {
      navigation: this.props.navigation,
      idUser: '',
      social: 0,
      email: '',
      password: '',
      loading: false
    }
  }

  loginAction() {
    var { email, password } = this.state;

    if ( email == "" || password == "" ){
      Alert.alert(
        'Campos incompletos', 'Todos los campos deben estar llenos',
        [{
          text: 'OK'
        }],
        {cancelable: false}
      );
    } else {
      const params = {
        e: email,
        p: password
      };
      this.setState({ loading: true })
      ApiClient.getLoginResponse(params)
      .then(response => {
        let result = response[0];
        if (result.mensaje == "success") { 
          this.setState({
            idUser: result.idUsuario,
            social: result.social
          });
          this._signInAsync();
        } else {
          Alert.alert(
            'Lo sentimos.', 'El usuario o contraseña no coinciden, Favor de verificar.',
            [{
              text: 'OK',
              onPress: () => this.resetForm()
            }],
            {cancelable: false}
          );
        }
      })
      .catch(error => {
          Alert.alert(
            'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error,
            [{
              text: 'OK',
              onPress: () => this.resetForm()
            }],
            {cancelable: false}

          );
      });
    }
  }

  resetForm() {
    this.emailInput.clear();
    this.passwordInput.clear();
    this.setState({ 
      loading: false,
      email: '',
      password: '' 
    })

  }

  registerAction() {
    this.state.navigation.navigate('Register');
  }

  forgotAction() {
    this.state.navigation.navigate('PasswordRecovery');
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        const params = {
          i: result.user.id,
          n: result.user.name,
          e: result.user.email,
          p: result.user.photoUrl
        };
        this.validateUser(params);
      }
    } catch (e) {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + e ,
        [{
          text: 'OK'
        }],
        {cancelable: false}
      );
    }
  }

  async signInWithFacebookAsync() {
    try {
      const {
        type,
        token,
      } = await Expo.Facebook.logInWithReadPermissionsAsync( idFB , {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.type(large)`);
        const userInfo = await response.json();
        const params = {
          i: userInfo.id,
          n: userInfo.name,
          e: userInfo.email,
          p: userInfo.picture.data.url
        };
        this.validateUser(params);
      }
    } catch ({ message }) {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + message ,
        [{
          text: 'OK'
        }],
        {cancelable: false}
      );
    }
  }

  validateUser(params) {
    ApiClient.getSocialLoginResponse(params)
      .then(response => {
        let result = response[0];
        if (result.mensaje == "success") { 
          this.setState({
            idUser: result.idUsuario,
            social: result.social
          });
          this._signInAsync();
        } else {
          Alert.alert(
            'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + result.mensaje,
            [{
              text: 'OK'
            }],
            {cancelable: false}
          );
        }
      })
      .catch(error => {
          Alert.alert(
            'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error,
            [{
              text: 'OK'
            }],
            {cancelable: false}
          );
      });
  }

  _signInAsync = async () => {
    var { idUser, social } = this.state;
    const user = {
      idUser: idUser,
      social: social
    }
    await AsyncStorage.setItem('user', JSON.stringify(user));
    this.props.navigation.navigate('App');
  };

  render() {
    var { loading } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <View style={styles.topContainer}>
          <Text style={styles.title} type="GeosansLight">Bienvenido!!</Text>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.label} type="GeosansLight">Email</Text>
          <TextInput 
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              ref={(input) => this.emailInput = input}
              onChangeText={value => this.setState({email: value.trim()})}
          />
          <Text style={styles.label} type="GeosansLight">Contraseña</Text>
          <TextInput
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="go"
              onSubmitEditing={() => this.loginAction()} 
              secureTextEntry
              style={styles.input}
              ref={(input) => this.passwordInput = input}
              onChangeText={value => this.setState({password: value.trim()})}
          />
          <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={() => {this.loginAction()}}
          >
              <Text style={styles.buttonText} type="GeosansLight">Iniciar sesión</Text>
          </TouchableOpacity>
          <Text style={styles.labelContainer} type="GeosansLight">ó</Text>
          <Text style={styles.labelContainer} type="GeosansLight">con redes sociales</Text>
          <View style={styles.socialButtonsContainer}>
            <FontAwesome.Button 
              name="google" 
              backgroundColor="#E95D02" 
              onPress={() => this.signInWithGoogleAsync()}
              style={styles.socialButton}
            />
            <FontAwesome.Button 
              name="facebook" 
              backgroundColor="#3b5998" 
              onPress={() => this.signInWithFacebookAsync()}
              style={styles.socialButton}
            />
          </View>
          <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => {this.registerAction()}}
          >
            <Text style={styles.buttonText} type="GeosansLight">Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.forgotButtonText} 
            onPress={() => this.forgotAction()}
          >
            <Text style={styles.forgotbutton} type="GeosansLight">¿Olvide mi contraseña?</Text>
          </TouchableOpacity>
        </View>
        { loading &&
          <Loader visible={ loading } containerStyle={styles.loading} />
        } 
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
    width: wp('70%'),
    height: hp('9%')
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  topContainer: {
    flex: 0.5,
    alignItems:'center'
  },
  title: {
    color: '#2c3e50',
    width: wp('60%'),
    textAlign: 'center',
    opacity: 0.9,
    fontSize: hp('6%'),
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewContainer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingTop: 50
  },
  label: {
    color: '#2c3e50',
    fontSize: hp('3%'),
    paddingHorizontal: 10
  },
  input: {
    height: hp('4%'),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  buttonContainer: {
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 80,
    height: hp('5%'),
    marginTop: wp('5%')
  },
  buttonText: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: hp('3%')
  },
  labelContainer: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: hp('3%'),
    marginTop: 10
  },
  socialButtonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === "ios" ? hp('6%') : hp('3%')
  },
  socialButton:{
    width: wp('30%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotButtonText: {
    textAlign: 'center',
    marginTop: 10
  },
  forgotbutton: {
    color: '#767676',
    fontSize: hp('2%'),
    textAlign: 'center'
  },
  loading: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    opacity: 0.5,
    backgroundColor: 'gray'
  }
});

/**
 * @proyect QuickB
 * @const  {integer} idFB
 */
const idFB = '562724884262162';

/**
 * @proyect QuickB
 * @const  {String} iosClientId
 */
const iosClientId = '216125194291-ih4un7s507ijl1rk2035tqnu4pua3uvq.apps.googleusercontent.com';

/**
 * @proyect QuickB
 * @const  {String} androidClientId
 */
const androidClientId = '216125194291-llpajtadtnnkh4skehmuapqessfhbbr3.apps.googleusercontent.com';