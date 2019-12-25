/**
 * @file Register.js
 * @description This file show the register screen.
 * @author Fernando Mondragón
 * @date 10 APR 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, TextInput, KeyboardAvoidingView, Alert, AsyncStorage, Image, Platform } from 'react-native';
import Text  from '../components/CustomText';
import { ApiClient } from '../components/Api';
import Loader from '../components/Loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Images from '../constants/Images';
import Header from '../components/HeaderLogo';

/**
 * @description Export the register screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Register extends Component {
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
      idUser: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      loading: false
    }
  }

  continueAction(params) {
    this.setState({ loading: true })
    ApiClient.getRegisterResponse(params)
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
          'Lo sentimos.', 'El email ya esta registrado, favor de verificar.',
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

  resetForm() {
    this.setState({ loading: false })
    this.nameInput.clear();
    this.lastNameInput.clear()
    this.emailInput.clear();
    this.passwordInput.clear();
  }

  registerAction() {
    var name = this.state.name;
    var lastName = this.state.lastName;
    var email = this.state.email;
    var password = this.state.password;

    const params = {
      n: name,
      a: lastName,
      e: email,
      p: password,
    };

    if (name == '' || lastName == '' || email == '' || password == ''){
      Alert.alert(
        'Campos incompletos', 'Todos los campos deben estar llenos',
        [{
          text: 'OK'
        }],
      );
    } else {
      Alert.alert(
        'Terminos y Condiciones',
        'Los siguientes términos y condiciones (los "Términos y Condiciones") \n rigen el uso que usted le dé a este sitio web y a cualquiera de los contenidos disponibles por o a través de este sitio web, incluyendo cualquier contenido derivado del mismo (el "Sitio Web"). Time Inc. ("Time Inc." o "nosotros") ha puesto a su disposición el Sitio Web. Podemos cambiar los Términos y Condiciones de vez en cuando, en cualquier momento sin ninguna notificación, sólo publicando los cambios en el Sitio Web. AL USAR EL SITIO WEB, USTED ACEPTA Y ESTÉ DE ACUERDO CON ESTOS TÉRMINOS Y CONDICIONES EN LO QUE SE REFIERE A SU USO DEL SITIO WEB. Si usted no está de acuerdo con estos Términos y Condiciones, no puede tener acceso al mismo ni usar el Sitio Web de ninguna otra manera. 1.Derechos de Propiedad. Entre usted y Time Inc., Time Inc. es dueño único y exclusivo, de todos los derechos, título e intereses en y del Sitio Web, de todo el contenido (incluyendo, por ejemplo, audio, fotografías, ilustraciones, gráficos, otros medios visuales, videos, copias, textos, software, títulos, archivos de Onda de choque, etc.), códigos, datos y materiales del mismo, el aspecto y el ambiente, el diseño y la organización del Sitio Web y la compilación de los contenidos, códigos, datos y los materiales en el Sitio Web, incluyendo pero no limitado a, cualesquiera derechos de autor, derechos de marca, derechos de patente, derechos de base de datos, derechos morales, derechos sui generis y otras propiedades intelectuales y derechos patrimoniales del mismo. Su uso del Sitio Web no le otorga propiedad de ninguno de los contenidos, códigos, datos o materiales a los que pueda acceder en o a través del Sitio Web.',
        [
          {
            text: 'Acepto Términos y Condiciones',
            onPress: () => this.continueAction(params),
          },
          {
            text: 'Cancelar',
          },
        ]
      );
    }
  }

  _signInAsync = async () => {
    var { idUser, social } = this.state;
    const user = {
      idUser: idUser,
      social: social
    }
    await AsyncStorage.setItem('user', JSON.stringify(user));
    this.props.navigation.navigate('RegisterApp');
  };

  render() {
    var { loading } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <View style={styles.topContainer}>
          <Text style={styles.title} type="GeosansLight">Registro</Text>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.label} type="GeosansLight">Nombre</Text>
          <TextInput 
            placeTextColor="rgba(44, 62, 80,0.9)"
            returnKeyType="next"
            onSubmitEditing={() => this.lastNameInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            ref={(input) => this.nameInput = input}
            onChangeText={value => this.setState({name: value.trim()})}
          />
          <Text style={styles.label} type="GeosansLight">Apellido</Text>
          <TextInput 
            placeTextColor="rgba(44, 62, 80,0.9)"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            ref={(input) => this.lastNameInput = input}
            style={styles.input}
            onChangeText={value => this.setState({lastName: value.trim()})}
          />
          <Text style={styles.label} type="GeosansLight">Correo</Text>
          <TextInput 
            placeTextColor="rgba(44, 62, 80,0.9)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            ref={(input) => this.emailInput = input}
            style={styles.input}
            onChangeText={value => this.setState({email: value.trim()})}
          />
          <Text style={styles.label} type="GeosansLight">Contraseña</Text>
          <TextInput
            placeTextColor="rgba(44, 62, 80,0.9)"
            returnKeyType="go"
            onSubmitEditing={() => this.registerAction()}  
            secureTextEntry
            style={styles.input}
            ref={(input) => this.passwordInput = input}
            onChangeText={value => this.setState({password: value.trim()})}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={() => {this.registerAction()}}>
              <Text style={styles.buttonText} type="GeosansLight">Finalizar</Text>
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
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 0.6,
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
    flex: 3,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  label: {
    color: '#2c3e50',
    fontSize: hp('3%'),
    paddingHorizontal: 10,
  },
  input: {
    height: hp('4%'),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  buttonImage: {
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
    height: hp('10%'),
    width: wp('15%'),
    marginTop: 10,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 80,
    height: hp('5%'),
    marginTop: wp('2%'),
  },
  buttonText: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: hp('3%'),
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