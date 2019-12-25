/**
 * @file BussinesList.js
 * @description This file show all the bussines of the selected category.
 * @author Fernando Mondragón
 * @date 29 JUN 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Alert, FlatList, ImageBackground, Image } from 'react-native';
import Text  from '../components/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SearchBar } from 'react-native-elements';
import { ApiClient } from '../components/Api';
import StarRating from 'react-native-star-rating';
import Loader from '../components/Loader';
import Images from '../constants/Images';

/**
 * @description Export the BussinesList screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class BusinessList extends Component {
  constructor(props) {
      super(props);
      const idCategoria = this.props.navigation.getParam('idCategoria', '');
      const nombreCategoria = this.props.navigation.getParam('nombreCategoria', '');
      const colorCategoria = this.props.navigation.getParam('colorCategoria', '');
      this.onEndReachedCalledDuringMomentum = true;
      this.state = {
        navigation: this.props.navigation,
        idCategoria: idCategoria,
        nombreCategoria: nombreCategoria,
        colorCategoria: colorCategoria,
        latitude: null,
        longitude: null,
        loading: true,
        isLoading: false,
        search: '',
        isSearching: false,
        filterSubcategory: [],
        filterDistance: 2,
        dataSource: [],
        page: 1,
        isLastPage: false,
        refreshing: false
      };
  };

  static navigationOptions = ({ navigation }) => {
    const colorCategoria = navigation.getParam('colorCategoria', '');
    return {
      headerTitle: (
        <Text type="CaviarDreams" style={styles.titleContainer}>{navigation.getParam('nombreCategoria', '')}</Text>
      ),
      headerLeft: (
        <TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
          <Image
            source={ Images.left }
            fadeDuration={0}
            style={styles.imageBack}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        borderBottomWidth: hp('5%'),
        borderBottomColor: colorCategoria,
        elevation: 0,
        shadowOpacity: 0,
        height: hp('20%'),
      },
    }  
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, () => this.getBusinessList()),
      (error) => [
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error,
          [{
            text: 'OK'
          }],
        )
      ]
    )
  };

  getBusinessList() {
    const { idCategoria, dataSource, page, latitude, longitude, search, filterDistance, filterSubcategory} = this.state;
    const params = {
        c: idCategoria,
        p: page,
        latUsuario: latitude,
        lonUsuario: longitude,
        s: search,
        fs: filterSubcategory,
        fd: filterDistance
    };
    ApiClient.getBusinessList(params)
    .then(response => {
      var isLastPage = false, 
          pageNumber = response.length / 4,
          pageConstant = Math.ceil(pageNumber);

      page < pageConstant ? isLastPage = true : isLastPage = false;

      this.setState({
          isLoading: false,
          isLastPage: isLastPage,
          loading: false,
          dataSource: [...dataSource, ...response],
          refreshing: false
      });
    })
    .catch(error => {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error ,
          [{
            text: 'OK',
            onPress: [
              this.setState({
                isLoading: false,
                loading: false,
                refreshing: false
              }) 
            ]  
          }],
        ); 
    });
  }

  handleSearch = (text) => {
    if (!text || text === '' || text === null){
      clearTimeout(this.timer);
      this.setState({ search: text });
      this.timer = setTimeout(() => this.handleRefresh(), WAIT_INTERVAL);
      return 
    }
    this.setState({ search: text });
  }



  _filter() {
    var { idCategoria, nombreCategoria, colorCategoria } = this.state;
    this.state.navigation.navigate('BussinesListFilter', { idCategoria: idCategoria, nombreCategoria: nombreCategoria, colorCategoria, colorCategoria });
  }
  _search() { 
    this.handleRefresh();
  }
  handleRefresh = () => {
    clearTimeout(this.timer);
    this.setState({
      dataSource: [],
      isLastPage: false,
      loading: false,
      page: 1,
      refreshing: true
    });
    this.timer = setTimeout(() => this.getBusinessList(), WAIT_INTERVAL); 
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true });
    if (!this.state.isLastPage) {
      this.setState({ isLoading: false });
      return;
    }
    this.setState({
          page: this.state.page + 1,
      }, () => {
        this.getBusinessList()
      }
    );
  };

  continueAction(idNegocio) {
    var { nombreCategoria, colorCategoria } = this.state;
    this.state.navigation.navigate('BussinesDetail', { idNegocio: idNegocio, nombreCategoria: nombreCategoria, colorCategoria: colorCategoria });
  }

  render() {
    var { search, dataSource, loading, isLoading } = this.state;
    if (!loading) {
      return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBarContainer}>
                <SearchBar
                  lightTheme
                  placeholder="Buscar"
                  onChangeText={ this.handleSearch }
                  value={ search }
                  searchIcon={false}
                  onSubmitEditing={() => this._search()}
                  containerStyle = {styles.searchbarContainer}
                  inputContainerStyle = {styles.searchbar}
                  inputStyle = {styles.searchbarText}
                />
                <TouchableOpacity style={styles.searchButton} onPress={() => this._search()}>
                  <Image
                    source={Images.search}
                    fadeDuration={0}
                    style={styles.searchFilterImage}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.filterContainer} onPress={() => this._filter()}>
                <Image
                  source={Images.filter}
                  fadeDuration={0}
                  style={styles.searchFilterImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                  data={dataSource}
                  renderItem={({item}) => (
                      <TouchableOpacity style={styles.labelBussines} onPress={() => this.continueAction(item.idNegocio)}>
                        <ImageBackground style={styles.bussinesImage} source = {{ uri: item.logo }} />
                        <View style={styles.dataContainer}>
                          <Text type="CaviarDreams" style={styles.bussinesName}>
                            {item.nombreNegocio}{' '}
                            <Text type="CaviarDreams" style={styles.bussinesDetail}>
                              ({item.distancia}km)
                            </Text>
                          </Text>
                          <Text type="CaviarDreams" style={styles.bussinesDetail}>
                            {item.direccion}
                          </Text>
                          <Text type="CaviarDreams" style={styles.bussinesDetail}>
                            {item.telefonos}
                          </Text>
                          <View style={styles.raitingContainer}>
                            <StarRating
                              disabled={true}
                              maxStars={5}
                              rating={parseFloat(item.rating)}
                              fullStarColor={'gold'}
                              starSize={15}
                              starStyle={styles.start}
                            />
                            <Text type="CaviarDreams" style={styles.bussinesDetail}>
                              ({item.reviews})
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                  )}
                  keyExtractor={item => item.idNegocio.toString()}
                  onRefresh={this.handleRefresh}
                  refreshing={this.state.refreshing}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0.5}
              />
            </View>
            { isLoading &&
              <Loader visible={ isLoading } containerStyle={styles.loading} />
            } 
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
    searchContainer: {
      flex: 1.2,
      flexDirection: 'row',
      alignItems:'center',
      borderBottomWidth: 1,
      borderBottomColor: '#AAAAAA'
    },
    searchBarContainer: {
      flex: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      paddingHorizontal: 30
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
      height: hp('5%'),
      width: wp('55%'),
      justifyContent: 'center',
      backgroundColor: '#DFDEDE'
    },
    searchbarText: {
      textAlign: 'center',
    },
    searchButton: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchFilterImage: {
      resizeMode: "contain",
      height: hp('5%'),
      width: wp('7%')
    },
    filterContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems:'center',
      paddingHorizontal: 15,
      borderLeftWidth: 1,
      borderLeftColor: '#AAAAAA'
    },
    listContainer: {
      flex: 8.8,
      width: wp('100%'),
    },
    labelBussines: {
      flexDirection: 'row',
      alignItems: 'stretch',
      height: hp('10%'),
      width: wp('90%'),
      marginTop: 22,
      marginBottom: 22,
      paddingHorizontal: 23
    },
    bussinesImage: {
      flex: 0.4,
      resizeMode: 'contain',
      width: wp('30%'),
      height: hp('10%')
    },
    dataContainer: {
      flex: 0.6,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: 5
    },
    bussinesName: {
      fontSize: hp('1.7%'),
    },
    bussinesDetail: {
      fontSize: hp('1.3%'),
    },
    raitingContainer: {
      marginTop: 2,
      flexDirection: 'row',
      alignItems: 'center'
    },
    start: {
      paddingRight: 5
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
 * @const  {Integer} WAIT_INTERVAL
 */
const WAIT_INTERVAL = 1000;
