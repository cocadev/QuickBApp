
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { Header } from '../../components/Headers'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { p } from '../../components/normalize';
import AwesomeBar from '../../components/awesomeBar';
import UtilService from '../../config/utils';

export default class _Registrar5 extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor() {
    super();
    this.state = {
      check: false,
      cvv: '',
      caduca: '',
      card: ''
    }
  }

  componentDidMount() {
    alert(JSON.stringify(this.props.navigation.state.params.myMemberships))
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

    const { caduca, cvv, card } = this.state
    const { myMemberships } = this.props.navigation.state.params

    return (
      <View style={styles.view}>

        <View style={styles.board}>
          <Text style={styles.h0}>Resumen de Negocios</Text>
        </View>

        <ScrollView>
          {
            myMemberships.map((item, index) =>
              <View style={{ flexDirection: 'row' }} key={index}>
                <View style={styles.boarding}>
                  <Image source={{ uri: item.image }} style={styles.Img} />
                  <View style={{ marginLeft: p(12) }}>
                    <Text style={[styles.h4, { marginLeft: 0 }]}>{item.bussinesName}</Text>
                    <Text numberOfLines={1} style={styles.h6}>{item.bussinesAddress}</Text>
                    <Text style={styles.h5}>{item.categoryName}</Text>
                  </View>
                </View>
                <View style={styles.round}>
                  <Text numberOfLines={1} style={[styles.h4, { marginLeft: 0 }]}>{item.categoryName}</Text>
                  <Text style={styles.h7}>{ UtilService.membership(item.membership) }</Text>
                </View>
              </View>)
          }

          <View style={styles.board}>
            <Text style={styles.h0}>Método de pago</Text>
          </View>
          <View style={styles.board}>
            <Text style={styles.h0}>Visa</Text>
            <FontAwesome name={'cc-visa'} size={p(30)} color={'#4c55a4'} style={{ marginLeft: p(26) }} />
          </View>
          <View style={styles.board}>
            <Text style={styles.h0}>Nombre</Text>
            <Text style={styles.h4}>Mariana Desiree Murillo Sánchez</Text>
          </View>
          <View style={styles.board}>
            <Text style={styles.h0}>Número</Text>
            <TextInput
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType='numeric'
              autoCorrect={false}
              secureTextEntry={true}
              style={[styles.input, { flex: 1 }]}
              ref={(input) => this.cardInput = input}
              // onChangeText={value => this.setState({ cvv: value.trim() })}
              onChangeText={this.handleCard}
              value={card}

            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.board, { flex: 1 }]}>
              <Text style={styles.h0}>Caduca</Text>
              {/* <Text style={styles.h4}>10/21</Text> */}
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                keyboardType='numeric'
                autoCorrect={false}
                style={[styles.input, { flex: 1 }]}
                ref={(input) => this.caducaInput = input}
                // onChangeText={value => this.setState({ cvv: value.trim() })}
                onChangeText={this.handleCaduca}
                value={caduca}

              />
            </View>
            <View style={[styles.board, { flex: 1 }]}>
              <Text style={styles.h0}>CVV</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                autoCapitalize="none"
                secureTextEntry={true}
                autoCorrect={false}
                style={[styles.input, { flex: 1 }]}
                ref={(input) => this.cvvInput = input}
                onChangeText={value => this.setState({ cvv: value.trim() })}
                value={cvv}
              />
            </View>
          </View>

          <Text style={styles.h1}>Total a pagar  $ 500.00</Text>

          <TouchableOpacity onPress={() => this.setState({ check: true })} style={styles.btn}>
            <Text style={styles.h0}>Pagar</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    )
  }

  render() {
    const { check } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} enabled>

        <Header
          title={'Registrar'}
          right={(
            <View style={styles.rightHeader}>
              <MaterialCommunityIcons name={'cart'} size={p(30)} color={'#6D6E71'} />
            </View>
          )}
          onBack={() => this.props.navigation.pop()}
        />
        <ScrollView style={{ flex: 1 }}>

          <AwesomeBar check={4} />

          {!check && this.Board()}
          {check &&
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.h1, { marginTop: p(50) }]}>{'Diríjase a su carrito\n de compras'}</Text>
              <TouchableOpacity
                style={styles.btnLast}
                onPress={() => this.props.navigation.popToTop()}
              >
                <MaterialCommunityIcons name={'cart'} size={p(30)} color={'#fff'} />

              </TouchableOpacity>
            </View>
          }

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
    paddingVertical: p(22),
    justifyContent: 'flex-start',
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(22),
    textAlign: 'center',
    marginVertical: p(12)
  },
  h0: {
    fontFamily: 'GeosansLight',
    fontSize: p(22),
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
    fontSize: p(13),
    marginLeft: p(12)
  },
  h5: {
    fontFamily: 'GeosansLight',
    fontSize: p(9),
  },
  h6: {
    fontFamily: 'GeosansLight',
    fontSize: p(11),
    maxWidth: p(160)
  },
  h7: {
    fontFamily: 'CaviarDreams',
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
  board: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: p(6),
    paddingHorizontal: p(25),
    borderBottomColor: '#fafafa',
    borderBottomWidth: p(4),
  },
  btn: {
    width: p(110),
    height: p(30),
    marginVertical: p(18),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: p(14),
    backgroundColor: '#e6e7e9'
  },
  boarding: {
    flex: 1,
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
  round: {
    width: p(70),
    height: p(60),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: p(2),
    borderColor: '#c4c5c7',
    borderRadius: p(10),
    marginRight: p(20)
  },
  btnLast: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: p(18),
    width: p(100),
    height: p(30),
    marginTop: p(20),
    backgroundColor: 'grey'
  },
  input: {
    paddingLeft: p(8)
  }
})
