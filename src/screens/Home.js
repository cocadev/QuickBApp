/**
 * @file Home.js
 * @description This file show the home screen.
 * @author Fernando Mondragón
 * @date 01 APR 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Image, TouchableOpacity, Platform, FlatList, Alert, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';
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
 * @description Export the home screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Home extends Component {
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
        borderTopColor: 'rgba(241, 196, 15,1.0)',
        borderBottomWidth: 5,
        borderBottomColor: 'rgba(241, 196, 15,1.0)',
        elevation: 0,
        shadowOpacity: 0,
        height: hp('12%')
      }
    } 
  };

  constructor(props) {
    super(props)
    this.state = {
      navigation: this.props.navigation,
      dataSource: [],
      loading: true,
      search: '',
      fullData: []
    }
  }

  componentDidMount() {
    this.getCategories();
  };

  getCategories() {
    ApiClient.getCategoriesItems(20, this.state.search)
    .then(data => {
      this.setState({
        dataSource: data,
        loading: false,
        fullData: data
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

  getItem(idCategoria, nombreCategoria) {
    let colorCategoria = this.getColorCategory(idCategoria);
    this.state.navigation.navigate('BussinesList', { idCategoria: idCategoria, nombreCategoria: nombreCategoria, colorCategoria: colorCategoria });
  }

  getColorCategory(idCategoria) {
    let color = '';
    switch (idCategoria) {
      case 'CAT_G4S':
        color = '#577D68';
        break;
      case 'CAT_EBT':
        color = '#FFEA2E';
        break;
      case 'CAT_RMF':
        color = '#D60B7B';
        break;
      case 'CAT_RK1':
        color = '#D12E28';
        break;
      case 'CAT_W9O':
        color = '#DE6225';
        break;
      case 'CAT_05M':
        color = '#009EDC';
        break;
      case 'CAT_3WB':
        color = '#A12D86';
        break;
      case 'CAT_SRO':
        color = '#D61F50';
        break;
      case 'CAT_Y4G':
        color = '#A7C349'
        break;
      default:
        return null;
    }
    return color
  }

  handleSearch = (text) => {
    this.setState({search: text});
    let formatQuery = text.toLowerCase();
    let categories = this.state.fullData;
    if (!formatQuery || formatQuery === ''){
      this.setState({
        dataSource: categories
      })
    }
  }

  filterSearch() { 
    let text = this.state.search;
    let formatQuery = text.toLowerCase();
    let categories = this.state.fullData;
    let filteredCategory = categories.filter((item) => {
      return item.nombre.toLowerCase().match(formatQuery)
    })
    if (!formatQuery || formatQuery === ''){
      this.setState({
        dataSource: categories
      })
    } else if (Array.isArray(filteredCategory)) {
      this.setState({
        dataSource: filteredCategory
      })
    }
  }

  render() {
    var { search, dataSource, loading } = this.state;
    if (!loading) {
      return (
        <View style={ styles.container }>
          <View style={ styles.searchContainer }>
            <SearchBar
              lightTheme
              placeholder="Buscar"
              onChangeText={ this.handleSearch }
              value={ search }
              searchIcon={false}
              onSubmitEditing={() => this.filterSearch()}
              containerStyle = {styles.searchbarContainer}
              inputContainerStyle = {styles.searchbar}
              inputStyle = {styles.searchbarText}
            />
            <TouchableOpacity style={styles.searchFilterButton} onPress={() => this.filterSearch()}>
              <Image
                source={Images.search}
                fadeDuration={0}
                style={styles.searchFilterImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchFilterButton} onPress={() => this.filterSearch()}>
              <Image
                source={Images.filterHome}
                fadeDuration={0}
                style={styles.searchFilterImage}
              />
            </TouchableOpacity>
          </View>
          <View style = {styles.dataContainer}>
            <FlatList
              data={ dataSource }
              numColumns={ numColumns }
              style={{FlexBasis: 0}}
              renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.9} style={styles.listItem} onPress={() => this.getItem(item.idCategoria, item.nombre)}>
                  <Image source = {{ uri: item.imagen }} style={styles.categoryImage} />
                  <Text 
                    style={styles.categorytext} 
                    type="GeosansLight"
                  >
                  { item.nombre }
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.idCategoria.toString()}
            />
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer:{
    flex: 0.04,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  searchbarContainer:{
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 0,
    paddingVertical: 0
  },
  searchbar:{
    borderRadius: 30,
    height: hp('4%'),
    width: wp('67%'),
    justifyContent: 'center',
    backgroundColor: '#DFDEDE'
  },
  searchbarText: {
    textAlign: 'center',
  },
  searchFilterButton: {
    marginHorizontal: 6,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchFilterImage: {
    resizeMode: "contain",
    height: hp('5%'),
    width: wp('7.5%')
  },
  dataContainer: {
    flex: 0.96
  },
  listItem: {
    marginHorizontal: wp('4.16%')
  },
  categoryImage: {
    resizeMode: "contain",
    height: hp('20%'),
    width: wp('25%')
  },
  categorytext: {
    fontSize: hp('2.5%'),
    textAlign: 'center'
  }
});