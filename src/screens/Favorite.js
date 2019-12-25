/**
 * @file Favorite.js
 * @description This file show the favorite screen.
 * @author Fernando Mondragón
 * @date 17 MAY 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, AsyncStorage, FlatList, ImageBackground, Alert, ScrollView } from 'react-native';
import Text  from '../components/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loader from '../components/Loader';
import Images from '../constants/Images';
import { AccordionList } from 'accordion-collapse-react-native';
import { SearchBar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const data = [{
  "idCategory": "CAT_G4S",
  "nameCategory": "Deportes",
  "imagen": "https://admin.quickb.mx/AppDelivery/Imagenes/CAT_G4S/M5K04Z5B87.png",
  "list": [{
      "idCategory": "CAT_G4S",
      "idNegocio": "4631894",
      "nombreNegocio": "SANTINO RESTAURANTE BAR",
      "distancia": "6.58",
      "direccion": "AVENIDA UNIVERSIDAD 201B INT LOMAS DEL PTROCINIO",
      "telefonos": "4924913300",
      "logo": "http://3.bp.blogspot.com/-Or24w3s6KXE/UmMkLjxV5hI/AAAAAAABHo8/b2jYEwPDQrI/s1600/wallpaper-28484.jpg",
      "rating": 0,
      "reviews": 0
  },{
      "idCategory": "CAT_G4S",
      "idNegocio": "4435334",
      "nombreNegocio": "FELIPE RESTAURANTE BAR",
      "distancia": "6.58",
      "direccion": "AVENIDA UNIVERSIDAD 201B INT LOMAS DEL PTROCINIO",
      "telefonos": "4924913300",
      "logo": "http://3.bp.blogspot.com/-Or24w3s6KXE/UmMkLjxV5hI/AAAAAAABHo8/b2jYEwPDQrI/s1600/wallpaper-28484.jpg",
      "rating": 0,
      "reviews": 0
  }]
},{
  "idCategory": "CAT_EBT",
  "nameCategory": "Restaurantes",
  "imagen": "https://admin.quickb.mx/AppDelivery/Imagenes/CAT_W9O/H38KGMBE48.png",
  "list": [{
      "idCategory": "CAT_EBT",
      "idNegocio": "4631894",
      "nombreNegocio": "SANTINO RESTAURANTE BAR",
      "distancia": "6.58",
      "direccion": "AVENIDA UNIVERSIDAD 201B INT LOMAS DEL PTROCINIO",
      "telefonos": "4924913300",
      "logo": "http://3.bp.blogspot.com/-Or24w3s6KXE/UmMkLjxV5hI/AAAAAAABHo8/b2jYEwPDQrI/s1600/wallpaper-28484.jpg",
      "rating": 0,
      "reviews": 0
  }]
}];

/**
 * @description Export the favorite screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Favorite extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idUser: '',
      navigation: this.props.navigation,
      latitude: null,
      longitude: null,
      loading: true,
      isLoading: false,
      search: '',
      isSearching: false,
      dataSource: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={styles.titleContainer} type="CaviarDreams">Favoritos</Text>
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
      headerRight: (
        <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.pop()}>
          <Image
            source={ Images.filter }
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
  
  componentDidMount() {
    this.getData();
  };

  getData() {
    AsyncStorage.getItem('user').then((response) => {
      var user = JSON.parse(response);
      this.setState({ idUser: user.idUser })
    });
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, () => this.getFavorites()),
      (error) => [
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error,
          [{
            text: 'OK'
          }],
        )
      ]
    )
  }

  getFavorites() {
    this.setState({
      isLoading: false,
      dataSource: data,
      loading: false
    });
    /*
    const { idUser, dataSource, latitude, longitude, search } = this.state;
    const params = {
      i: idUser,
      latUsuario: latitude,
      lonUsuario: longitude,
      s: search
    };
    ApiClient.getFavoritesItems(params)
    .then(response => {
      this.setState({
        isLoading: false,
        loading: false,
        dataSource: response
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
                loading: false
              }) 
            ]  
          }],
        ); 
    });
    */
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

  searchAction() { 
    this.handleRefresh();
  }

  handleRefresh = () => {
    clearTimeout(this.timer);
    this.setState({
      dataSource: [],
      loading: false
    });
    this.timer = setTimeout(() => this.getData(), WAIT_INTERVAL); 
  };

  continueAction(idNegocio) {
    return console.log('LLege');
  }

  _head(item) {
    var categoryColor;
    switch (item.idCategory) {
      case 'CAT_G4S':
        categoryColor = '#577D68';
        break;
      case 'CAT_EBT':
        categoryColor = '#FFEA2E';
        break;
      case 'CAT_RMF':
        categoryColor = '#D60B7B';
        break;
      case 'CAT_RK1':
        categoryColor = '#D12E28';
        break;
      case 'CAT_W9O':
        categoryColor = '#DE6225';
        break;
      case 'CAT_05M':
        categoryColor = '#009EDC';
        break;
      case 'CAT_3WB':
        categoryColor = '#A12D86';
        break;
      case 'CAT_SRO':
        categoryColor = '#D61F50';
        break;
      case 'CAT_Y4G':
        categoryColor = '#A7C349'
        break;
      default:
        categoryColor = 'nada';
    }
    return (
      <View style={styles.generalListContainer}>
        <View  style={[styles.categoryContainer, {backgroundColor: categoryColor}]}>
          <Image
            source={{uri: item.imagen}}
            fadeDuration={0}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText} type="CaviarDreams">{item.nameCategory}</Text>
        </View>
      </View>
    );
  }

  _body(item) {
    var categoryColor;
    switch (item.idCategory) {
      case 'CAT_G4S':
        categoryColor = '#577D68';
        break;
      case 'CAT_EBT':
        categoryColor = '#FFEA2E';
        break;
      case 'CAT_RMF':
        categoryColor = '#D60B7B';
        break;
      case 'CAT_RK1':
        categoryColor = '#D12E28';
        break;
      case 'CAT_W9O':
        categoryColor = '#DE6225';
        break;
      case 'CAT_05M':
        categoryColor = '#009EDC';
        break;
      case 'CAT_3WB':
        categoryColor = '#A12D86';
        break;
      case 'CAT_SRO':
        categoryColor = '#D61F50';
        break;
      case 'CAT_Y4G':
        categoryColor = '#A7C349'
        break;
      default:
        categoryColor = null;
    }
    return (
      <View style={styles.bussinesContainer}>
        <FlatList
          data={item.list}
          renderItem={({item}) => (
            <View style={styles.bussinesIndependientContainer}>
              <TouchableOpacity style={[styles.labelBussines, {borderTopColor: categoryColor}]} onPress={() => this.continueAction(item.idNegocio)}>
                <View style = {styles.imageBussines}>
                  <ImageBackground style={styles.bussinesImage} source = {{ uri: item.logo }} />
                </View>
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
              <TouchableOpacity  style={styles.iconContainer}>
                <Image
                  source={Images.share}
                  fadeDuration={0}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity  style={styles.iconContainer}>
                <Image
                  source={Images.trash}
                  fadeDuration={0}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.idNegocio.toString()}
        />
      </View>
    );
  }

  render() {
    var { search, dataSource, loading, expanded } = this.state;
    console.log(expanded);
    if (!loading) {
      return (
        <View style={styles.container}>
          <View style={ styles.searchContainer }>
            <SearchBar
              lightTheme
              placeholder="Buscar"
              onChangeText={ this.handleSearch }
              value={ search }
              searchIcon={false}
              onSubmitEditing={() => this.searchAction()}
              containerStyle = {styles.searchbarContainer}
              inputContainerStyle = {styles.searchbar}
              inputStyle = {styles.searchbarText}
            />
            <TouchableOpacity style={styles.searchButton} onPress={() => this.searchAction()}>
              <Image
                source={Images.search}
                fadeDuration={0}
                style={styles.searchImage}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.listContainer}
            contentContainerStyle={styles.scrollview}
            scrollEnabled={true}
          >
            <AccordionList
              list={dataSource}
              header={this._head}
              body={this._body}
            />
          </ScrollView>
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
  leftHeader: {
    padding: 20
  },
  rightHeader: {
    padding: 30
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
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  searchContainer:{
    flex: 0.04,
    padding: 20,
    alignItems: 'flex-start',
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
    width: wp('75%'),
    justifyContent: 'center',
    backgroundColor: '#DFDEDE'
  },
  searchbarText: {
    textAlign: 'center',
  },
  searchButton: {
    padding: 6,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchImage: {
    resizeMode: "contain",
    height: hp('5%'),
    width: wp('7.5%')
  },
  generalListContainer: {
    alignItems: 'center',
    width: wp('100%')
  },
  listContainer: {
    flex: 0.96,
    paddingVertical: 20,
    width: '100%'
  },
  categoryImage: {
    resizeMode: "contain",
    height: hp('10%'),
    width: wp('15%')
  },
  categoryText: {
    paddingLeft: 30,
    color: '#fff',
    fontSize: hp('5%')
  },
  bussinesContainer: {
    alignItems: 'flex-start',
    width: wp('100%'),
    paddingHorizontal: 40
  },
  imageBussines: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bussinesImage: {
    resizeMode: 'contain',
    width: wp('15%'),
    height: hp('8%')
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
  categoryContainer: {
    width: wp('85%'),
    height: hp('12%'),
    marginVertical: 5,
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
  },
  labelBussines: {
    padding: 5,
    borderRadius: 15,
    borderTopWidth: 3,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: hp('10%'),
    width: wp('60%'),
    marginTop: 22,
    marginBottom: 22
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    resizeMode: 'contain',
    marginHorizontal: 6,
    width: wp('6%'),
    height: hp('6%')
  },
  bussinesIndependientContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});

/**
 * @proyect QuickB
 * @const  {Integer} WAIT_INTERVAL
 */
const WAIT_INTERVAL = 1000;