/**
 * @file Comunity.js
 * @description This file show the comunity screen.
 * @author Fernando Mondragón
 * @date 14 MAY 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform, FlatList, Alert, AsyncStorage, Dimensions, StatusBar } from 'react-native';
import Text  from '../components/CustomText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/HeaderLogo';
import { ApiClient } from '../components/Api';
import Loader from '../components/Loader';
import Images from '../constants/Images';

/**
 * @proyect QuickB
 * @const  {Integer} numColumns
 */
const numColumns = 3;

/**
 * @proyect QuickB
 * @const  {Integer} width
 */
const { width } = Dimensions.get('window');

/**
 * @proyect QuickB
 * @const  {Integer} itemSpace
 */
const itemSpace = 1;

/**
 * @proyect QuickB
 * @const  {Integer} paddingItem
 */
const paddingItem = 10;

/**
 * @proyect QuickB
 * @const  {Integer} totalSpace
 */
const totalSpace = itemSpace * (numColumns + 1);

/**
 * @proyect QuickB
 * @const  {Integer} imageSize
 */
const imageSize = ((width / numColumns) - totalSpace) - (paddingItem * 2);

/**
 * @description Export the Comunity screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Comunity extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Header newStyles={styles.logoImage}/>,
      headerRight: (
        <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('Map')}>
          <Image
            source={Images.map}
            fadeDuration={0}
            style={styles.mapImage}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderTopWidth: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        borderTopColor: 'black',
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        elevation: 0,
        shadowOpacity: 0,
        height: hp('12%'),
      },
    } 
  };

  constructor(props) {
    super(props)
    this.state = {
      navigation: this.props.navigation,
      dataSource: [],
      loading: true,
      idUser: ''
    }
  }

  componentDidMount() {
    this.getData();
    this.getBussinesSetting();
  };

  getData() {
    AsyncStorage.getItem('user').then((response) => {
      var user = JSON.parse(response);
      this.setState({ idUser: user.idUser })
    });
  };

  getBussinesSetting() {
    const params = {
      i: this.state.idUser
    };
    ApiClient.getBussinesSetting(params)
    .then(data => {
      this.setState({
        dataSource: data,
        loading: false
      });
    })
    .catch(error => {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error,
        [{
          text: 'OK',
          onPress: [
            this.setState({
              loading: false
            })
          ]  
        }],
      );
    });
  }

  getItem(nombreScreen) {
    console.log(nombreScreen);   
    return this.state.navigation.navigate(nombreScreen);
  }

  render() {
    var { dataSource, loading } = this.state;
    if (!loading) {
      return (
        <View style={ styles.container }>
          <FlatList
            data={ dataSource }
            numColumns={ numColumns }
            style={{FlexBasis: 0}}
            renderItem={({item}) => (
              <TouchableOpacity activeOpacity={0.9} style={styles.listItem} onPress={() => this.getItem(item.nombreScreen)}>
                <Image source = {{ uri: item.imagen }} style={styles.bussinesSettingsImage} />
                <Text 
                  style={styles.bussinesSettingsText} 
                  type="GeosansLight"
                >
                { item.nombre }
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.idIcono.toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Loader visible={this.state.loading}/>
        </View>
      );
    }
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
  rightHeader: {
    paddingRight: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 20,
  },
  mapImage: {
    resizeMode: "contain",
    height: hp('7%'),
    width: wp('7%')
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },  
  listItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    margin: itemSpace,
    paddingVertical: 23,
    paddingHorizontal: 5
  },
  bussinesSettingsImage: {
    resizeMode: "contain",
    height: imageSize,
    width: imageSize
  },
  bussinesSettingsText: {
    fontSize: hp('2.2%'),
    textAlign: 'center'
  }
});