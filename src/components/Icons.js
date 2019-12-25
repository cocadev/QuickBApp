import React from 'react'
import { TouchableOpacity, Image } from 'react-native';
import { p } from './normalize';
import Images from '../constants/Images';


export const Pencil = props => (
  <Image source={Images.lapiz} style={{ width: p(22), height: p(22), marginRight: props.right, marginLeft: props.left }} />
)

export const Delete = props => (
  <Image source={Images.trash} style={{ width: p(22), height: p(22), marginLeft: props.left }} />
)

export const Trash = props => (
  <Image source={Images.trash} style={{ width: p(22), height: p(22), marginLeft: props.left }} />
)

export const Share = props => (
  <Image source={Images.share} style={{ width: p(22), height: p(22), marginLeft: props.left }} />
)

export const TarjetaCredito = props => (
  <Image source={Images.tarjetaCredito} style={{ width: p(26), height: p(26), marginHorizontal: p(12) }} />
)

export const MonosEsos = props => (
  <Image source={Images.monosEsos} style={{ width: p(26), height: p(26), marginHorizontal: p(12) }} />
)

export const logoVisa = props => (
  <Image source={Images.logoVisa} style={{ width: p(60), height: p(50), marginHorizontal: p(12) }} />
)

export const NextBtn = props => (
  <TouchableOpacity 
    onPress={props.onClick}
    style={{ height: p(70), justifyContent: 'center', alignItems: 'flex-end', marginRight: p(20) }}
  >
    <Image
      source={Images.right}
      style={{ width: p(30), height: p(30) }}
    />
  </TouchableOpacity>
)

export const PrevBtn = props => (
  <TouchableOpacity 
    onPress={props.onClick}
    style={{ height: p(70), justifyContent: 'center', alignItems: 'flex-end', marginLeft: p(20) }}
  >
    <Image
      source={Images.left}
      style={{ width: p(30), height: p(30) }}
    />
  </TouchableOpacity>
)

