
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, Text, PermissionsAndroid } from 'react-native';
import { Header } from '../../components/Headers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { p } from '../../components/normalize';
import Images from '../../constants/Images';
import { SearchBar } from 'react-native-elements';
import MapView from 'react-native-maps';
import { MAPREGION } from '../../config/staticData'

export default class _Map extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      location: '',
      initialPosition: MAPREGION,
    };
  };

  handleSearch = (text) => {
    if (!text || text === '' || text === null) {
      clearTimeout(this.timer);
      this.setState({ search: text });
      this.timer = setTimeout(() => this.handleRefresh(), WAIT_INTERVAL);
      return
    }
    this.setState({ search: text });
  }

  handleLocation = (text) => {
    this.setState({ location: text });
  }

  onMapPress(e) {
    let { initialPosition } = this.state
    initialPosition = {
      ...initialPosition,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    }
    // this.map.animateToRegion(this.randomRegion(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude));
    this.setState({
      initialPosition
    })
    // alert(JSON.stringify(initialPosition))
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }
    return false;
}

  getLocation = async () => {
    // alert('hi')
    const hasLocationPermission = await this.hasLocationPermission();
    console.log( ' hasLocationPermission ~ ', hasLocationPermission)

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log( ' my location ~ ', position)
          this.setState({
            // position: {
            //   latitude: position.coords.latitude,
            //   longitude: position.coords.longitude,
            // },
            loading: false,
            initialPosition: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 1,
              longitudeDelta: 1
            },
          });
          console.log(position);
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
    });
  }

  next(){
    // this.props.navigation.state.params.update({
    //     latitiude: this.state.initialPosition.latitude,
    //     longitude: this.state.initialPosition.longitude
    // })
    // this.props.navigation.pop()
    myData = this.props.navigation.state.params.myData
    this.props.navigation.navigate('registerBussinesScreen7', { 
      myData: myData,
      myBusiness: [{
        bussinesName: myData.nombre,
        bussinesAddress: myData.dirección,
        categoryName: myData.categoria,
        image: myData.image,
        membership: 1
      }]
    })
  }

  render() {

    const { search, location, initialPosition } = this.state;

    return (
      <View style={styles.container}>
        <Header
          title={'Registrar'}
          right={(
            <TouchableOpacity
              style={styles.rightHeader}
              onPress={() => this.next()}
            >
              <Image source={Images.ok} style={styles.headerImg} />
            </TouchableOpacity>
          )}
          onBack={() => this.props.navigation.pop()}
        />
        <View style={styles.view}>
          <Text style={styles.h1}>Dirección</Text>
          <View style={styles.searchBarContainer}>
            <SearchBar
              lightTheme
              placeholder="Buscar"
              onChangeText={this.handleSearch}
              value={search}
              searchIcon={false}
              // onSubmitEditing={() => this._search()}
              inputContainerStyle={styles.searchbar}
              inputStyle={styles.searchbarText}
              containerStyle={styles.containerStyle}

            />
            <TouchableOpacity
              style={styles.searchButton}
              // onPress={() => this._search()}
              // onPress={this.getLocation}
            >
              <Image
                source={Images.search}
                fadeDuration={0}
                style={styles.searchFilterImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBarContainer}>
            <SearchBar
              lightTheme
              placeholder="Usar ubicación actual"
              onChangeText={this.handleLocation}
              value={location}
              searchIcon={false}
              // onSubmitEditing={() => this._search()}
              inputContainerStyle={styles.searchbar}
              inputStyle={styles.searchbarText}
              containerStyle={styles.containerStyle}

            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={this.getLocation}
            >
              <MaterialCommunityIcons name={'map-marker'} size={p(30)} color={'#111'} />
            </TouchableOpacity>
          </View>


        </View>

        <View style={{ flex: 1, backgroundColor: 'yellow' }}>
          <MapView
            provider="google"
            style={{ ...styles.map }}
            showsCompass={false}
            initialRegion={initialPosition}
            region={initialPosition}
            showsMyLocationButton={true}
            showsUserLocation={true}
            // cacheEnabled={true}
            loadingEnabled={true}
            loadingIndicatorColor="#111"
            loadingBackgroundColor="#eee"
            // mapType={"satellite"}
            onPress={(e) => this.onMapPress(e)}

          >
            {this.state.initialPosition.latitude && this.state.initialPosition.longitude &&
              <MapView.Marker
                coordinate={{ "latitude": this.state.initialPosition.latitude, "longitude": this.state.initialPosition.longitude }}
              >
                <Image source={Images.marker} style={{ width: p(40), height: p(40) }} />

              </MapView.Marker>}
          </MapView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    padding: p(22),
    justifyContent: 'flex-start',
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(15),
  },
  rightHeader: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderLeftColor: '#e3e4e5',
    borderLeftWidth: p(3),
    paddingLeft: p(20)
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
  },
  input: {
    height: hp('4%'),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(14),
    fontFamily: 'GeosansLight',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: p(12)
  },
  searchBarContainer: {
    marginHorizontal: p(22),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: p(300),
    padding: 0,
    borderRadius: 30,
  },
  filterContainer: {
    flex: 2,
    width: p(300),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#AAAAAA'
  },
  searchButton: {
    padding: 5,
    marginLeft: p(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFilterImage: {
    resizeMode: "contain",
    height: hp('5%'),
    width: wp('7%')
  },
  searchbar: {
    borderRadius: 30,
    height: hp('5%'),
    width: p(300),
    backgroundColor: '#DFDEDE'
  },
  searchbarText: {
    textAlign: 'center',
    fontFamily: 'GeosansLight',
    fontSize: p(16),
  },
  headerImg: {
    width: p(40),
    height: p(40)
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // height: p(240),
    marginBottom: 1,
    flex: 1
  },
})
