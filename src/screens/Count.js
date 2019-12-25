/**
 * @file Count.js
 * @description This file show the profile editor screen.
 * @author Fernando Mondragón
 * @date 12 AUG 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, AsyncStorage } from 'react-native';
import Text  from '../components/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loader from '../components/Loader';
import Images from '../constants/Images';

/**
 * @description Export the count screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Count extends Component {

  constructor(props) {
    super(props)
    this.state = {
      idUser: '',
      navigation: this.props.navigation,
      isLoading: false,
      loading: true,
      imageProfile: '',
      name: '',
      lastname: '',
      mail: '',
      password: ''
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={styles.titleContainer} type="CaviarDreams">Cuenta</Text>
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
            source={{uri: imageProfile}}
            style={styles.imageProfile}
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
    this.getCount();
  };

  getData() {
    AsyncStorage.getItem('user').then((response) => {
      var user = JSON.parse(response);
      this.setState({ idUser: user.idUser })
    });
    AsyncStorage.getItem('social').then((response) => {
      var social = JSON.parse(response);
      this.setState({ social: social.social })
    });
  }

  getCount() {
    const { idUser } = this.state;
    const params = {
      i: idUser
    };
    fetch('http://192.168.43.230:19001/src/objects/Count.json').then(response => {
      return response.json();
    }).then(response => {
      this.setState({
          name: response.name,
          lastname: response.lastname,
          mail: response.mail
      });
    }).catch(error => {
      console.log("Error Reading data " + error);
    });
    return
    ApiClient.getFavoritesItems(params)
    .then(response => {
      this.setState({
        name: response.name,
        lastname: response.lastname,
        mail: response.mail
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

  searchAction() { 
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

  render() {
    var { loading } = this.state;
    if (!loading) {
      return (
        <View style={ styles.container }>
          <View style={ styles.listContainer }>
            
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
  imageProfile: {
    width: wp('8%'),
    height: hp('8%'),
    borderRadius: Platform.OS === 'ios' ? 50   : 100,
  },
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  listContainer: {
    flex: 0.96
  }
});