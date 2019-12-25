/**
 * @file DistanceFilter.js
 * @description This file show all the distances than we can selected for filter some bussines list.
 * @author Fernando Mondragón
 * @date 12 AGU 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Image, AsyncStorage } from 'react-native';
import Text  from '../components/CustomText';
import {RadioButton} from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Images from '../constants/Images';

/**
 * @description Export the DistanceFilter screen.
 * @export {Class}
 * @constructor
 * @extends Component
 */
export default class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      value: 'first',
      distanciaFilter: 1,
    };
  };

  static navigationOptions = ({ navigation }) => {
    var distanciaFilter = navigation.getParam('distanciaFilter');
    return {
        headerTitle: (
            <Text style={styles.titleContainer} type="GeosansLight">Distancia</Text>
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
            <TouchableOpacity style={styles.rightHeader} onPress={() => this._continueAction(distanciaFilter, navigation)}>
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

  static _continueAction = async (distanciaFilter, navigation) => {
    await AsyncStorage.removeItem('distanciaFilter');
    await AsyncStorage.setItem('distanciaFilter', JSON.stringify(distanciaFilter));
    navigation.pop();
  }

  componentDidMount() {
    this.cleanData()
    this._setParams();
  }

  async cleanData() {
    await AsyncStorage.removeItem('distanciaFilter');
  }

  checkAction(value) {
    switch(value) {
      case 'first':
        clearTimeout(this.timer);
        this.setState({value: 'first', distanciaFilter: 1})
        this.timer = setTimeout(() => this._setParams(), WAIT_INTERVAL);
        break
      case 'second':
        clearTimeout(this.timer);
        this.setState({value: 'second', distanciaFilter: 2})
        this.timer = setTimeout(() => this._setParams(), WAIT_INTERVAL);
        break
      case 'third':
        clearTimeout(this.timer);
        this.setState({value: 'third', distanciaFilter: 3})
        this.timer = setTimeout(() => this._setParams(), WAIT_INTERVAL);
        break
      case 'fourth':
        clearTimeout(this.timer);
        this.setState({value: 'fourth', distanciaFilter: 4})
        this.timer = setTimeout(() => this._setParams(), WAIT_INTERVAL);
    }
  }

  _setParams() {
    var { distanciaFilter } = this.state;
    this.state.navigation.setParams({distanciaFilter: distanciaFilter});
  }

  render() {
    var { value } = this.state;
    return (
      <View style={styles.container}>
        <RadioButton.Group
          onValueChange={value => this.checkAction(value)}
          value={value}
        >
        <View style={styles.distanceContainer}>
          <View style={styles.textContainer}>
            <Text type="CaviarDreams" style={styles.nameDistance}>
              Menos de 2 Km
            </Text>
          </View>
          <RadioButton
            value={'first'}
            color= {'black'}
          />
          </View>
          <View style={styles.distanceContainer}>
            <View style={styles.textContainer}>
              <Text type="CaviarDreams" style={styles.nameDistance}>
                Menos de 5 Km
              </Text>
            </View>
            <RadioButton
              value={'second'}
              color= {'black'}
            />
          </View>
          <View style={styles.distanceContainer}>
            <View style={styles.textContainer}>
              <Text type="CaviarDreams" style={styles.nameDistance}>
                Menos de 10 Km
              </Text>
            </View>
            <RadioButton
              value={'third'}
              color= {'black'}
            />
          </View>
          <View style={styles.distanceContainer}>
            <View style={styles.textContainer}>
              <Text type="CaviarDreams" style={styles.nameDistance}>
                Mas de 10 Km
              </Text>
            </View>
            <RadioButton
              value={'fourth'}
              color= {'black'}
            />
          </View>
        </RadioButton.Group>
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
    distanceContainer: {
      flexDirection: 'row',
      padding: 40,
      width: wp('100%'),
      height: hp('15%'),
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    textContainer: {
      alignItems: 'center',
      padding: 40
    },
    nameDistance: {
      textAlign: 'left',
      fontSize: hp('4%')
    }
});

/**
 * @proyect QuickB
 * @const  {Integer} WAIT_INTERVAL
 */
const WAIT_INTERVAL = 1000;
