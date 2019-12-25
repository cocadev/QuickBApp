
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image, Text } from 'react-native';
import { Header } from '../components/Headers'
import { SearchBar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../constants/Images';
import { p } from '../components/normalize';
import { Likes } from '../components/listItems';

export default class _Likes extends Component {
  
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
      <Likes item={item} count={index} onClick={()=>console.log('hey')} />
    )
  }

  handleSearch = (text) => {
    if (!text || text === '' || text === null){
      clearTimeout(this.timer);
      this.setState({ search: text });
      this.timer = setTimeout(() => this.handleRefresh(), WAIT_INTERVAL);
      return 
    }
    this.setState({ search: text });
  }

  render() {
    const { search } = this.state;

      return (
        <View style={styles.container}>

          <Header 
            title={'Likes'}
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
                  // onSubmitEditing={() => this._search()}
                  inputContainerStyle={styles.searchbar}
                  inputStyle={styles.searchbarText}
                  containerStyle={styles.containerStyle}

                />
                <TouchableOpacity style={styles.searchButton} >
                  <Image
                    source={Images.search}
                    fadeDuration={0}
                    style={styles.searchFilterImage}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.filterContainer} >
                <Image
                  source={Images.filter}
                  fadeDuration={0}
                  style={styles.searchFilterImage}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.hoy}>Hoy</Text>

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

const FILTERDATA = [
  { 
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png', 
    avatar: 'https://image.shutterstock.com/image-photo/picture-confused-young-man-dressed-260nw-553535785.jpg', 
    name: 'Luis Garcia', 
    service: 'Excelente servicio', 
    rating: 20
  },
  { 
    img: 'https://www.freepnglogos.com/uploads/eagle-png-logo/morehead-state-eagle-png-logo-8.png', 
    avatar: 'https://pixel.nymag.com/imgs/fashion/daily/2019/03/12/11-elizabeth-holmes-2.w700.h700.jpg', 
    name: 'Laura López', 
    service: 'Las bebidas no estaban frías', 
    rating: 15
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    paddingHorizontal: p(22),
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
    borderLeftWidth: 1,
    borderLeftColor: '#AAAAAA'
  },
  searchButton: {
    padding: 5,
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
    width: wp('55%'),
    backgroundColor: '#DFDEDE'
  },
  searchbarText: {
    textAlign: 'center',
    fontFamily: 'GeosansLight',
    fontSize: p(16),
  },
})
