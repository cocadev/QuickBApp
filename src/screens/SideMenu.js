/**
 * @file SideMenu.js
 * @description This file show the side menu screen.
 * @author Fernando Mondragón
 * @date 14 MAY 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { Platform, AsyncStorage, StyleSheet, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text  from '../components/CustomText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/HeaderLogo'

/**
 * @description Export the side menu screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class SideMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      navigation: this.props.navigation,
      menu: []
    }
  }

  static navigationOptions = () => {
    return {
      headerTitle: <Header newStyles={styles.logoImage}/>,
      headerStyle: {
        borderTopWidth: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        borderTopColor: 'rgba(241, 196, 15,1.0)',
        borderBottomWidth: 5,
        borderBottomColor: 'rgba(241, 196, 15,1.0)',
        elevation: 0,
        shadowOpacity: 0,
        height: hp('25%'),
      },
    } 
  };

  async componentDidMount() {
    const menu = [
      {
        "name": "Favoritos",
        "logoAndroid": "md-heart",
        "logoIos": "ios-heart",
        "screen": "Favoritos"
      },{
        "name": "Cuenta",
        "logoAndroid": "md-person",
        "logoIos": "ios-person",
        "screen": "Cuenta"
      },{
        "name": "Recientes",
        "logoAndroid": "md-clock",
        "logoIos": "ios-clock",
        "screen": "Recientes"
      },{
        "name": "Notificaciones",
        "logoAndroid": "md-notifications",
        "logoIos": "ios-notifications",
        "screen": "Notificaciones"
      },{
        "name": "Mis Comentarios",
        "logoAndroid": "md-chatboxes",
        "logoIos": "ios-chatboxes",
        "screen": "Comentarios"
      },{
        "name": "Contacto/Legal",
        "logoAndroid": "md-star",
        "logoIos": "ios-star",
        "screen": "Calificación"
      }     
    ]
    this.setState({menu});
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  selectionAction(screen) {
    console.log(' ****** screen ****** ', screen)
    this.state.navigation.navigate(screen);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
            <Text style={styles.title} type="Caviar_Dreams_Bold">
              Inicio / Registro
            </Text>
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            data={this.state.menu}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              <TouchableOpacity 
                style={styles.flatview} 
                onPress={() => this.selectionAction(item.screen)}
              >
                <Ionicons
                  name={
                    Platform.OS === 'ios'
                      ? item.logoIos
                      : item.logoAndroid
                  }
                  size={25}
                  color="black"
                />
                <Text style={styles.text} type="CaviarDreams">{item.name}</Text>
              </TouchableOpacity>
            }
            keyExtractor={item => item.name}
          />
        </View>
        <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => this._signOutAsync()}>
              <Text style={styles.text} type="CaviarDreams">
                 Cerrar sesión
              </Text>
            </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
  },
  title: {
    paddingTop: 15,
    paddingHorizontal: 75,
    fontSize: hp('4%'),
    color: 'blue',
  },
  bodyContainer: {
    flex: 6,
  },
  flatview: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 35,
    borderRadius: 2,
  },
  text: {
    fontSize: hp('3%'),
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1.15,
    justifyContent: 'center',
    marginTop: 10,
    borderTopWidth: 5,
    borderTopColor: 'rgb(198,194,194)',
    paddingHorizontal: 55,
  },
});