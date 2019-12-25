
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, Text } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import { MaterialCommunityIcons, EvilIcons, SimpleLineIcons } from '@expo/vector-icons';

export default class _Promociones extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      next: true,
    };
  };

  render() {
    const { next } = this.state;
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header
          title={'Promociones'}
          onBack={() => navigation.pop()}
        />
        {
          next ? <View style={styles.view}>

            <Text style={styles.h1}>Vigentes</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: p(12) }}>
              <View style={styles.board}>
                <Image source={{ uri: 'https://wallingtonwines.com.au/wp-content/uploads/2017/12/raymond-vineyards-napa-valley-wines-1.jpg' }} style={styles.headerImg} />
                <View style={{ marginLeft: p(12) }}>
                  <Text style={styles.h2}>Botellas 2x1</Text>
                  <Text style={styles.h2}>*Aplican Restricciones</Text>
                  <Text style={styles.h2}>Vigencia 25 Feb- 28 Mar</Text>
                </View>
              </View>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <MaterialCommunityIcons name={'close'} size={p(30)} color={'#6D6E71'} />
                <EvilIcons name={'pencil'} size={p(30)} color={'#6D6E71'} />
              </View>
            </View>

            <View style={styles.circleView}>
              <TouchableOpacity onPress={() => this.setState({ next: !next })} style={styles.circle}>
                <MaterialCommunityIcons name={'plus'} size={p(30)} color={'#111'} />
              </TouchableOpacity>
            </View>
          </View>
            : <View style={styles.viewC}>
              <Text style={styles.text}>Seleccionar Negocio</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  placeTextColor="rgba(44, 62, 80,0.9)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.lastNameInput.focus()}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.input, { width: p(290) }]}
                  ref={(input) => this.nameInput = input}
                  onChangeText={value => this.setState({ name: value.trim() })}
                />
                <SimpleLineIcons
                  name={'arrow-down'}
                  size={p(21)}
                  color={'#111'}
                  style={{ marginLeft: p(15) }}
                />
              </View>

              <Text style={[styles.text, { marginTop: p(5) }]}>Título de la promoción</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.lastNameInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { width: p(290) }]}
                ref={(input) => this.nameInput = input}
                onChangeText={value => this.setState({ name: value.trim() })}
              />
              <Text style={[styles.text, { marginTop: p(5) }]}>Descripción</Text>
              <View style={{ flexDirection: 'row' }}>

                <TextInput
                  multiline={true}
                  placeTextColor="rgba(44, 62, 80,0.9)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.lastNameInput.focus()}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.inputarea, { width: p(290) }]}
                  ref={(input) => this.nameInput = input}
                  onChangeText={value => this.setState({ name: value.trim() })}
                />

              </View>

              <Text style={[styles.text, { marginTop: p(5) }]}>Editar color de fondo</Text>
              <Image source={{ uri: 'https://cdn.pixabay.com/photo/2012/04/16/12/23/colors-35763_960_720.png' }} style={styles.bar} />

              <Text style={[styles.text, { marginTop: p(5) }]}>Fotos</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.box}>
                  <MaterialCommunityIcons name={'plus'} size={p(30)} color={'#111'} />
                </View>
                <View style={styles.box}>
                  <MaterialCommunityIcons name={'plus'} size={p(30)} color={'#111'} />
                </View>
                <View style={styles.box}>
                  <MaterialCommunityIcons name={'plus'} size={p(30)} color={'#111'} />
                </View>
                <View style={styles.box}>
                  <MaterialCommunityIcons name={'plus'} size={p(30)} color={'#111'} />
                </View>
                <View style={styles.box}>
                  <MaterialCommunityIcons name={'plus'} size={p(30)} color={'#111'} />
                </View>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('vistapreviaScreen')}
              >
                <Text style={styles.btnText}>Vista previa</Text>
              </TouchableOpacity>

            </View>

        }
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
    justifyContent: 'flex-start',
  },
  viewC: {
    marginTop: p(30),
    marginHorizontal: p(20)
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
    marginHorizontal: p(30),
    marginVertical: p(15)
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
  },
  h2: {
    fontFamily: 'GeosansLight',
    fontSize: p(10),
  },
  circle: {
    width: p(30),
    height: p(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: p(15),
    backgroundColor: '#939598'
  },
  circleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: p(30)
  },
  board: {
    width: p(250),
    flexDirection: 'row',
    borderColor: '#6f7073',
    borderWidth: 2,
    borderTopWidth: p(4),
    borderRadius: 14,
    paddingHorizontal: p(15),
    paddingVertical: p(5)
  },
  headerImg: {
    width: p(70),
    height: p(50)
  },
  input: {
    height: p(20),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(14),
    fontFamily: 'GeosansLight',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  inputarea: {
    textAlignVertical: 'top',
    height: p(80),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(14),
    fontFamily: 'GeosansLight',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  box: {
    width: p(60),
    height: p(60),
    marginTop: p(3),
    borderRadius: p(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E7E9'
  },
  btn: {
    width: p(190),
    height: p(30),
    alignSelf: 'center',
    backgroundColor: '#e6e7e9',
    borderRadius: p(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: p(20)
  },
  btnText: {
    fontSize: p(18),
    fontFamily: 'GeosansLight',
  },
  bar: {
    width: p(333),
    height: p(22),
    marginVertical: p(6),
    borderRadius: p(20)
  }

})
