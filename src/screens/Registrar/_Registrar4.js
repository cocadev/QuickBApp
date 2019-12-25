
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { Header } from '../../components/Headers'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { p } from '../../components/normalize';
import { NextBtn, PrevBtn } from '../../components/Icons'
import ValidationService from '../../config/validation';
import AwesomeBar from '../../components/awesomeBar';

export default class _Registrar4 extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor() {
    super();
    this.state = {
      check: 0,
      innerCheck: 0,

      cvv: '',
      caduca: '',
      card: '',
      name: ''
    }
  }

  handleCard = (text) => {
    let formattedText = text.split(' ').join('');
    if (formattedText.length > 16) {
      return false
    }
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    this.setState({ card: formattedText });
    return formattedText;
  }

  handleCaduca = (text) => {
    let formattedText = text.split(' ').join('');
    if (formattedText.length > 4) {
      return false
    }
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,2}', 'g')).join(' ');
    }
    this.setState({ caduca: formattedText });
    return formattedText;
  }

  Board() {

    const { caduca, cvv, card, name } = this.state

    return (
      <View style={styles.view}>
        <View style={styles.board}>
          <Text style={styles.h0}>Visa</Text>
          <FontAwesome name={'cc-visa'} size={p(30)} color={'#4c55a4'} style={{ marginLeft: p(26) }} />
        </View>
        <View style={styles.boardy}>
          <Text style={styles.h0}>Nombre</Text>
          <TextInput
            placeTextColor="rgba(44, 62, 80,0.9)"
            returnKeyType="next"
            autoCapitalize="none"
            // keyboardType='numeric'
            placeholder={'Mariana Desiree Murillo Sánchez'}
            autoCorrect={false}
            // secureTextEntry={true} 
            style={[styles.input, { flex: 1 }]}
            ref={(input) => this.cardInput = input}
            onChangeText={value => this.setState({ name: value })}
            // onChangeText={this.handleCard}
            value={name}

          />
        </View>
        <View style={styles.boardy}>
          <Text style={styles.h0}>Número</Text>
          <TextInput
            placeTextColor="rgba(44, 62, 80,0.9)"
            returnKeyType="next"
            autoCapitalize="none"
            placeholder={'4915 / 2158 / 3658 / 7856'}
            keyboardType='numeric'
            autoCorrect={false}
            // secureTextEntry={true} 
            style={[styles.input, { flex: 1 }]}
            ref={(input) => this.cardInput = input}
            // onChangeText={value => this.setState({ card: value })}
            onChangeText={this.handleCard}
            value={card}

          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.boardy, { flex: 1 }]}>
            <Text style={styles.h0}>Caduca</Text>
            <TextInput
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="next"
              autoCapitalize="none"
              placeholder={'10/21'}
              keyboardType='numeric'
              autoCorrect={false}
              style={[styles.input, { flex: 1 }]}
              ref={(input) => this.caducaInput = input}
              // onChangeText={value => this.setState({ cvv: value.trim() })}
              onChangeText={this.handleCaduca}
              value={caduca}

            />
          </View>
          <View style={[styles.boardy, { flex: 1 }]}>
            <Text style={styles.h0}>CVV</Text>
            <TextInput
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType='numeric'
              secureTextEntry={true}
              autoCorrect={false}
              style={[styles.input, { flex: 1 }]}
              ref={(input) => this.cvvInput = input}
              maxLength={3}
              onChangeText={value => {
                this.setState({ cvv: value.trim() })
              }}
              value={cvv}
            />
          </View>
        </View>
      </View>
    )
  }

  VisaBoard() {
    const { check, innerCheck } = this.state
    return (
      <View style={styles.view}>

        <TouchableOpacity onPress={() => this.setState({ check: 1 })} style={styles.board}>
          <Text style={styles.h2}>Paypal</Text>
          <FontAwesome name={check == 1 ? 'circle' : 'circle-o'} size={p(15)} color={'#676767'} style={{ flex: 1 }} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => this.setState({ check: 2 })} style={styles.board}>
          <Text style={styles.h2}>Debito</Text>
          <FontAwesome name={check == 2 ? 'circle' : 'circle-o'} size={p(15)} color={'#676767'} style={{ flex: 1 }} />
        </TouchableOpacity>

        {check == 2 &&
          <View style={{ marginHorizontal: p(50) }}>
            <TouchableOpacity onPress={() => this.setState({ innerCheck: 1 })} style={[styles.board, { borderBottomWidth: 0 }]}>
              <Text style={styles.h3}>Visa</Text>
              <FontAwesome name={innerCheck == 1 ? 'circle' : 'circle-o'} size={p(15)} color={'#676767'} style={{ flex: 0.4 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ innerCheck: 2 })} style={[styles.board, { borderBottomWidth: 0 }]}>
              <Text style={styles.h3}>Masterdcard</Text>
              <FontAwesome name={innerCheck == 2 ? 'circle' : 'circle-o'} size={p(15)} color={'#676767'} style={{ flex: 0.4 }} />
            </TouchableOpacity>
          </View>
        } */}

        <TouchableOpacity onPress={() => this.setState({ check: 2 })} style={styles.board}>
          <Text style={styles.h2}>OpenPay</Text>
          <FontAwesome name={check == 2 ? 'circle' : 'circle-o'} size={p(15)} color={'#676767'} style={{ flex: 1 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ check: 3 })} style={styles.board}>
          <Text style={styles.h2}>MercadoPago</Text>
          <FontAwesome name={check == 3 ? 'circle' : 'circle-o'} size={p(15)} color={'#676767'} style={{ flex: 1 }} />
        </TouchableOpacity>

        <Text style={styles.h1}>Total a pagar $ 500.00 </Text>

      </View>
    )
  }

  render() {

    const { innerCheck, check } = this.state
    const { navigation } = this.props

    return (
      <View style={styles.container}>
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

          <AwesomeBar check={3} />

          {innerCheck == 1 && this.Board()}
          {innerCheck !== 1 && this.VisaBoard()}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View>
              {innerCheck !== 0 && <PrevBtn onClick={() => this.setState({ innerCheck: 0 })} />}
            </View>

            <NextBtn
              onClick={() => {
                if(ValidationService.register_payment(check)){
                  return false
                }
                navigation.navigate('registerBussinesScreen5', { myMemberships: this.props.navigation.state.params.myMemberships})
              }
              }
            />
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
    paddingVertical: p(22),
    justifyContent: 'flex-start',
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(22),
    textAlign: 'center',
    marginTop: p(20)
  },
  h0: {
    fontFamily: 'GeosansLight',
    fontSize: p(25),
  },
  h2: {
    flex: 1,
    fontFamily: 'GeosansLight',
    fontSize: p(22),
  },
  h3: {
    flex: 1,
    fontFamily: 'GeosansLight',
    fontSize: p(18),
  },
  h4: {
    fontFamily: 'GeosansLight',
    fontSize: p(17),
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
    height: p(30),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(20),
    fontFamily: 'GeosansLight',
    paddingHorizontal: 10,
    borderRadius: p(20)
  },
  icon: {
    resizeMode: "contain",
    height: p(30),
    width: p(30),
    marginHorizontal: p(12)
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: p(12),
    flex: 1
  },
  board: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: p(16),
    paddingHorizontal: p(25),
    borderBottomColor: '#fafafa',
    borderBottomWidth: p(4),
  },
  boardy: {
    padding: p(16),
    paddingHorizontal: p(25),
    borderBottomColor: '#fafafa',
    borderBottomWidth: p(4),
  }
})
