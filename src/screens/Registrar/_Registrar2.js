
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Header } from '../../components/Headers';
import { p } from '../../components/normalize';
import { PAQUETES } from '../../config/staticData';
import { NextBtn } from '../../components/Icons';
import Images from '../../constants/Images';
import AwesomeBar from '../../components/awesomeBar';

export default class _Registrar2 extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      check: 2,
      _check: 2,
      myMemberships: props.navigation.state.params.myBusiness,
    }
  }

  componentDidMount() {
    alert(JSON.stringify(this.state.myMemberships))
  }

  _renderItem({ item, index }, state) {
    let that = this
    return (

      <View key={index}>
        <View style={styles.boarding}>
          <Image source={{ uri: item.image }} style={styles.Img} />
          <View style={{ marginLeft: p(12) }}>
            <Text style={styles.h4} numberOfLines={1}>{item.bussinesName}</Text>
            <Text style={styles.h2} numberOfLines={1}>{item.bussinesAddress}</Text>
            <Text style={styles.h5} numberOfLines={1}>{item.categoryName}</Text>
          </View>
        </View>

        <Text style={[styles.h1, { margin: p(12) }]}>{item.bussinesName}</Text>

        <View style={styles.view}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: p(12) }}>
            <TouchableOpacity 
              onPress={()=> {
                var newArray = state.myMemberships;
                newArray[index].membership = 3
                that.setState({   
                  myMemberships: newArray
                })
              }} 
              style={styles.circle}>
              { item.membership == 3 && <Image source={Images.ok} style={styles.checkImg} />}
            </TouchableOpacity >
            <TouchableOpacity onPress={()=> {
                var newArray = state.myMemberships;
                newArray[index].membership = 2
                that.setState({   
                  myMemberships: newArray
                })
              }} style={styles.circle}>
            { item.membership == 2 && <Image source={Images.ok} style={styles.checkImg} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {
                var newArray = state.myMemberships;
                newArray[index].membership = 1
                that.setState({   
                  myMemberships: newArray
                })
              }} style={styles.circle}>
            { item.membership == 1 && <Image source={Images.ok} style={styles.checkImg} />}
            </TouchableOpacity>
          </View>

          <View style={styles.viewing}>
            <View style={styles.board}>
              {
                PAQUETES.map((item, key) => (
                  <View key={key} style={[styles.item, { borderColor: item.color }]}>
                    <Text style={[styles.h1, { color: item.color }]}>{item.name}</Text>

                    <View style={{ marginTop: p(12), flex: 1 }}>
                      {item.content.map((x, key) => (
                        <Text key={key} style={styles.h2}>-{x}</Text>
                      ))}
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                      <Text style={[styles.h3, { color: item.color }]}>{item.price}</Text>
                      <Text style={[styles.h3, { color: item.color }]}>{item.note}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {

    const { myMemberships } = this.state
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Header
          title={'Registrar'}
          onBack={() => navigation.pop()}
        />
        <ScrollView>

          <AwesomeBar check={1} />

          <Text style={[styles.h1, { textAlign: 'left', marginVertical: p(20), marginLeft: p(20) }]}>Mis Negocios</Text>

          <FlatList
            data={myMemberships}
            keyExtractor={(item, i) => String(i)}
            renderItem={(item)=>this._renderItem(item, this.state)}
            extraData={this.state}
          />

          <NextBtn onClick={() => navigation.navigate('registerBussinesScreen8', { myMemberships: myMemberships})} />

        </ScrollView>
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
    paddingHorizontal: p(12),
    justifyContent: 'flex-start',
  },
  h1: {
    fontFamily: 'CaviarDreams',
    textAlign: 'center',
    fontSize: p(22),
  },
  h2: {
    fontFamily: 'GeosansLight',
    fontSize: p(10),
    maxWidth: p(230)
  },
  h3: {
    fontFamily: 'Caviar_Dreams_Bold',
    fontSize: p(12),
    textAlign: 'center'
  },
  h4: {
    fontFamily: 'GeosansLight',
    fontSize: p(15),
    maxWidth: p(240)
  },
  h5: {
    fontFamily: 'GeosansLight',
    fontSize: p(9),
  },
  board: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: p(12),

  },
  item: {
    borderColor: 'red',
    borderWidth: p(3),
    borderTopWidth: p(8),
    borderBottomWidth: p(8),
    borderRadius: p(22),
    padding: p(7),
    width: p(110),
    height: p(220),
    marginBottom: p(20)
  },
  circle: {
    width: p(40),
    height: p(40),
    borderRadius: p(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#939598'
  },
  checkImg: {
    width: p(27),
    height: p(27)
  },
  boarding: {
    height: p(60),
    marginHorizontal: p(20),
    padding: p(5),
    flexDirection: 'row',
    marginVertical: p(7),
    borderColor: '#f26D03',
    borderWidth: p(3),
    borderTopWidth: p(6),
    borderTopRightRadius: p(12),
    borderTopLeftRadius: p(12)
  },
  Img: {
    width: p(60),
    height: p(46)
  },

})
