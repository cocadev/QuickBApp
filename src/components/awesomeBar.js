
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { p } from './normalize';
import Images from '../constants/Images';

export default class AwesomeBar extends Component {

  render() {

    const check = this.props.check

    return (
      <View style={{ flexDirection: 'row', marginBottom: p(60) }}>

        <View style={[styles.talkBubble, { marginTop: p(25), left: p(1) }]}>
          <View style={[styles.talkBubbleSquare, { backgroundColor: '#fff', width: p(350), }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(350), borderColor: '#fff' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25) }]}>
          <View style={[styles.talkBubbleSquare, { width: p(350), }, check == 4 ? { backgroundColor: '#A7CE38' } : { backgroundColor: '#939598' }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(350) }, check == 4 ? { borderColor: '#A7CE38' } : { borderColor: '#939598' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25), left: p(1) }]}>
          <View style={[styles.talkBubbleSquare, { backgroundColor: '#fff', width: p(281), }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(281), borderColor: '#fff' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25), left: p(1) }]}>
          <View style={[styles.talkBubbleSquare, { width: p(280), }, check == 3 ? { backgroundColor: '#A7CE38' } : { backgroundColor: '#939598' }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(280) }, check == 3 ? { borderColor: '#A7CE38' } : { borderColor: '#939598' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25), left: p(1.5) }]}>
          <View style={[styles.talkBubbleSquare, { backgroundColor: '#fff', width: p(211.5), }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(211.5), borderColor: '#fff' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25) }]}>
          <View style={[styles.talkBubbleSquare, { width: p(210), }, check == 2 ? { backgroundColor: '#A7CE38' } : { backgroundColor: '#939598' }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(210) }, check == 2 ? { borderColor: '#A7CE38' } : { borderColor: '#939598' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25), left: p(1) }]}>
          <View style={[styles.talkBubbleSquare, { backgroundColor: '#fff', width: p(141.5), }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(141.5), borderColor: '#fff' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25) }]}>
          <View style={[styles.talkBubbleSquare, { width: p(140), }, check == 1 ? { backgroundColor: '#A7CE38' } : { backgroundColor: '#939598' }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(140) }, check == 1 ? { borderColor: '#A7CE38' } : { borderColor: '#939598' }]} />
        </View>

        <View style={[styles.talkBubble, { marginTop: p(25), left: p(1.5) }]}>
          <View style={[styles.talkBubbleSquare, { backgroundColor: '#fff', width: p(71.5), }]} />
          <View style={[styles.talkBubbleTriangle, { left: p(71.5), borderColor: '#fff' }]} />
        </View>

        <View style={styles.talkBubble}>
          <View style={[styles.talkBubbleSquare, check && { backgroundColor: '#939598' }]} />
          <View style={[styles.talkBubbleTriangle, check && { borderColor: '#939598' }]} />
        </View>

        <Text style={styles.text}>1</Text>
        <Text style={[styles.text, { left: p(110) }]}>2</Text>
        <Text style={[styles.text, { left: p(180) }]}>3</Text>
        <Text style={[styles.text, { left: p(250) }]}>4</Text>
        <Text style={[styles.text, { left: p(320) }]}>5</Text>

        { check >= 1 && <Image source={Images.ok} style={styles.img} />}
        { check >= 2 &&<Image source={Images.ok} style={[styles.img, { left: p(108)}]} />}
        { check >= 3 &&<Image source={Images.ok} style={[styles.img, { left: p(177)}]} />}
        { check == 4 &&<Image source={Images.ok} style={[styles.img, { left: p(248)}]} />}

      </View>
    )

  }
}

const styles = StyleSheet.create({
  talkBubble: {
    marginTop: p(25),
    position: 'absolute'
  },
  talkBubbleSquare: {
    width: p(70),
    height: p(37),
    backgroundColor: '#A7CE38',
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: p(70),
    top: 0,
    borderTopColor: 'transparent',
    borderTopWidth: p(20),
    borderLeftWidth: p(20),
    borderLeftColor: '#A7CE38',
    borderBottomWidth: p(20),
    borderBottomColor: 'transparent',
  },
  text: {
    position: 'absolute',
    fontFamily: 'CaviarDreams',
    fontSize: p(26),
    color: '#fff',
    top: p(29),
    left: p(40)
  },
  img: {
    position: 'absolute',
    width: p(30),
    height: p(30),
    left: p(37)
  }

})
