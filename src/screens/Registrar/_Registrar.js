
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Header } from '../../components/Headers'
import { p } from '../../components/normalize';
import { REGISTRAR } from '../../config/staticData'
import Images from '../../constants/Images';

export default class _Registrar extends Component {

  static navigationOptions = () => ({
    header: null
  });

  render() {

    return (
      <View style={styles.container}>
        <Header 
          title={'Registrar'} 
          onBack={()=>this.props.navigation.pop()}
        />
        <View style={styles.view}>
          <Text style={styles.h1}>{REGISTRAR.title}</Text>
          <Image source={Images.logo} style={styles.logo}/>
          <Text style={styles.h2}>{REGISTRAR.description1}</Text>
          <Text style={styles.h2}>{REGISTRAR.description2}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bottom}
          onPress={()=>this.props.navigation.navigate("registerBussinesScreen2")}
        >
          <Text style={styles.h1}>Continuar</Text>
          <Image source={Images.right} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    padding: p(40),
    paddingTop: p(25)
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(42),
    textAlign: 'center',
    color: '#111'
  },
  h2: {
    fontFamily: 'GeosansLight',
    fontSize: p(24),
    marginVertical: p(17),
    color: '#525252'
  },
  logo: {
    width: p(200),
    height: p(43),
    alignSelf: 'center'
  },
  icon: {
    resizeMode: "contain",
    height: p(30),
    width: p(30),
    marginHorizontal: p(12)
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopColor: '#e6e7e9',
    borderTopWidth: p(5),
    padding: p(12)
  }

})
