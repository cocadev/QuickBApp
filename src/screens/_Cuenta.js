
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Headers'
import { EvilIcons } from '@expo/vector-icons';
import { p } from '../components/normalize';
import Images from '../constants/Images';

export default class _Cuenta extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      filteredData: [],
      search: '',
      categoria: -1,
      dropDown1: false,
      enableScrollViewScroll: true
    };
  };

  render() {
    const { nombre, apellido, email, contraseña } = this.state
    return (
       <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>

        <Header
          title={'Cuenta'}
          right={(
            <TouchableOpacity style={styles.rightHeader}>
              <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/26/20/35/young-man-1281282__340.jpg'}} style={styles.headerImg} />
            </TouchableOpacity>
          )}
          onBack={()=>this.props.navigation.pop()}
        />
        <ScrollView style={styles.view}>

            <Text style={styles.text}>Nombre</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.apellidoInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { flex: 1}]}
                ref={(input) => this.nombreInput = input}
                onChangeText={value => this.setState({ nombre: value.trim() })}
              />
              <EvilIcons name={'pencil'} size={p(26)} color={'#777'} style={{ marginLeft: p(6), }} />
              <Text style={styles.h2}>Editar</Text>

            </View>

            <Text style={styles.text}>Apellido</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.emailInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { flex: 1}]}
                ref={(input) => this.apellidoInput = input}
                onChangeText={value => this.setState({ apellido: value.trim() })}
              />
              <EvilIcons name={'pencil'} size={p(26)} color={'#777'} style={{ marginLeft: p(6), }} />
              <Text style={styles.h2}>Editar</Text>

            </View>

            <Text style={styles.text}>E-mail</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.contraseñaInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { flex: 1}]}
                ref={(input) => this.emailInput = input}
                onChangeText={value => this.setState({ email: value.trim() })}
              />
              <EvilIcons name={'pencil'} size={p(26)} color={'#777'} style={{ marginLeft: p(6), }} />
              <Text style={styles.h2}>Editar</Text>
            </View>

            <Text style={styles.text}>Contraseña</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { flex: 1}]}
                ref={(input) => this.contraseñaInput = input}
                onChangeText={value => this.setState({ contraseña: value.trim() })}
              />
              <EvilIcons name={'pencil'} size={p(26)} color={'#777'} style={{ marginLeft: p(6), }} />
              <Text style={styles.h2}>Editar</Text>
            </View>

           <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: p(30)}}
              onPress={()=>alert(JSON.stringify({
                nombre, apellido, email, contraseña
              }))}
           >
              <Text style={styles.h1}>{'Mantener sesion abierta'}</Text>
              <Image source={Images.paquetesCheck} style={{ width: p(25), height: p(25), marginLeft: p(12)}}/>
           </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

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
  h2: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
  },
  rightHeader: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    
    paddingLeft: p(20)
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
    marginTop: p(20)
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
    width: p(60),
    height: p(60),
    borderRadius: p(30),
    marginRight: p(10)
  },
  circle: {
    width: p(100),
    height: p(100),
    borderRadius: p(50),
    borderColor: '#555',
    borderWidth: p(2),
  }
})
