import React from 'react';
import * as Font from 'expo-font';
import { ActivityIndicator, View, StyleSheet, Alert, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { AppPermissions } from './src/config/AppPermissions';
import MainNavigation from './src/navigation/MainNavigation';
import _Likes from './src/screens/_Likes';
import _MisNegocios from './src/screens/_MisNegocios';
import _Pagos from './src/screens/_Pagos';
import _Mensajes from './src/screens/_Mensajes';
import _Editor from './src/screens/_Editor';
import _Productos from './src/screens/_Productos';
import _Promociones from './src/screens/_Promociones';
import _Promoción from './src/screens/_Promoción';
import _Vistaprevia from './src/screens/_Vistaprevia';
import _Paquetes from './src/screens/_Paquetes';
import _Ayuda from './src/screens/_Ayuda';
import _Registrar from './src/screens/Registrar/_Registrar';
import _BuscaTuNegocio from './src/screens/Registrar/_BuscaTuNegocio';
import _Resultados from './src/screens/Registrar/_Resultados';
import _Agregar from './src/screens/Registrar/_Agregar';
import _Map from './src/screens/Registrar/_Map';
import _Registrar2 from './src/screens/Registrar/_Registrar2';
import _Verificación from './src/screens/Registrar/_Verificación';
import _Registrar4 from './src/screens/Registrar/_Registrar4';
import _Registrar5 from './src/screens/Registrar/_Registrar5';
import _FotoPortada from './src/screens/_FotoPortada';
import _FotodePerfil from './src/screens/_FotoDePerfil';
import _EditarPerfil from './src/screens/_EditarPerfil';
import _MisComentarios from './src/screens/_MisComentarios';
import _Notificaciones from './src/screens/_Notificaciones';
import _Recientes from './src/screens/_Recientes';
import _Contacto from './src/screens/_Contacto';
import _Favoritos from './src/screens/_Favoritos';
import _Cuenta from './src/screens/_Cuenta';
import _DropDown from './src/components/_DropDown';
import FlashMessage from "react-native-flash-message";

/*
Name: App
Description: This function is the main fo the app for do the correct navigation
Made: Fernando Mondragón 01/04/2019
Return: ""
*/

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'CaviarDreams': require('./src/assets/fonts/CaviarDreams.ttf'),
      'GeosansLight': require('./src/assets/fonts/GeosansLight.ttf'),
      'Caviar_Dreams_Bold': require('./src/assets/fonts/Caviar_Dreams_Bold.ttf'),
      // 'CaviarDreams_BoldItalic' : require('./src/assets/fonts/CaviarDreams_BoldItalic.ttf'),
      // 'CaviarDreams_Italic' : require('./src/assets/fonts/CaviarDreams_Italic.ttf'),
      // 'GeosansLight-Oblique' : require('./src/assets/fonts/GeosansLight-Oblique.ttf'),
      // 'gothamblack' : require('./src/assets/fonts/gothamblack.ttf'),
      // 'gothamblackitalic' : require('./src/assets/fonts/gothamblackitalic.ttf'),
      // 'gothambold2' : require('./src/assets/fonts/gothambold2.ttf'),
      // 'gothambolditalic2' : require('./src/assets/fonts/gothambolditalic2.ttf'),
      // 'gothambook2' : require('./src/assets/fonts/gothambook2.ttf'),
      // 'gothambookitalic2' : require('./src/assets/fonts/gothambookitalic2.ttf'),
      // 'GothamLightItalic' : require('./src/assets/fonts/GothamLightItalic.ttf'),
      // 'gothammedium2' : require('./src/assets/fonts/gothammedium2.ttf'),
      // 'gothammediumitalic' : require('./src/assets/fonts/gothammediumitalic.ttf')
    });

    this.setState({ fontLoaded: true });

    AppPermissions.location()
      .catch(error => {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error,
          [{
            text: 'OK'
          }],
        );
      });

    AppPermissions.cameraRoll()
      .catch(error => {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error,
          [{
            text: 'OK'
          }],
        );
      });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null} enabled
        style={{ flex: 1 }}
      >
        <MyStatusBar backgroundColor="#2699FB" barStyle="light-content" />

        {this.state.fontLoaded ? (
          /* // <_Likes />
          // <_Mensajes />
          // <_Editor />
          // <_Productos />
          // <_Promociones />
          // <_Promoción />
          // <_Vistaprevia />

          // <_Paquetes />
          // <_Ayuda />

          // <_Resultados />
          // <_Map />
          // <_Verificación />
          // <_Registrar4 />
          // <_Registrar5 />
          // <_FotoPortada />
          // <_FotodePerfil />
          // <_EditarPerfil />

          // <_MisComentarios />
          // <_Notificaciones />
          // <_Recientes />
          // <_Contacto />
          // <_Favoritos />
          // <_Cuenta />

          // <_Pagos />
          // <_MisNegocios />
          // <_Registrar />
          // <_BuscaTuNegocio />
          // <_Agregar />
          // <_Registrar2 />

          // <_DropDown /> */
          <MainNavigation />
        ) : (
            <View style={styles.appContainer}>
              <ActivityIndicator size="large" />
            </View>
          )
        }
        <FlashMessage position="bottom" />
      </KeyboardAvoidingView>
    );

    /* 1. Navigate to the Details route with params */
    this.props.navigation.navigate('MainNavigation', {
      type: 'failure',
    });
  }
}

// Name: Constants
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  statusBar: {
    height: 24,
  },
  content: {
    flex: 1,
    backgroundColor: '#2699FB',
  },
});
