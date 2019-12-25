/**
 * @file Map.js
 * @description This file show the map screen.
 * @author Fernando Mondragón
 * @date 14 JUN 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Dimensions, Image, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView from 'react-native-maps';
import Text  from '../components/CustomText';

import Images from "../constants/Images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../components/HeaderLogo'

var { height } = Dimensions.get('window');
var box_count = 1;
var box_height = height / box_count;

/**
 * @description Export the map screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      navigation: this.props.navigation,
      search: '',
      isLoading: true, 
      markers: [],
    }
  }

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

  componentDidMount() {
    this.getBusinessMap();
  }

  handleSearch = (text) => {
    if (!text || text === '' || text === null){
      clearTimeout(this.timer);
      this.setState({ search: text });
      this.timer = setTimeout(() => this.getBusinessMap(), WAIT_INTERVAL);
      return 
    }
    this.setState({ search: text });
  }

  _search() { 
    this.handleRefresh();
  }

  getBusinessMap() {/*
    ApiClient.getBusinessMap()
    .then(data => {
        this.setState({
            isLoading: false,
            markers: data
        });
    })
    .catch(error => {
        console.log(error);
    });*/
  }

  goBussines(businessId) {
      //this.props.navigation.navigate('BusinessDetail', {businessId: businessId});
  }

  render() {
      const { isLoading } = this.state
      var search = this.state.search;
      return (
          <View style={styles.container}>
              <MapView
                style={styles.mapViewContainer}
                region={{
                  latitude: 22.7686399,
                  longitude: -102.5763196,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              >
                {!isLoading &&
                  this.state.markers.map((business) => {
                    const coords = {
                      latitude: parseFloat(business.location.lat),
                      longitude: parseFloat(business.location.lng)
                    };
                    return (
                      <MapView.Marker
                        image={Images.pin}
                        key={business.businessId}
                        coordinate={coords}
                        title={business.title}
                        onCalloutPress={() => this.goBussines(business.businessId)}
                      />
                    );
                  })
                }
              </MapView>
              <View style={styles.menuContainer}>
                <View style={ styles.searchContainer }>
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
                      style={styles.searchImage}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.menuButtonsContainer}>
                  <View style={styles.filtersContainer}>
                    <TouchableOpacity style={styles.filterSectionContainer} onPress={() => this.subcategoryFilter()}>
                      <Text type="GeosansLight" style={styles.textFilterContainer}>
                        Categoría
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.filtersContainer}>
                    <TouchableOpacity style={styles.filterSectionContainer} onPress={() => this.distanceFilter()}>
                      <Text type="GeosansLight" style={styles.textFilterContainer}>
                        Subcategoría
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.menuButtonsContainer}>
                  <View style={styles.filtersContainer}>
                    <TouchableOpacity style={styles.filterSectionContainer} onPress={() => this.subcategoryFilter()}>
                      <Text type="GeosansLight" style={styles.textFilterContainer}>
                        Distancia
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.filtersContainer}>
                    <TouchableOpacity style={styles.filterSectionContainer} onPress={() => this.distanceFilter()}>
                      <Text type="GeosansLight" style={styles.textFilterContainer}>
                        Calificación
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
  leftHeader: {
    paddingLeft: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 20,
  },
  imageBack: {
    resizeMode: "contain",
    height: hp('7%'),
    width: wp('7%')
  },
  logoImage: {
    width: Platform.OS === 'ios' ? wp('60%') : wp('70%'),
    height: Platform.OS === 'ios' ? hp('8%') : hp('9%')
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  mapViewContainer: { 
    flex: 0.65,
    alignSelf: 'stretch', 
    height: box_height 
  },
  menuContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer:{
    flex: 0.25,
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
    width: wp('80%'),
    justifyContent: 'center',
    backgroundColor: '#DFDEDE'
  },
  searchbarText: {
    textAlign: 'center',
  },
  searchButton: {
    padding: 6,
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchImage: {
    resizeMode: "contain",
    height: hp('5%'),
    width: wp('7.5%')
  },
  menuButtonsContainer: {
    flex: 0.375,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  filtersContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});

/**
 * @proyect QuickB
 * @const  {Integer} WAIT_INTERVAL
 */
const WAIT_INTERVAL = 1000;