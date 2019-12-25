
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import { Header } from '../../components/Headers'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { p } from '../../components/normalize';
import { NextBtn } from '../../components/Icons'
import AwesomeBar from '../../components/awesomeBar';
import ValidationService from '../../config/validation';

export default class _Verificación extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(){
    super();
    this.state = {
      nombre:'',
      apellido: '',
      género: 1,
      dirección: '',
      estado:'',
      municipio: '',
      telefónico: '',
      email: '',
      curp: ''
    }
  }

  render() {

    const { navigation } = this.props
    const { 
      nombre,
      apellido,
      género,
      dirección,
      estado,
      municipio,
      telefónico,
      email,
      curp 
    } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <Header
          title={'Registrar'}
          right={(
            <View style={styles.rightHeader}>
              <MaterialCommunityIcons name={'cart'} size={p(30)} color={'#6D6E71'} />
            </View>
          )}
          onBack={() => navigation.pop()}
        />
        <ScrollView>
          <AwesomeBar check={2} />
          <View style={styles.view}>

            <Text style={styles.h2}>Verificación de Datos</Text>

            <View style={styles.viewContainer}>
              <Text style={styles.text}>Nombre</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.nombreInput = input}
                onChangeText={value => this.setState({ nombre: value.trim() })}
              />

              <Text style={[styles.text, { marginTop: p(12) }]}>Apellido</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.apellidoInput = input}
                onChangeText={value => this.setState({ apellido: value.trim() })}
              />

              <View style={styles.board}>
                <Text style={[styles.text, { marginTop: p(12) }]}>Género</Text>
                <TouchableOpacity onPress={()=>this.setState({ género: 2 })} style={styles.check}>
                  <Text style={[styles.text, { marginTop: p(12) }]}>F</Text>
                  <FontAwesome name={género == 2 ? 'circle' : 'circle-o'} size={p(9)} color={'#111'} style={{ marginLeft: p(6) }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.setState({ género: 1 })} style={styles.check}>
                  <Text style={[styles.text, { marginTop: p(12) }]}>M</Text>
                  <FontAwesome name={género == 1 ? 'circle' : 'circle-o'} size={p(9)} color={'#111'} style={{ marginLeft: p(6) }} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.text, { marginTop: p(15) }]}>Dirección</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.direcciónInput = input}
                onChangeText={value => this.setState({ dirección: value.trim() })}
              />

              <Text style={[styles.text, { marginTop: p(12) }]}>Municipio</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.estadoInput = input}
                onChangeText={value => this.setState({ estado: value.trim() })}
              />

              <Text style={[styles.text, { marginTop: p(12) }]}>Número telefónico</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.municipioInput = input}
                onChangeText={value => this.setState({ municipio: value.trim() })}
              />

              <Text style={[styles.text, { marginTop: p(12) }]}>Estado</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.telefónicoInput = input}
                onChangeText={value => this.setState({ telefónico: value.trim() })}
              />

              <Text style={[styles.text, { marginTop: p(12) }]}>E-mail</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.emailInput = input}
                onChangeText={value => this.setState({ email: value.trim() })}
              />

              <Text style={[styles.text, { marginTop: p(12) }]}>CURP</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                ref={(input) => this.curpInput = input}
                onChangeText={value => this.setState({ curp: value.trim() })}
              />

            </View>

          </View>

          <NextBtn 
            onClick={() => { 
              if(ValidationService.register_verification(nombre, apellido, género, dirección, estado, municipio, telefónico, email, curp )){
                return false
              }
              navigation.navigate('registerBussinesScreen4', { myMemberships: this.props.navigation.state.params.myMemberships})
            }}
          />

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
    justifyContent: 'flex-start',
  },

  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(18),
  },
  h2: {
    fontFamily: 'GeosansLight',
    fontSize: p(22),
    textAlign: 'center',
    marginBottom: p(12)
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
    fontSize: p(20),
  },
  input: {
    height: p(32),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(21),
    fontFamily: 'GeosansLight',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  icon: {
    resizeMode: "contain",
    height: p(30),
    width: p(30),
    marginHorizontal: p(12)
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: p(12)
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: p(18),
    borderBottomColor: '#333',
    borderBottomWidth: p(2)
  },
  board: {
    flexDirection: 'row',
    borderBottomColor: '#a2a2a2',
    borderBottomWidth: p(2),
    alignItems: 'center',
    paddingVertical: p(5)
  }
})
