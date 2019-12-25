
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import Images from '../constants/Images';

export default class _Promoción extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      filteredData: [],
      search: '',
      next: true,
      enableScrollViewScroll: true
    };
  };

  render() {
    const { loading, next } = this.state;

    if (!loading) {
      return (
        <View style={styles.container}>
          <Header
            title={'Promoción'}
            right={(
              <View style={styles.rightHeader}>
                <Image source={Images.ok} style={styles.headerImg} />
              </View>
            )}
            onBack={()=>this.props.navigation.pop()}
          />

          <View style={styles.view}>
            <Image source={Images.a} style={styles.smallImg} />
            <Image source={Images.aa} style={styles.smallImg} />
            <Image source={Images.colorpad} style={styles.smallImg} />
            <Image source={Images.a} style={styles.smallImg} />
            <Image source={Images.a} style={styles.smallImg} />
            <Image source={Images.a} style={styles.smallImg} />
            <Image source={Images.a} style={styles.smallImg} />

          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              placeTextColor="rgba(44, 62, 80,0.9)"
              returnKeyType="next"
              autoCapitalize="none"
              style={styles.input}
              ref={(input) => this.nameInput = input}
              onChangeText={value => this.setState({ name: value.trim() })}
            />
          </View>

        </View>

      )

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: p(25),
    paddingVertical: p(12),
    borderBottomColor: '#000',
    borderBottomWidth: p(6)
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
  smallImg: {
    width: p(30),
    height: p(30)
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(10),
  },
  input: {
    height: p(20),
    flex: 1,
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(20),
    fontFamily: 'GeosansLight',
    paddingHorizontal: p(12),
    borderRadius: 20,
    textAlignVertical: 'top',
    padding: p(20)
  },


})
