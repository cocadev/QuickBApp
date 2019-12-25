/**
 * @file BussinesListFilter.js
 * @description This file show all the bussines of the selected category with filters.
 * @author Fernando Mondragón
 * @date 12 AGU 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Alert, FlatList, ImageBackground, Image, AsyncStorage } from 'react-native';
import Text  from '../components/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiClient } from '../components/Api';
import StarRating from 'react-native-star-rating';
import Loader from '../components/Loader';
import Images from '../constants/Images';

/**
 * @description Export the BussinesListFilter screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class BussinesListFilter extends Component {
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
        filterDistance: 1,
        dataSource: [],
        page: 1,
        isLastPage: false,
        refreshing: false
      };
  };

  static navigationOptions = ({ navigation }) => {
    var {state} = navigation;
    return {
        headerTitle: (
            <Text style={styles.titleContainer} type="GeosansLight">Filtros</Text>
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
            <TouchableOpacity style={styles.rightHeader} onPress={state.params.filterAction}>
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
      await AsyncStorage.removeItem('distanciaFilter');
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

  componentDidMount() {
    this.cleanData();
    this.state.navigation.setParams({ filterAction: this.filterAction})
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

  filterAction = async () => {
    var subcategoriasFilter = await AsyncStorage.getItem('subcategoriasFilter');
    var distanciaFilter = await AsyncStorage.getItem('distanciaFilter');
    clearTimeout(this.timer);
    this.setState({ filterSubcategory: subcategoriasFilter === null ? [] : subcategoriasFilter,
                    filterDistance: distanciaFilter === null ? 1 : distanciaFilter 
                  });
    this.timer = setTimeout(() => this.handleRefresh(), WAIT_INTERVAL);
  }

  async cleanData () {
    await AsyncStorage.removeItem('subcategoriasFilter');
    await AsyncStorage.removeItem('distanciaFilter');
  }

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

  subcategoryFilter() {
    var { idCategoria } = this.state;
    this.state.navigation.navigate('SubcategoryFilter', { idCategoria: idCategoria });
  }

  distanceFilter() {
    this.state.navigation.navigate('DistanceFilter');
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
    var { dataSource, loading, isLoading } = this.state;
    if (!loading) {
      return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
              <View style={styles.filtersContainer}>
                <TouchableOpacity style={styles.filterSectionContainer} onPress={() => this.subcategoryFilter()}>
                  <Text type="GeosansLight" style={styles.textFilterContainer}>
                    Subcategoría
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filtersContainer}>
                <TouchableOpacity style={styles.filterSectionContainer} onPress={() => this.distanceFilter()}>
                  <Text type="GeosansLight" style={styles.textFilterContainer}>
                    Distancia
                  </Text>
                </TouchableOpacity>
              </View>
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
    filterContainer: {
      flex: 1.2,
      flexDirection: 'row',
      alignItems:'center',
      borderBottomWidth: 1,
      borderBottomColor: '#AAAAAA'
    },
    filtersContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftWidth: 0.5,
      borderLeftColor: '#AAAAAA',
      borderRightWidth: 0.5,
      borderRightColor: '#AAAAAA'
    },
    filterSectionContainer: {
      width: wp('35%'),
      height: hp('4%'),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(236, 240, 241,0.6)',
      borderRadius: 20,
    },
    textFilterContainer: {
      fontSize: Platform.OS === 'ios' ? hp('3%') : hp('4%'),
      textAlign: 'center',
      color: 'black'
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
