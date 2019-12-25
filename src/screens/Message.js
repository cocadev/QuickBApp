/**
 * @file Message.js
 * @description This file show the message screen.
 * @author Fernando Mondragón
 * @date 14 MAY 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, AsyncStorage, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import { ApiClient } from '../components/Api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Text  from '../components/CustomText';
import Images from '../constants/Images';
import Loader from '../components/Loader';

/**
 * @description Export the message screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Message extends Component {
  constructor(props) {
    super(props);
    const idNegocio = this.props.navigation.getParam('idNegocio', '');
    const tipoIngreso = parseInt(this.props.navigation.getParam('tipoIngreso', ''));
    this.state = {
      navigation: this.props.navigation,
      tipoIngreso: tipoIngreso,
      idNegocio: idNegocio,
      idUsuario: '',
      loading: true,
      emisor: 0,
      message: '',
      messages: [],
      isLoading: false,
      page: 1,
      isLastPage: false
    };
  };

  static navigationOptions = ({ navigation }) => {
    const colorBar = navigation.getParam('colorBar', '');
    return {
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
        borderBottomColor: colorBar,
        elevation: 0,
        shadowOpacity: 0,
        height: hp('20%'),
      },
    } 
  };

  componentDidMount(){
    this._getUserInfo();
    this.getData();
  }

  _getUserInfo = async () => {
    AsyncStorage.getItem('user')
    .then((value) => {
      const data = JSON.parse(value);
      this.setState({ idUsuario: data.idUser });
    });
  }

  getData() {
    var {idUsuario, idNegocio, page} = this.state;
    const params = {
      iu: idUsuario,
      ib: idNegocio,
      p: page
    };
    ApiClient.getMessages(params)
    .then(response => {
      return console.log(response);
      var isLastPage = false, 
          pageNumber = response.length / 10,
          pageConstant = Math.ceil(pageNumber);

      page < pageConstant ? isLastPage = true : isLastPage = false;
      this.setState({
        messages: response,
        loading: false,
        isLoading: false,
        isLastPage: isLastPage
      })
    })
    .catch(error => {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error ,
        [{
          text: 'OK',
          onPress: [
            this.setState({
              messages: [],
              loading: false,
              isLoading: false
            }) 
          ]  
        }],
      ); 
    });
  }

  handleLoadMore = () => {
    this.setState({ isLoading: true });
    if (!this.state.isLastPage) {
      this.setState({ isLoading: false });
      return;
    }
    this.setState({
          page: this.state.page + 1,
      }, () => {
        this.getData()
      }
    );
  };

  _justifyContent(valueMessage) {
    var {tipoIngreso} = this.state;
    var emisor = parseInt(valueMessage);
    var left = {justifyContent: 'center', alignItems: 'flex-start', marginVertical: 5};
    var right = {justifyContent: 'center', alignItems: 'flex-end', marginVertical: 5};
    if (tipoIngreso === 1) {
      if (emisor === 1){
        return right;
      } else if (emisor === 2){
        return left;
      } else {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + ERROR1 ,
          [{
            text: 'OK'  
          }]
        ); 
      }
    } else if (tipoIngreso === 2) {
      if (emisor === 1){
        return left;
      } else if (emisor === 2){ 
        return right;
      } else {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + ERROR1 ,
          [{
            text: 'OK'  
          }]
        ); 
      }
    } else {
      Alert.alert(
        'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + ERROR1 ,
        [{
          text: 'OK'  
        }]
      ); 
    }
  }

  sendMessageAction () {
    var {idUsuario, idNegocio, message, tipoIngreso} = this.state;
    const params = {
      iu: idUsuario,
      ib: idNegocio,
      e: tipoIngreso,
      m: message
    };
    ApiClient.postMessages(params)
    .then(response => {
      response = response[0]
      if (response.mensaje === 'success') {
        this.messageInput.clear();
        this.setState({message:'', messages: [], isLoading: true});
        this.getData();
      } else {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + response.mensaje ,
          [{
            text: 'OK'  
          }]
        );
      }
    });
  }

  render() {
    var {loading, messages, isLoading} = this.state;
    if (!loading) {
      return (
        <View style={styles.container}>
          <View style={styles.messageContainer}>
            <FlatList
              data={messages}
              renderItem={({item}) => (
                <View style={this._justifyContent(item.emisor)}>
                  <View style={styles.messageContent}>
                    <Text type="GeosansLight" style={styles.textMessage}>
                      {item.mensaje}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.idMensaje.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              inverted={true}
            />
          </View>
          <KeyboardAvoidingView behavior="padding" style={styles.editBar} enabled>
            <TextInput
              ref={(input) => this.messageInput = input}
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="go"
              onSubmitEditing={() => this.sendMessageAction()} 
              style={styles.input}
              onChangeText={value => this.setState({message: value.trim()})}
            />
            <TouchableOpacity style={styles.sendMessageButton} onPress={() => this.sendMessageAction()}>
              <Image
                source={Images.messageSend}
                fadeDuration={0}
                style={styles.sendMessageImage}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
          { isLoading &&
            <Loader visible={ isLoading } containerStyle={styles.loading} />
          } 
        </View> 
      );
    } else {
      return (
        <View style={[styles.container, styles.loaderContainer]}>
          <Loader visible={ loading }/>
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
  imageBack: {
    resizeMode: "contain",
    height: hp('7%'),
    width: wp('7%')
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  messageContainer: {
    flex: 0.85,
    padding: 30
  },
  messageContent: {
    width: wp('45%'),
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    borderRadius: 20
  },
  editBar: {
    flex: 0.15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMessage: {
    fontSize: hp('3%')
  },
  input: {
    height: hp('4%'),
    width: wp('80%'),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    color: 'rgba(44, 62, 80,0.9)',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  sendMessageButton: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendMessageImage: {
    resizeMode: "contain",
    height: hp('5%'),
    width: wp('7.5%')
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
 * @const  {Sting} ERROR1
 */
const ERROR1 = 'Error en la validación del diseño.'
