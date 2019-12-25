
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, Text } from 'react-native';
import { Header } from '../components/Headers'
import { SearchBar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../constants/Images';
import { p } from '../components/normalize';

export default class _Productos extends Component {

  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      filteredData: [],
      search: '',
      enableScrollViewScroll: true
    };
  };

  render() {
    const { loading, search } = this.state;

    if (!loading) {
      return (
        <View style={styles.container}>
          <Header
            title={'Productos'}
            right={(
              <View style={styles.rightHeader}>
                <Image source={Images.ok} style={styles.headerImg} />
              </View>
            )}
            onBack={()=>this.props.navigation.pop()}
          />
          <View style={styles.view}>

            <Text style={styles.textHeader}>{'Añade tus productos y la cantidad disponible'}</Text>

            <View style={styles.viewContainer}>
              <Text style={styles.text}>Nombre del producto</Text>
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
              <Text style={[styles.text, { marginTop: p(5) }]}>Cantidad</Text>
              <TextInput
                placeTextColor="rgba(44, 62, 80,0.9)"
                returnKeyType="next"
                onSubmitEditing={() => this.lastNameInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { width: p(70) }]}
                ref={(input) => this.nameInput = input}
                onChangeText={value => this.setState({ name: value.trim() })}
              />
              <Text style={[styles.text, { marginTop: p(5) }]}>Rango de Precios</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  placeTextColor="rgba(44, 62, 80,0.9)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.lastNameInput.focus()}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.input, { width: p(70) }]}
                  ref={(input) => this.nameInput = input}
                  onChangeText={value => this.setState({ name: value.trim() })}
                />
                <Text style={[styles.text, { marginTop: p(5), marginHorizontal: p(12) }]}>a</Text>
                <TextInput
                  placeTextColor="rgba(44, 62, 80,0.9)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.lastNameInput.focus()}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.input, { width: p(70) }]}
                  ref={(input) => this.nameInput = input}
                  onChangeText={value => this.setState({ name: value.trim() })}
                />
              </View>

            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchBarContainer}>
                <SearchBar
                  lightTheme
                  placeholder="Filtro"
                  onChangeText={this.handleSearch}
                  value={search}
                  searchIcon={false}
                  onSubmitEditing={() => this._search()}
                  inputContainerStyle={styles.searchbar}
                  inputStyle={styles.searchbarText}
                  containerStyle={styles.containerStyle}

                />
              </View>
              <TouchableOpacity style={styles.filterContainer} onPress={() => this._filter()}>
                <Image
                  source={Images.filter}
                  fadeDuration={0}
                  style={styles.searchFilterImage}
                />
              </TouchableOpacity>
            </View>

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
    flex: 1,
    padding: p(22),
    justifyContent: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: p(25),
    paddingVertical: p(12)
  },
  searchBarContainer: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    padding: 0,
    borderRadius: 30,
  },
  filterContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: p(25),
  },
  searchButton: {
    padding: 5,
    marginLeft: p(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFilterImage: {
    resizeMode: "contain",
    height: hp('5%'),
    width: wp('7%')
  },
  searchbar: {
    borderRadius: 30,
    height: hp('5%'),
    width: wp('60%'),
    backgroundColor: '#DFDEDE'
  },
  searchbarText: {
    textAlign: 'center',
    fontFamily: 'GeosansLight',
    fontSize: p(16),
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
  },
  headerImg: {
    marginLeft: p(17),
    width: p(40),
    height: p(40)
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: p(30)
  },
  text: {
    fontFamily: 'GeosansLight',
    fontSize: p(13),
  },
  input: {
    height: hp('4%'),
    backgroundColor: 'rgba(236, 240, 241,0.6)',
    marginBottom: 10,
    color: 'rgba(44, 62, 80,0.9)',
    fontSize: p(14),
    fontFamily: 'GeosansLight',
    paddingHorizontal: 10,
    borderRadius: 20
  },
  textHeader: {
    fontFamily: 'GeosansLight',
    fontSize: p(22),
    marginTop: p(-8),
    marginBottom: p(8),
    alignSelf: 'center',
    textAlign: 'center'
  }
})
