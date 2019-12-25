
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import { RecientesItem } from '../components/listItems';
import { RECIENTES } from '../config/staticData'

export default class _Recientes extends Component {

  static navigationOptions = () => ({
    header: null
  });

  _renderItem({ item, index }) {
    return (
      <RecientesItem item={item} />
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <Header 
          title={'Recientes'} 
          color={'#FACA0A'} 
          onBack={()=>this.props.navigation.pop()}
        />

        <View style={{ margin: p(24)}}>
        {
          RECIENTES.map((item, key) =>
            <View key={key}>
              <Text style={styles.text}>{item.name}</Text>
              <FlatList
                data={item.content}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
              />
            </View>
          )
        }
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
    fontSize: p(18),
    marginLeft: p(8),
    marginTop: p(8)
  },
})
