import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Images from '../constants/Images';
import { p } from './normalize';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const Header = props => {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', paddingHorizontal: p(15) }}>
        <View style={{ flexDirection: 'row', flex: 1, paddingTop: 12, }}>
          <TouchableOpacity style={styles.leftHeader} onPress={props.onBack}>
            <Image
              source={Images.left}
              fadeDuration={0}
              style={styles.imageBack}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center' }}>
            <Text style={ props.title == 'Subcategoría' ? styles.text2 : styles.text}>{props.title}</Text>
          </View>
        </View>
        {props.right}
      </View>
      <View style={[styles.footer, props.color && { backgroundColor: props.color}]}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: hp('20%'),
    marginBottom: p(20)
  },
  imageBack: {
    resizeMode: "contain",
    height: p(30),
    width: p(30)
  },
  leftHeader: {
    paddingVertical: p(30),
    marginLeft: p(5)
  },
  text: {
    fontFamily: 'CaviarDreams',
    fontSize: Platform.OS === 'ios' ? hp('4%') : hp('7%'),
    paddingLeft: 15
  },
  text2: {
    fontFamily: 'CaviarDreams',
    fontSize: Platform.OS === 'ios' ? hp('3%') : hp('6%'),
    paddingLeft: 15
  },
  
  footer: {
    backgroundColor: '#000',
    borderBottomWidth: hp('5%'),
    borderBottomColor: '#000',
    elevation: 0,
    shadowOpacity: 0,
    height: hp('5%'),
  }
});
