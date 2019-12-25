
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import { Header } from '../components/Headers'
import { SearchBar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../constants/Images';
import { p } from '../components/normalize';
import { Messages } from '../components/listItems';

export default class _Mensajes extends Component {
  
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

  _renderItem({ item, index }) {
    return (
      <Messages item={item} onClick={()=>console.log('hey')} />
    )
  }

  render() {
    const { loading, search } = this.state;

    if (!loading) {
      return (
        <View style={styles.container}>
          <Header 
            title={'Mensajes'}
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
            </View>

            <FlatList
              data={FILTERDATA}
              keyExtractor={(item, i) => String(i)}
              renderItem={this._renderItem}
            />

          </View>
        </View>

      )

    }
  }
}

const FILTERDATA = [
  { 
    avatar: 'https://www.hopkinsmedicine.org/sebin/t/e/NEWSOME-scott-640X440.jpg', 
    name: 'Luis Garcia', 
    msg: '¿Me podrían decir si facturan por consumo o por concepto?', 
    time: '10hrs.',
    read: true
  },
  { 
    avatar: 'https://pixel.nymag.com/imgs/fashion/daily/2019/03/12/11-elizabeth-holmes-2.w700.h700.jpg', 
    name: 'Melisa López', 
    msg: 'Me puedes hacer una reservación', 
    time: '23hrs.',
    read: true
  },
  { 
    avatar: 'https://previews.123rf.com/images/jemastock/jemastock1608/jemastock160802330/62292703-boy-anime-male-manga-cartoon-comic-icon-colorfull-and-isolated-illustration-vector-graphic.jpg', 
    name: 'María Mendez', 
    msg: 'Tienen música en vivo', 
    time: '1 día'
  },
  { 
    avatar: 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2018/10/340/340/35925253_10156401755146530_5216436582143229952_n.jpg', 
    name: 'Juan Campos', 
    msg: 'Se puede fumar en el establecimiento', 
    time: '2 días'
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    // paddingHorizontal: p(22),
    justifyContent: 'flex-start',
  },
  hoy: {
    fontFamily: 'GeosansLight',
    fontSize: p(22),
    alignSelf: 'flex-end',
    marginTop: p(15),
    marginRight: p(22)
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: p(12)
  },
  searchBarContainer: {
    marginHorizontal: p(22),
    flex: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: p(300),
    padding: 0,
    borderRadius: 30,
  },
  filterContainer: {
    flex: 2,
    width: p(300),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#AAAAAA'
  },
  searchButton: {
    padding: 5,
    marginLeft: p(12),
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
    width: p(300),
    backgroundColor: '#DFDEDE'
  },
  searchbarText: {
    textAlign: 'center',
    fontFamily: 'GeosansLight',
    fontSize: p(16),
  },
})
