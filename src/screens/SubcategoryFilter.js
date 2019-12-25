/**
 * @file SubcategoryFilter.js
 * @description This file show all the subacetegories than we can selected for filter some bussines list.
 * @author Fernando Mondragón
 * @date 12 AGU 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Alert, FlatList,  Image, AsyncStorage } from 'react-native';
import Text  from '../components/CustomText';
import CheckBox from 'react-native-checkbox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiClient } from '../components/Api';
import Loader from '../components/Loader';
import Images from '../constants/Images';

/**
 * @description Export the SubcategoryFilter screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class SubcategoryFilter extends Component {
  constructor(props) {
    super(props);
    const idCategoria = this.props.navigation.getParam('idCategoria', '');
    this.state = {
      navigation: this.props.navigation,
      idCategoria: idCategoria,
      loading: true,
      checked: [],
      subcategorias: [],
      subcategoriasFilter: []
    };
  };

  static navigationOptions = ({ navigation }) => {
    var subcategoriasFilter = navigation.getParam('subcategoriasFilter');
    return {
        headerTitle: (
            <Text style={styles.titleContainer} type="GeosansLight">Subcategoría</Text>
        ),
        headerLeft: (
            <TouchableOpacity style={styles.leftHeader} onPress={() => this._popContinue(navigation)}>
                <Image
                  source={ Images.left }
                  fadeDuration={0}
                  style={styles.imageBack}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity style={styles.rightHeader} onPress={() => this._continueAction(subcategoriasFilter, navigation)}>
                <Image
                  source={ Images.ok }
                  fadeDuration={0}
                  style={styles.imageBack}
                />
            </TouchableOpacity>
        ),
        headerStyle: {
            borderBottomWidth: hp('5%'),
            borderBottomColor: 'rgba(241, 196, 15,1.0)',
            elevation: 0,
            shadowOpacity: 0,
            height: hp('20%'),
        },
    }  
  };

  static _popContinue = async (navigation) => {
    try {
      await AsyncStorage.removeItem('subcategoriasFilter');
      navigation.pop();
    } catch(exception) {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + exception,
        [{
          text: 'OK'
        }],
      )
    }
  };

  static _continueAction = async (subcategoriasFilter, navigation) => {
    await AsyncStorage.removeItem('subcategoriasFilter');
    await AsyncStorage.setItem('subcategoriasFilter', JSON.stringify(subcategoriasFilter));
    navigation.pop();
  }

  componentDidMount() {
    this.cleanData();
    this.getData();
  };

  async cleanData() {
    await AsyncStorage.removeItem('subcategoriasFilter');
  }

  getData() {
    var { idCategoria } = this.state;
    const params = {
      i: idCategoria,
    };
    ApiClient.getBussinesSubcategoryList(params)
    .then(response => { 
      clearTimeout(this.timer);
      this.setState({
        subcategorias: response,
        loading: false
      });
      this.timer = setTimeout(() => this.iterationArray(), WAIT_INTERVAL);
    })
    .catch(error => {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error ,
          [{
            text: 'OK',
            onPress: [
              this.setState({
                loading: false,
                subcategorias: [],
                checked: []
              }) 
            ]  
          }],
        ); 
    });
  }

  iterationArray() {
    var { subcategorias } = this.state;
    var check = [];
    subcategorias.forEach(() => {
      check.push(false);
    });
    this.setState({ checked: check });
  }

  checkAction(idSubCategoria) {
    var { subcategoriasFilter } = this.state,
        index = this._getIndexArray(idSubCategoria),
        validateArray = this._getValidateArray(index);
    if (validateArray) {
      subcategoriasFilter.splice(index, 1);
    } else {
      subcategoriasFilter.push(idSubCategoria);
    }
    this.state.navigation.setParams({subcategoriasFilter: subcategoriasFilter});
  }

  _getIndexArray(idSubCategoria) {
    var { subcategoriasFilter } = this.state;
    let index = subcategoriasFilter.indexOf(idSubCategoria);
    return index
  }

  _getValidateArray(index) {
    if (index > -1) {
      return true
    }
    return false
  }

  render() {
    var { loading, subcategorias, checked } = this.state;
    if ( !loading ) {
      return (
        <View style={styles.container}>
          <FlatList
            data={subcategorias}
            renderItem={({item, index}) => (
              <View style={styles.subcategoryContainer}>
                <View style={styles.textContainer}>
                  <Text type="CaviarDreams" style={styles.nameSubcategory}>
                    {item.nombre}
                  </Text>
                </View>
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    label={null}
                    checked={checked[index]}
                    onChange={(checked) => this.checkAction(item.idSubCategoria)}
                  />
                </View>
              </View>
            )}
            keyExtractor={item => item.idSubCategoria.toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Loader visible={ loading }/>
        </View>
      );
    }
  }
}

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
    leftHeader: {
      padding: 20
    },
    imageBack: {
      resizeMode: "contain",
      height: hp('7%'),
      width: wp('7%')
    },
    rightHeader: {
      padding: 30
    },
    titleContainer: {
      justifyContent: 'center',
      fontSize: Platform.OS === 'ios' ? hp('4%') : hp('7%'),
      paddingLeft: 15
    },
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    subcategoryContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      height: hp('15%'),
      width: wp('100%'),
      marginVertical: Platform.OS === 'ios' ? 22 : 10,
      paddingHorizontal: 23,
      justifyContent: 'flex-end'
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      paddingHorizontal: 20
    },
    nameSubcategory: {
      textAlign: 'left',
      fontSize:  hp('3%'),
      color: 'black'
    },
    checkBoxContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    }
});

/**
 * @proyect QuickB
 * @const  {Integer} WAIT_INTERVAL
 */
const WAIT_INTERVAL = 1000;
