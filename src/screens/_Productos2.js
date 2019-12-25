
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import { ProductosItem } from '../components/listItems';

export default class _Productos2 extends Component {
  
  static navigationOptions = () => ({
    header: null
  });

  _renderItem({ item, index }, props) {
    return (
      <ProductosItem 
        item={item} 
        count={index} 
        onClick={()=>props.navigation.navigate('editorScreen')} 
      />
    )
  }

  render() {

      return (
        <View style={styles.container}>

          <Header 
            title={'Productos'}
            onBack={()=>this.props.navigation.pop()}
          />

          <View style={styles.view}>

            <Text style={styles.text}>Selecciona un negocio para anadir o modificar tus productos</Text>
            
            <FlatList
              data={FILTERDATA}
              keyExtractor={(item, i) => String(i)}
              renderItem={(item)=>this._renderItem(item, this.props)}
            />

          </View>
        </View>

      )

    
  }
}

const FILTERDATA = [
  { 
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png', 
    avatar: 'https://image.shutterstock.com/image-photo/picture-confused-young-man-dressed-260nw-553535785.jpg', 
    name: 'Luis Garcia', 
    service: 'Excelente servicio', 
    rating: 20
  },
  { 
    img: 'https://www.freepnglogos.com/uploads/eagle-png-logo/morehead-state-eagle-png-logo-8.png', 
    avatar: 'https://pixel.nymag.com/imgs/fashion/daily/2019/03/12/11-elizabeth-holmes-2.w700.h700.jpg', 
    name: 'Laura López', 
    service: 'Las bebidas no estaban frías', 
    rating: 15
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    paddingHorizontal: p(22),
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(22),
    alignSelf: 'center',
    marginTop: p(15),
    textAlign: 'center'
  }
})
