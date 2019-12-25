/**
 * @file Comentaries.js
 * @description This file show comentaries screen than we can use for for do some comentarie about a bussines.
 * @author Fernando Mondragón
 * @date 19 AGU 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, TextInput, AsyncStorage, Alert } from 'react-native';
import Text  from '../components/CustomText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Images from '../constants/Images';
import Loader from '../components/Loader';
import StarRating from 'react-native-star-rating';
import { ApiClient } from '../components/Api';

/**
 * @description Export the Comentaries screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class Comentaries extends Component {
  constructor(props) {
    super(props);
    const idNegocio = this.props.navigation.getParam('idNegocio', '');
    this.state = {
      navigation: this.props.navigation,
      idNegocio: idNegocio,
      idUsuario: '',
      rating: 1,
      title: '',
      comentarie: '',
      isLoading: false
    };
  };

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: (
            <Text style={styles.titleContainer} type="GeosansLight">Comentarios</Text>
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
            borderBottomColor: 'rgba(241, 196, 15,1.0)',
            elevation: 0,
            shadowOpacity: 0,
            height: hp('20%'),
        },
    }  
  };

  componentDidMount(){
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    AsyncStorage.getItem('user')
    .then((value) => {
      const data = JSON.parse(value);
      this.setState({ idUsuario: data.idUser });
    });
  }

  onStarRatingPress(rating) {
    this.setState({ rating: rating })
  }

  _clear() {
    this.titleInput.clear();
    this.comentarieInput.clear();
    this.setState({
      rating: 1,
      title: '',
      comentarie: '',
      isLoading: false
    })
  }

  sendAction() {
    var {idNegocio, idUsuario, title, comentarie, rating} = this.state;
    this.setState({isLoading: true})
    if (comentarie === null || comentarie === '') {
      Alert.alert(
        'Campos incompletos', 'Necesitas llenar el campo de opinión',
        [{
          text: 'OK',
        }]
      );
    } else {
      const params = {
        iu: idUsuario,
        ib: idNegocio,
        r: rating,
        t: title,
        o: comentarie
      };
      ApiClient.postComentarie(params)
      .then(response => {
        var response = response[0];
        if (response.mensaje === "success") {
          Alert.alert(
            'Enviado.', 'Comentario enviado. Gracias ...',
            [{
              text: 'OK' 
            }],
          );
          this._clear()
        }
        else {
          Alert.alert(
            'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + response.mensaje ,
            [{
              text: 'OK',
            }],
          ); 
          this._clear()
        }
      })
      .catch(error => {
        Alert.alert(
          'Error.', 'Algo salió mal, ayúdanos a mejorar esta aplicación, mándanos un email a contacto@quickb.mx con una captura de pantalla del error. Gracias ... \n\n' + error ,
          [{
            text: 'OK'
          }],
        ); 
        this._clear()
      });
    }
  }


  render() {
    var {rating, isLoading} =this.state;
    return (
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <Text style={styles.label} type="GeosansLight">Calificación</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            fullStarColor={'gold'}
            starSize={45}
            starStyle={styles.start}
            rating={rating}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
          <Text style={styles.label} type="GeosansLight">Título</Text>
          <TextInput 
              placeTextColor="rgba(44, 62, 80,0.9)"
              te
              returnKeyType="next"
              onSubmitEditing={() => this.comentarieInput.focus()}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              ref={(input) => this.titleInput = input}
              style={styles.input}
              onChangeText={value => this.setState({title: value.trim()})}
          />
          <Text style={styles.label} type="GeosansLight">Opinión</Text>
          <TextInput 
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="go"
              multiline={true}
              onSubmitEditing={() => this.sendAction()}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.comentarieInput}
              ref={(input) => this.comentarieInput = input}
              onChangeText={value => this.setState({comentarie: value.trim()})}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
              style={styles.buttonContainer} 
            onPress={() => this.sendAction()}
          >
            <Text style={styles.buttonText} type="GeosansLight">Enviar</Text>
          </TouchableOpacity>
        </View>  
        { isLoading &&
          <Loader visible={ isLoading } containerStyle={styles.loading} />
        } 
      </View>
    );
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
      paddingHorizontal: 50,
      paddingVertical: 20,
      justifyContent: 'center'
    },
    dataContainer: {
      justifyContent: 'center',
    },
    start: {
      paddingRight: 10,
      marginTop: 5,
      marginBottom: 20
    },
    label: {
      color: '#2c3e50',
      fontSize: hp('4%'),
      marginVertical: 5
    },
    input: {
      height: hp('4%'),
      backgroundColor: 'rgba(236, 240, 241,0.6)',
      marginBottom: 10,
      color: 'rgba(44, 62, 80,0.9)',
      paddingHorizontal: 10,
      borderRadius: 20
    },
    comentarieInput: {
      height: hp('20%'),
      backgroundColor: 'rgba(236, 240, 241,0.6)',
      marginBottom: 10,
      color: 'rgba(44, 62, 80,0.9)',
      paddingHorizontal: 10,
      borderRadius: 20
    },
    bottomContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContainer: {
      backgroundColor: 'rgba(236, 240, 241,0.6)',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      height: hp('4%'),
      width: wp('40%'),
      marginTop: wp('5%')
    },
    buttonText: {
      textAlign: 'center',
      color: '#2c3e50',
      fontSize: hp('4%')
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
