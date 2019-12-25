/**
 * @file HomeNavigation.js
 * @description This file do the home navigation.
 * @author Fernando Mondragón
 * @date 01 APR 2019
 * @version v1.1
 */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../constants/Images';
import HomeScreen from '../screens/Home';
import SideMenuScreen from '../screens/SideMenu';
import ComunityScreen from '../screens/Comunity';
import MessageScreen from '../screens/Message';
import MessageContainerScreen from '../screens/MessageContainer';
import NotificationScreen from '../screens/Notification';
import FavoriteScreen from '../screens/Favorite';
import CountScreen from '../screens/Count';
import RecentScreen from '../screens/Recent';
import MapScreen from '../screens/Map';
import BussinesListScreen from '../screens/BussinesList';
import BussinesDetailScreen from '../screens/BussinesDetail';
import BussinesListFilterScreen from '../screens/BussinesListFilter';
import DistanceFilterScreen from '../screens/DistanceFilter';
import SubcategoryFilterScreen from '../screens/SubcategoryFilter';
import ComentariesScreen from '../screens/Comentaries';
import _Pagos from '../screens/_Pagos';
import _MisNegocios from '../screens/_MisNegocios';
import _Likes from '../screens/_Likes';
import _Registrar from '../screens/Registrar/_Registrar';
import _BuscaTuNegocio from '../screens/Registrar/_BuscaTuNegocio';
import _Registrar5 from '../screens/Registrar/_Registrar5';
import _Registrar4 from '../screens/Registrar/_Registrar4';
import _Resultados from '../screens/Registrar/_Resultados';
import _Agregar from '../screens/Registrar/_Agregar';
import _DropDown from '../components/_DropDown';
import _Map from '../screens/Registrar/_Map';
import _Registrar2 from '../screens/Registrar/_Registrar2';
import _Verificación from '../screens/Registrar/_Verificación';
import _Paquetes from '../screens/_Paquetes';
import _Ayuda from '../screens/_Ayuda';
import _Promociones from '../screens/_Promociones';
import _Promoción from '../screens/_Promoción';
import _Vistaprevia from '../screens/_Vistaprevia';
import _EditarPerfil from '../screens/_EditarPerfil';
import _FotoDePerfil from '../screens/_FotoDePerfil';
import _FotoPortada from '../screens/_FotoPortada';
import _Mensajes from '../screens/_Mensajes';

import _Cuenta from '../screens/_Cuenta';
import _Recientes from '../screens/_Recientes';
import _Notificaciones from '../screens/_Notificaciones';
import _MisComentarios from '../screens/_MisComentarios';
import _Favoritos from '../screens/_Favoritos';
import _Contacto from '../screens/_Contacto';
import _Productos2 from '../screens/_Productos2';
import _Editor from '../screens/_Editor';
import _Productos from '../screens/_Productos';
import _UpdatedDropDown from '../components/_UpdatedDropDown';



/**
 * @proyect QuickB
 * @const  {*} HomeStack
 */
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Map: MapScreen,
    BussinesList: BussinesListScreen,
    BussinesListFilter: BussinesListFilterScreen,
    BussinesDetail: BussinesDetailScreen,
    Comentaries: ComentariesScreen,
    DistanceFilter: DistanceFilterScreen,
    SubcategoryFilter: SubcategoryFilterScreen,
    MessageSc: MessageScreen,
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? Images.homeSelected : Images.homeUnselected }
      fadeDuration={0}
      style={styles.imageMenuHome}
    />
  )
};

/**
 * @proyect QuickB
 * @const  {*} SideMenuStack
 */
const SideMenuStack = createStackNavigator({
  SideMenu: SideMenuScreen,
  Favorite: FavoriteScreen,
  Count: CountScreen,
  Recent: RecentScreen,

  Cuenta: _Cuenta,
  Recientes: _Recientes,
  Notificaciones: _Notificaciones,
  Comentarios: _MisComentarios,
  Favoritos: _Favoritos,
  Calificación: _Contacto

});

SideMenuStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? Images.menuSelected : Images.menuUnselected }
      fadeDuration={0}
      style={styles.imageMenuHome}
    />
  ),
};

/**
 * @proyect QuickB
 * @const  {*} ComunityStack
 */
const ComunityStack = createStackNavigator({
  Comunity: ComunityScreen,
  Map: MapScreen,


  paysBussinesScreen: _Pagos,
  myBussinesScreen: _MisNegocios,
  likeBussinesScreen: _Likes,
  messageBussinesScreen: _Mensajes,

  registerBussinesScreen: _Registrar,
  registerBussinesScreen2: _BuscaTuNegocio,
  registerBussinesScreen3: _Resultados,
  registerBussinesScreen4: _Registrar4,
  registerBussinesScreen5: _Registrar5,

  registerBussinesScreen6: _Agregar,
  registerBussinesScreen7: _Registrar2,
  registerBussinesScreen8: _Verificación,

  dropDownScreen: _DropDown,
  updatedDropDownScreen: _UpdatedDropDown,

  mapScreen: _Map,

  packageBussinesScreen: _Paquetes,
  helpBussinesScreen: _Ayuda,
  promotionsBussinesScreen: _Promociones,
  vistapreviaScreen: _Vistaprevia,

  // profileBussinesScreen: _EditarPerfil,
  profileBussinesScreen: _Productos2,
  productScreen: _Productos,

  fotodePerfilScreen: _FotoDePerfil,
  fotoPortadaScreen: _FotoPortada,

  editorScreen: _Editor,

  

});

ComunityStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? Images.peopleSelected : Images.peopleUnselected }
      fadeDuration={0}
      style={styles.imagePeople}
    />
  ),
};

/**
 * @proyect QuickB
 * @const  {*} MessageStack
 */
const MessageStack = createStackNavigator({
  // MessageContainer: MessageContainerScreen,
  MessageContainer: _Mensajes,

  MessageSc: MessageScreen
});

MessageStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? Images.mailSelected : Images.mailUnselected }
      fadeDuration={0}
      style={styles.imageMessage}
    />
  ),
};

/**
 * @proyect QuickB
 * @const  {*} NotificationStack
 */
const NotificationStack = createStackNavigator({
  Notification: _Notificaciones
});

NotificationStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      source={ focused ? Images.notificationSelected : Images.notificationUnselected }
      fadeDuration={0}
      style={styles.imageNotification}
    />
  ),
};

/**
 * @proyect QuickB
 * @const  {*} BottomTabRoutes
 */
const BottomTabRoutes = {
  Side: SideMenuStack,
  Comunity: ComunityStack,
  Home: HomeStack,
  Message: MessageStack,
  Notification: NotificationStack
}

/**
 * @proyect QuickB
 * @const  {*} BottomTabConfiguration
 */
const BottomTabConfiguration = {
  initialRouteName: 'Home',
  tabBarOptions: {
    showLabel: false,
  }
}

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
  imageMenuHome: {
    resizeMode: "contain",
    height: hp('4.5%'),
    width: wp('4.5%')
  },
  imagePeople: {
    resizeMode: "contain",
    height: hp('5%'),
    width: wp('5%')
  },
  imageMessage: {
    resizeMode: "contain",
    height: hp('4.7%'),
    width: wp('4.7%')
  },
  imageNotification: {
    resizeMode: "contain",
    height: hp('4.3%'),
    width: wp('4.3%')
  }
});

/**
 * @description Export the bottom navigation.
 * @export {Class}
 */
export default createBottomTabNavigator(BottomTabRoutes, BottomTabConfiguration)