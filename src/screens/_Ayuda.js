
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import { AYUDA } from '../config/staticData'

export default class _Ayuda extends Component {

  static navigationOptions = () => ({
    header: null
  });

  render() {

    return (
      <View style={styles.container}>
        <Header 
          title={'Ayuda'} 
          onBack={()=>this.props.navigation.pop()}
        />
        <View style={styles.view}>
          <Text style={styles.h1}>{AYUDA.title}</Text>
          <View style={{ marginTop: p(30), marginBottom: p(40), padding: p(5)}}>
            {
              AYUDA.content.map((item, key) => (
                <Text style={styles.h1} key={key}>-{item}</Text>
              ))

            }
          </View>
          <Text style={styles.h1}>Contacto</Text>
          <Text style={[styles.h1, { textAlign: 'center' }]}>{AYUDA.contacto}</Text>

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
    flex: 1,
    padding: p(40),
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(24),
    color: '#525252'
  },


})
