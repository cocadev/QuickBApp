
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import { NotificacionesItem } from '../components/listItems';
import { NOTIFIcaciones } from '../config/staticData'

export default class _Notificaciones extends Component {

  static navigationOptions = () => ({
    header: null
  });

  _renderItem({ item, index }) {
    return (
      <NotificacionesItem item={item} />
    )
  }

  render() {

    return (
      <View style={styles.container}>
        
        <Header 
          title={'Notificaciones'} 
          color={'#FACA0A'} 
          onBack={()=>this.props.navigation.pop()}
        />

        <FlatList
          data={NOTIFIcaciones}
          keyExtractor={(item, i) => String(i)}
          renderItem={this._renderItem}
        />

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
    padding: p(12),
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: p(12)
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(12),
  },
  h1: {

  }

})
