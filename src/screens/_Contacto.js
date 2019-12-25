
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';

export default class _Contacto extends Component {

  static navigationOptions = () => ({
    header: null
  });

  render() {

    return (
      <View style={styles.container}>
        <Header 
          title={'Contacto/Legal'} 
          color={'#FACA0A'} 
          onBack={()=>this.props.navigation.pop()}
        />

        <View style={{ margin: p(24)}}>
        
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
