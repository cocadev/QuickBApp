
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { Header } from '../components/Headers'

import { p } from '../components/normalize';
import { MaterialCommunityIcons, EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import Images from '../constants/Images';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CarouselImages = [
  { image: 'https://www.michiganwines.com/cms/media/media_display.php?id=3594&path=/images/Home/outdoor.jpg' },
  { image: 'https://img.etimg.com/thumb/msid-62770289,width-643,imgsize-24537,resizemode-4/heres-why-drinking-red-wine-is-the-best-way-to-keep-your-heart-healthy.jpg' },
  { image: 'https://www.nzwine.com/media/3723/sb-day-wine-marlborough.jpg' }
]

export default class _Vistaprevia extends Component {

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

  _renderItem({ item }) {
    return (
      <View style={styles.carouselImagesView}>
        <ImageBackground style={styles.carouselImage} source={{ uri: item.image }} />
      </View>
    )
  }

  get pagination() {
    var { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={CarouselImages.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationCarouselContainer}
        dotStyle={styles.pointsPagiation}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

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
            <Carousel
              data={CarouselImages}
              sliderWidth={wp('100%')}
              itemWidth={wp('100%')}
              separatorWidth={0}
              pagingEnable={true}
              renderItem={this._renderItem}
              // keyExtractor={item => item.numImage.toString()}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
            />
            {this.pagination}


          </View>

          <View style={styles.item}>
            <Text style={styles.h1}>Garufa</Text>
          </View>

          <Text style={styles.h2}>2x1 Viernes de Embotellamiento</Text>

          <View style={styles.board}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.h3}>Botellas 2x1</Text>
                  <Text style={styles.h3}>Vigencia</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.h3}>*Aplican Restricciones</Text>
                  <Text style={styles.h3}>25 Feb- 28 Mar</Text>
              </View>
          </View>

          <View style={styles.btn}>
            <Text style={styles.btnText}>Enviar</Text>
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
    fontSize: p(24),
  },
  h2: {
    fontFamily: 'GeosansLight',
    fontSize: p(14),
    margin: p(10),
    marginLeft: p(25)
  },
  h3: {
    fontFamily: 'Caviar_Dreams_Bold',
    color: '#fff',
    fontSize: p(12),
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
  carouselImagesView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselImage: {
    resizeMode: 'contain',
    width: wp('100%'),
    height: p(150)
  },
  paginationCarouselContainer: {
    position: 'absolute',
    left: p(-300),
    right: 0,
    bottom: 0,
    bottom: 0
  },
  pointsPagiation: {
    width: p(10),
    height: p(10),
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.92)'
  },
  btn: {
    width: p(190),
    height: p(30),
    alignSelf: 'center',
    backgroundColor: '#e6e7e9',
    borderRadius: p(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: p(20)
  },
  btnText: {
    fontSize: p(18),
    fontFamily: 'GeosansLight',
  },
  item: {
    paddingHorizontal: p(26),
    paddingVertical: p(10),
    borderTopColor: '#fafafa',
    borderBottomColor: '#fafafa',
    borderTopWidth: p(4),
    borderBottomWidth: p(4)
  },
  board: {
    flex: 1, 
    backgroundColor: '#111',
    paddingHorizontal: p(26),
    paddingVertical: p(10),
  }
})
