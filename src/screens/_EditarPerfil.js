
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, Text, ScrollView } from 'react-native';
import { Header } from '../components/Headers'
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { p } from '../components/normalize';
import Images from '../constants/Images';
import * as DATA from '../config/staticData'

export default class _EditarPerfil extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      // loading: false,
      // filteredData: [],
      categoria: '',
      // dropDown1: false,
      subCategoria: '',
      horarios1: '',
      horarios2: '',
      productos: ''
    };
  };

  render() {
    const { dropDown1, categoria, subCategoria, horarios1, horarios2, productos } = this.state;

    return (
      <View style={styles.container}>
        <Header
          title={'Editar Perfil'}
          right={(
            <View style={styles.rightHeader}>
              <Image source={Images.ok} style={styles.headerImg} />
            </View>
          )}
          onBack={() => this.props.navigation.pop()}
        />
        <ScrollView style={styles.view}>

          <View style={styles.viewContainer}>
            <Text style={styles.text}>Nombre del negocio</Text>
            <TextInput
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="next"
              onSubmitEditing={() => this.lastNameInput.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              ref={(input) => this.nameInput = input}
              onChangeText={value => this.setState({ name: value.trim() })}
            />

            <Text style={[styles.text, { marginTop: p(2) }]}>Categoria</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.dropDown} >
                <Text style={styles.text}>{categoria}</Text>
              </View>
              <SimpleLineIcons
                name={'arrow-down'}
                size={p(19)}
                color={'#111'}
                style={{ marginLeft: p(6), marginRight: p(30) }}
                onPress={
                  () => this.props.navigation.navigate('dropDownScreen', {
                    title: 'Categoria',
                    data: DATA.CATEGORIES_CATEGORIA,
                    update: (x) => this.setState({ categoria: x })
                  })
                }
              />
            </View>

            {/* {
              dropDown1 &&
              <View style={{ marginTop: 0 }}>
                {REGISTER_CATEGORIA.map((item, key) => (
                  <TouchableOpacity onPress={() => this.setState({ categoria: key, dropDown1: false })} style={styles.dropDown} key={key}>
                    <Text style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            } */}

            <Text style={[styles.text, { marginTop: p(4) }]}>SubCategoria</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.dropDown} >
                <Text style={styles.text}>{subCategoria}</Text>
              </View>
              <SimpleLineIcons
                name={'arrow-down'}
                size={p(19)}
                color={'#111'}
                style={{ marginLeft: p(6), marginRight: p(30) }}
                onPress={
                  () => this.props.navigation.navigate('dropDownScreen', {
                    title: 'SubCategoria',
                    data: DATA.CATEGORIES_SUBCATEGORIA,
                    update: (x) => this.setState({ subCategoria: x })
                  })
                }
              />
            </View>

            <Text style={[styles.text, { marginTop: p(2) }]}>Horarios</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown, { width: p(70) }]} >
                <Text style={styles.text}>{horarios1}</Text>
              </View>

              <SimpleLineIcons
                name={'arrow-down'}
                size={p(19)}
                color={'#111'}
                style={{ marginLeft: p(6), marginRight: p(30) }}
                onPress={
                  () => this.props.navigation.navigate('dropDownScreen', {
                    title: 'Horarios',
                    data: DATA.CATEGORIES_HORARIOS,
                    update: (x) => this.setState({ horarios1: x })
                  })
                }
              />

              <View style={[styles.dropDown, { width: p(70) }]} >
                <Text style={styles.text}>{horarios2}</Text>
              </View>
              <SimpleLineIcons
                name={'arrow-down'}
                size={p(19)}
                color={'#111'}
                style={{ marginLeft: p(6), marginRight: p(30) }}
                onPress={
                  () => this.props.navigation.navigate('dropDownScreen', {
                    title: 'Horarios',
                    data: DATA.CATEGORIES_HORARIOS,
                    update: (x) => this.setState({ horarios2: x })
                  })
                }
              />

            </View>

            <Text style={[styles.text, { marginTop: p(2) }]}>Dirección del negocio</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.lastNameInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { flex: 1 }]}
                ref={(input) => this.nameInput = input}
                onChangeText={value => this.setState({ name: value.trim() })}
              />
              <EvilIcons name={'pencil'} size={p(26)} color={'#777'} style={{ marginLeft: p(6), }} />
            </View>

            <Text style={[styles.text, { marginTop: p(2) }]}>Telefono del negocio</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.lastNameInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { flex: 1 }]}
                ref={(input) => this.nameInput = input}
                onChangeText={value => this.setState({ name: value.trim() })}
              />
              <EvilIcons name={'pencil'} size={p(26)} color={'#777'} style={{ marginLeft: p(6), }} />
            </View>

            <Text style={[styles.text, { marginTop: p(2) }]}>Email del negocio</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.lastNameInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { flex: 1 }]}
                ref={(input) => this.nameInput = input}
                onChangeText={value => this.setState({ name: value.trim() })}
              />
              <EvilIcons name={'pencil'} size={p(26)} color={'#777'} style={{ marginLeft: p(6), }} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: p(12) }}>
              <Text style={[styles.text, { marginTop: p(2), flex: 1 }]}>Foto de Perfil</Text>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                <View style={styles.circle}>
                </View>
                <EvilIcons 
                  name={'pencil'} 
                  size={p(18)} 
                  color={'#777'} 
                  style={{ marginLeft: p(6) }} 
                  onPress={()=>this.props.navigation.navigate('fotodePerfilScreen')}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: p(12) }}>
              <Text style={[styles.text, { marginTop: p(2), flex: 1 }]}>Foto de Portada</Text>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                <View style={[styles.circle, { borderRadius: 0 }]}>
                </View>
                <EvilIcons 
                  name={'pencil'} 
                  size={p(18)} 
                  color={'#777'} 
                  style={{ marginLeft: p(6) }} 
                  onPress={()=>this.props.navigation.navigate('fotoPortadaScreen')}
                />
              </View>
            </View>

            <Text style={[styles.text, { marginTop: p(4) }]}>Productos</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown, { width: p(180)}]} >
                <Text style={styles.text}>{productos}</Text>
              </View>
              <SimpleLineIcons 
                name={'arrow-down'} 
                size={p(19)} 
                color={'#111'} 
                style={{ marginLeft: p(6), marginRight: p(30) }} 
                onPress={
                  () => this.props.navigation.navigate('dropDownScreen', {
                    title: 'Productos',
                    data: DATA.CATEGORIES_CATEGORIA,
                    update: (x) => this.setState({ productos: x })
                  })
                }
              />
            </View>



          </View>

          <View style={styles.btn}>
            <Text style={styles.text}>{'Vista previa'}</Text>
          </View>

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
    padding: p(22),
  },

  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(18),
  },
  rightHeader: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderLeftColor: '#e3e4e5',
    borderLeftWidth: p(3),
    paddingLeft: p(20)
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
  },
  input: {
    height: p(22),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(14),
    fontFamily: 'GeosansLight',
    paddingHorizontal: 10,
    borderRadius: 20
  },

  btn: {
    width: p(185),
    height: p(26),
    marginTop: p(20),
    marginBottom: p(50),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: p(20),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    // paddingHorizontal: p(6)
  },
  dropDown: {
    height: p(22),
    marginTop: p(3),
    justifyContent: 'center',
    width: p(150),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  headerImg: {
    width: p(40),
    height: p(40)
  },
  circle: {
    width: p(100),
    height: p(100),
    borderRadius: p(50),
    borderColor: '#555',
    borderWidth: p(3),
  }
})
