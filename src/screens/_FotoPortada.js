
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import Images from '../constants/Images';
import { EvilIcons } from '@expo/vector-icons';

const imageURL = 'https://garufasteakhouse.com/wp-content/uploads/2018/06/logo-garufa.jpg'

export default class _FotoPortada extends Component {

  static navigationOptions = () => ({
    header: null
  });

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'Foto Portada'}
          right={(
            <View style={styles.rightHeader}>
              <Image source={Images.ok} style={styles.headerImg} />
            </View>
          )}
          onBack={()=>this.props.navigation.pop()}
        />
        <View style={styles.view}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
            <View style={styles.board}>
              <Image source={{ uri: imageURL }} style={{ width: p(210), height: p(130) }} />
            </View>
            <EvilIcons name={'pencil'} size={p(30)} color={'#6D6E71'} />
          </View>

          <View style={styles.bar}>
            <View style={styles.board2}>
              <Image source={{ uri: imageURL }} style={{ width: p(52), height: p(35) }} />
            </View>
            <View style={styles.board2}>
              <Image source={{ uri: imageURL }} style={{ width: p(52), height: p(35) }} />
            </View>
            <View style={styles.board2}>
              <Image source={{ uri: imageURL }} style={{ width: p(52), height: p(35) }} />
            </View>
            <View style={styles.board2}>
              <Image source={{ uri: imageURL }} style={{ width: p(52), height: p(35) }} />
            </View>
            <View style={styles.board2}>
              <Image source={{ uri: imageURL }} style={{ width: p(52), height: p(35) }} />
            </View>
          </View>
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

    // paddingHorizontal: p(22),
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightHeader: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderLeftColor: '#e3e4e5',
    borderLeftWidth: p(3),
  },
  headerImg: {
    marginLeft: p(17),
    width: p(40),
    height: p(40)
  },
  board: {
    width: p(240),
    height: p(240),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: p(2),
    borderColor: '#e9eaeb'
  },
  board2: {
    width: p(62),
    height: p(62),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: p(2),
    borderColor: '#e9eaeb',
    marginHorizontal: p(6)
  },
  bar: {
    marginTop: p(60),
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
