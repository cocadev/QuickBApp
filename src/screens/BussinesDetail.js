/**
 * @file BussinesDetail.js
 * @description This file show all the detail of a selected bussines.
 * @author Fernando Mondragón
 * @date 29 JUN 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Alert, FlatList, ImageBackground, ScrollView, Image, WebView, Linking, Share, AsyncStorage } from 'react-native';
import Text  from '../components/CustomText';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiClient } from '../components/Api';
import StarRating from 'react-native-star-rating';
import Loader from '../components/Loader';
import Images from '../constants/Images';

/**
 * @description Export the BussinesDetail screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class BussinesDetail extends Component {
  constructor(props) {
    super(props);
    const idNegocio = this.props.navigation.getParam('idNegocio', '');
    const nombreCategoria = this.props.navigation.getParam('nombreCategoria', '');
    const colorCategoria = this.props.navigation.getParam('colorCategoria', '');
    this.state = {
      navigation: this.props.navigation,
      idNegocio: idNegocio,
      idUsuario: '',
      nombreCategoria: nombreCategoria,
      colorCategoria: colorCategoria,
      like: 0,
      latitude: null, 
      longitude: null,
      loading: true,
      activeSlide: 0,
      carouselImages: [],
      bussinesLogo: '',
      bussinesName: '',
      distance: '',
      direction: '',
      bussinesPhone: '',
      apertureHour: '',
      closeHour: '',
      priceRange: '',
      raiting: '',
      raitingCount: '',
      description: '',
      services: [],
      reviews: [],
      enableScrollViewScroll: true
    };
  };

  onEnableScroll = ( value ) => {
    this.setState({ enableScrollViewScroll: value });
  }; 

  static navigationOptions = () => ({
    header: null
  });

  componentDidMount() {
    
    this._getUserInfo();
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, () => this.getData()),
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

  _getUserInfo = async () => {
    AsyncStorage.getItem('user')
    .then((value) => {
      const data = JSON.parse(value);
      clearTimeout(this.timer);
      this.setState({ idUsuario: data.idUser });
      this.timer = setTimeout(() => this._getLikeInfo(), WAIT_INTERVAL); 
    });
  }

  _getLikeInfo() {
    var {idNegocio, idUsuario} = this.state;
    const params = {
      iu: idUsuario,
      ib: idNegocio
    };
    ApiClient.getLikeBussines(params)
    .then(response => {
      response = response[0]
      var newLike = parseInt(response.estatus);
      this.setState({like: newLike})
    })
    .catch(error => {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error ,
        [{
          text: 'OK',
          onPress: [
            this.setState({
              like: 0
            }) 
          ]  
        }],
      ); 
    });
  }
  
  getData() {
    const { idNegocio, latitude, longitude } = this.state;
    const params = {
      lat: latitude,
      lon: longitude,
      n: idNegocio,
    };
    ApiClient.getBusinessDetail(params)
    .then(response => {
      var response = response[0];
      var services;
      if (response.services === null || Object.entries(response.services).length === 0 || response.services === ''){
        services = 'SIN SERVICIOS REGISTRADOS'
      } else {
        for (cont = 1; cont < response.services.length; cont ++){
          if (cont === response.services.length) {
            services += response.services[cont].toString;
          } else if(cont === response.services.length - 1){
            services += response.services[cont].toString + ' y ';
          } else {
            services += response.services[cont].toString + ', ';
          }
        }
      }
      this.setState({
        carouselImages: response.carouselImages,
        bussinesLogo: response.bussinesLogo,
        bussinesName: response.bussinesName,
        distance: response.distance,
        direction: response.direction,
        bussinesPhone: response.bussinesPhone,
        hour: response.Hour,
        priceRange: response.priceRange,
        raiting: response.raiting,
        ratingCount: response.ratingCount,
        description: response.description,
        services: services,
        reviews: response.reviews,
        loading: false
      });
    })
    .catch(error => {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error ,
        [{
          text: 'OK',
          onPress: [
            this.setState({
              like: 0,
              carouselImages: [],
              bussinesLogo: '',
              bussinesName: '',
              distance: '',
              direction: '',
              bussinesPhone: '',
              apertureHour: '',
              closeHour: '',
              priceRange: '',
              rating: '',
              ratingCount: '',
              description: '',
              services: '',
              reviews: []
            }) 
          ]  
        }],
      ); 
    });
  }

  _renderItem({item}){
    return (
      <View style={styles.carouselImagesView}>
        <ImageBackground style={ styles.carouselImage } source = {{ uri: item.image }} />                 
      </View>
    )
  }

  get pagination() {
    var { carouselImages, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={carouselImages.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationCarouselContainer}
          dotStyle={styles.pointsPagiation}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }

  get _description() {
    var { description } = this.state;
    if (Platform.OS === 'ios'){
      return (
        <Text type="GeosansLight" style={styles.serviceDescriptionText}>
          {description}
        </Text> 
      );
    } else {
      return (
        <WebView 
          source={{
            html:
              "<style>p{}text-align:justify</style>" +
              "<p>" +
                description +
              "</p>"
          }}
        />
      );
    }
  }

  routeAction() {
    var {latitude, longitude} = this.state;
    const googleMapsURL = 'http://maps.google.com/?daddr='
    const mapsURL = 'http://maps.apple.com/?daddr='
    Linking.canOpenURL(googleMapsURL).then(supported => {
        if (supported) {
            Linking.openURL(googleMapsURL + latitude + ',' + longitude);
        } else {
            if (Platform.OS == 'ios') {
                Linking.openURL(mapsURL + latitude + ',' + longitude);
            }
        }
    }).catch(err => 
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + err ,
        [{
          text: 'OK'
        }],
      )
    );
  }

  shareAction() {
    Share.share({
        message: "Visista este increible portal, para administrar tu negocio..!! http://quickb.mx/",
        url: 'http://quickb.mx/',
        title: 'QuickB',
        dialogTitle: 'QuickB',
    }, {
        dialogTitle: 'QuickB',
    })
  }

  likeAction() {
    var {like, idNegocio, idUsuario} = this.state;
    var newLike;
    like === 0 ? newLike = 1 : newLike = 0
    const params = {
      iu: idUsuario,
      ib: idNegocio,
      i: newLike,
    };
    ApiClient.postLikeBussines(params)
    .then(response => {
      var response = response[0];
      if (response.mensaje === 'success') {
        this.setState({like: newLike})
      } else {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + response.mensaje ,
          [{
            text: 'OK',
            onPress: [
              this.setState({
                like: 0
              }) 
            ]  
          }],
        ); 
      }
    })
    .catch(error => {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error ,
        [{
          text: 'OK',
          onPress: [
            this.setState({
              like: 0
            }) 
          ]  
        }],
      ); 
    });
  }

  messageAction() {
    const {idNegocio} = this.state;
    const colorBar = 'rgba(241, 196, 15,1.0)';
    const tipoIngreso = 1;
    this.state.navigation.navigate('MessageSc', { idNegocio: idNegocio, colorBar: colorBar, tipoIngreso: tipoIngreso })
  }

  addComentarie() {
    const { idNegocio } = this.state;
    this.state.navigation.navigate('Comentaries', { idNegocio: idNegocio })
  }

  render() {
    var { 
      like,
      loading, 
      carouselImages, 
      nombreCategoria, 
      colorCategoria, 
      bussinesLogo, 
      bussinesName, 
      distance, 
      direction, 
      bussinesPhone, 
      hour, 
      priceRange, 
      rating, 
      ratingCount,
      description,
      services,
      reviews,
      enableScrollViewScroll
    } = this.state;
    var reviewLong = reviews.length;
    var reviewHeight = 0;
    if (reviewLong < 5) {
      reviewHeight = hp('16.25%') * reviewLong;
    } else {
      reviewHeight = hp('65%')
    }
    if (!loading) {
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={enableScrollViewScroll}
        >
          <View style={styles.headerContainer}>
            <Carousel
              data={carouselImages}
              sliderWidth={wp('100%')}
              itemWidth={wp('100%')}
              separatorWidth={0}
              pagingEnable={true}
              renderItem={this._renderItem}
              keyExtractor={item => item.numImage.toString()}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            { this.pagination }
            <TouchableOpacity style={styles.leftHeader} onPress={() => this.state.navigation.pop()}>
              <Image
                source={ Images.left }
                fadeDuration={0}
                style={styles.imageBack}
              />  
            </TouchableOpacity>
            <View style={[{backgroundColor: colorCategoria}, styles.tabBarHeaderView]}>
              <Text 
                type="GeosansLight"
                style={styles.categoryTitle}
              >
                { nombreCategoria }
              </Text>
            </View>
            <Image
              source={{uri: bussinesLogo}}
              style={styles.bussinesLogoImage}
            />
          </View>
          <View style={styles.dataContainer}>
            <Text 
              type="GeosansLight"
              style={styles.bussinesName}
            >
              { bussinesName }{' '}
              <Text 
                type="GeosansLight"
                style={styles.bussinesInformation}
              >
                {'('}{ distance }{'kms)'}
              </Text>
            </Text>
            <Text 
              type="GeosansLight"
              style={styles.bussinesInformation}
            >
              {'Dirección: '}{ direction }
            </Text>
            <Text 
              type="GeosansLight"
              style={styles.bussinesInformation}
            >
              {'Teléfono: '}{ bussinesPhone }
            </Text>
            <Text 
              type="GeosansLight"
              style={styles.bussinesInformation}
            >
              {'Horarios: '}{ hour }
            </Text>
            <Text 
              type="GeosansLight"
              style={styles.bussinesInformation}
            >
              {'Rango de Precios: '}{ priceRange }
            </Text>
            <View style={styles.calification}>
              <Text 
                type="GeosansLight"
                style={styles.bussinesInformation}
              >
                {'Calificación: '}
              </Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={parseFloat(rating)}
                fullStarColor={'gold'}
                starSize={15}
                starStyle={styles.start}
              />
              <Text type="GeosansLight" style={styles.bussinesInformation}>
                {'('}{ratingCount}{')'}
              </Text>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionImageTextContainer} onPress={() => this.routeAction()}>
              <Image
                source={ Images.route }
                fadeDuration={0}
                style={styles.imageAction}
              />
              <Text type="GeosansLight" style={styles.textAction}>
                Trazar Ruta
              </Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionImageTextContainer} onPress={() => this.likeAction()}>
              <Image
                source={ like === 0 ? Images.favoriteUnselected : Images.favorite }
                fadeDuration={0}
                style={styles.imageAction}
              />
              <Text type="GeosansLight" style={styles.textAction}>
                Favorito
              </Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionImageTextContainer} onPress={() => this.shareAction()}>
              <Image
                source={ Images.share }
                fadeDuration={0}
                style={styles.imageAction}
              />
              <Text type="GeosansLight" style={styles.textAction}>
                Compartir
              </Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionImageTextContainer} onPress={() => this.messageAction()}>
              <Image
                source={ Images.message }
                fadeDuration={0}
                style={styles.imageAction}
              />
              <Text type="GeosansLight" style={styles.textAction}>
                Contactar
              </Text>  
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <Text type="Caviar_Dreams_Bold" style={styles.subTitleText}>
                Descripción:
            </Text>
            <Text type="GeosansLight" style={styles.serviceDescriptionText}>
              {description}
            
            </Text>
            <Text type="Caviar_Dreams_Bold" style={styles.subTitleText}>
              Servicios: 
            </Text>
            <Text type="GeosansLight" style={styles.serviceDescriptionText}>
              {services}
            </Text>
            <Text type="Caviar_Dreams_Bold" style={styles.subTitleText}>
                Comentarios:
            </Text>
          </View>
          <View style={[styles.comentariesContainer, {height: reviewHeight}]}>
            <FlatList
              data={reviews}
              renderItem={({item}) => (
                  <View style={styles.labelComentarie}>
                    <Image
                      source={{uri: item.imagen}}
                      style={styles.profileImage}
                    />
                    <View style={styles.dataProfile}>
                      <Text type="GeosansLight" style={styles.nameProfile}>
                        {item.name + ' ' + item.lastname}
                      </Text>
                      <Text type="GeosansLight" style={styles.comentarieProfile}>
                        {item.Comentario}
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
                        <Text type="CaviarDreams" style={styles.raitingNumber}>
                          ({item.rating})
                        </Text>
                      </View>
                    </View>
                  </View>
              )}
              keyExtractor={item => item.idReview.toString()}
              onTouchStart={() => {
                this.onEnableScroll(false);
              }}
              onMomentumScrollEnd={() => {
                this.onEnableScroll(true);
              }}
            />
          </View>
          <TouchableOpacity style={styles.endDetail} onPress={() => this.addComentarie()}>
            <Text type="Caviar_Dreams_Bold" style={styles.comentarieAddText}>
                Comentario
            </Text>
            <View style={styles.imageMoreLessContainer}>
              <Image
                source={ Images.more }
                fadeDuration={0}
                style={styles.imageBack}
              /> 
            </View> 
          </TouchableOpacity>
        </ScrollView>
      );
    } else {
      return (
        <View style={[styles.container, styles.containerLoader]}>
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
  containerLoader: {
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  headerContainer:{
    height: hp('50%')
  },
  leftHeader: {
    alignContent: 'center',
    justifyContent: 'center',
    position:'absolute',
    paddingHorizontal: '10%',
    left: 0, 
    right: '80%', 
    top: 0, 
    bottom: '65%'
  },
  imageBack: {
    resizeMode: "contain",
    height: hp('7%'),
    width: wp('7%')
  },
  carouselImagesView: {
    justifyContent:'center',
    alignItems:'center'
  },
  carouselImage: {
    resizeMode: 'contain',
    width: wp('100%'),
    height: hp('44%')
  },
  paginationCarouselContainer: {
    position:'absolute',
    left: '65%', 
    right: 0, 
    top: '65%', 
    bottom: 0
  },
  pointsPagiation: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.92)'
  },
  tabBarHeaderView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('6%')
  },
  categoryTitle: {
    paddingHorizontal: wp('2%'),
    color: '#fff',
    fontSize: hp('5%')
  },
  bussinesLogoImage: {
    width: 100,
    height: 100,
    borderRadius: Platform.OS === 'ios' ? 50   : 100,
    position:'absolute',
    left: 0, 
    right: 0, 
    top: '71.5%', 
    bottom: 0
  },
  dataContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    flexDirection: 'column'
  },
  bussinesName: {
    color: 'black',
    fontSize: hp('4%')
  },
  bussinesInformation: {
    color: 'black',
    fontSize: hp('3%'),
    paddingVertical: 5
  },
  calification: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  start: {
    paddingHorizontal: 5
  },
  actionContainer: {
    width: wp('100%'),
    height: hp('17%'),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA'
  },
  actionImageTextContainer: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageAction: {
    resizeMode: 'contain',
    width: wp('6%'),
    height: hp('6%')
  },
  textAction: {
    color: 'black',
    fontSize: hp('2%')
  },
  descriptionContainer:{
    paddingHorizontal: 30
  },
  subTitleText: {
    color: 'black',
    fontSize: hp('4.5%'),
    paddingTop: 30
  },
  serviceDescriptionText: {
    color: 'black',
    fontSize: hp('3%'),
    textAlign: 'justify'
  },
  comentariesContainer: {
    padding: 10,
  },
  labelComentarie:{
    height: hp('15%'),
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: '#AAAAAA',
    borderBottomColor: '#AAAAAA',
    borderLeftColor: '#AAAAAA',
    borderRightColor: '#AAAAAA',
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 2
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: Platform.OS === 'ios' ? 25   : 100
  },
  dataProfile: {
    paddingHorizontal: 5
  },
  nameProfile: {
    color: 'black',
    fontSize: hp('3%')
  },
  comentarieProfile: {
    color: 'black',
    fontSize: hp('2%')
  },
  start: {
    paddingRight: 5
  },
  raitingNumber: {
    color: 'black',
    fontSize: hp('1%')
  },
  raitingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  endDetail: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: '#AAAAAA',
    borderBottomColor: '#AAAAAA',
    borderLeftColor: '#AAAAAA',
    borderRightColor: '#AAAAAA',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  comentarieAddText: {
    paddingRight: 80,
    color: 'black',
    fontSize: hp('4.5%')
  },
  imageMoreLessContainer:{
    paddingRight: 15
  },
  iconsMoreLess: {
    resizeMode: "contain",
    height: hp('4%'),
    width: wp('4%')
  }
});

/**
 * @proyect QuickB
 * @const  {Integer} WAIT_INTERVAL
 */
const WAIT_INTERVAL = 1000;