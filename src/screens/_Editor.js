
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import { Header } from '../components/Headers'
import { SearchBar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { p } from '../components/normalize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Images from '../constants/Images';

const ProfileItem = props => (
  <View style={styles.item}>
    <View style={{ flex: 1 }}>
      <Text style={styles.h1}>{props.name}</Text>
    </View>
    <View style={{ width: p(50) }}>
      <Text style={styles.note}>Cantidad</Text>
      <MaterialCommunityIcons name={'square'} size={p(30)} color={'#D1D2D4'} style={{ marginTop: -10 }} />
    </View>
    <MaterialCommunityIcons name={'close'} size={p(30)} color={'#6D6E71'} />
  </View>
)

export default class _Editor extends Component {

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
            <View style={styles.searchContainer}>
              <View style={styles.searchBarContainer}>
                <SearchBar
                  lightTheme
                  placeholder="Buscar"
                  onChangeText={this.handleSearch}
                  value={search}
                  searchIcon={false}
                  onSubmitEditing={() => this._search()}
                  inputContainerStyle={styles.searchbar}
                  inputStyle={styles.searchbarText}
                  containerStyle={styles.containerStyle}

                />
                <TouchableOpacity style={styles.searchButton} onPress={() => this._search()}>
                  <Image
                    source={Images.search}
                    fadeDuration={0}
                    style={styles.searchFilterImage}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.filterContainer} onPress={() => this._filter()}>
                <Image
                  source={Images.filter}
                  fadeDuration={0}
                  style={styles.searchFilterImage}
                />
              </TouchableOpacity>
            </View>

            <ProfileItem name={'Tornillos'} />
            <ProfileItem name={'Hamburguesas'} />

            <View style={[styles.item, { justifyContent: 'center', borderBottomColor: '#fafafa', borderBottomWidth: p(3) }]}>
              <Text style={styles.h1}>Editar</Text>
            </View>

            <View style={styles.circleView}>
              <TouchableOpacity 
                style={styles.circle}
                onPress={()=>this.props.navigation.navigate('productScreen')}
              >
                <MaterialCommunityIcons name={'plus'} size={p(30)} color={'#111'} />
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
    paddingHorizontal: 15,
    // borderLeftWidth: 1,
    // borderLeftColor: '#AAAAAA'
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

  item: {
    flexDirection: 'row',
    borderTopColor: '#fafafa',
    borderTopWidth: p(3),
    alignItems: 'center',
    height: p(50),
    paddingHorizontal: p(26)
  },
  note: {
    fontFamily: 'GeosansLight',
    fontSize: p(8),
    color: '#D1D2D4',
  },
  h1: {
    fontFamily: 'GeosansLight',
    fontSize: p(18),
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
  }
})
