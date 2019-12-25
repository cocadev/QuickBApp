import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { p } from './normalize';
import StarRating from 'react-native-star-rating';
import * as ICON from './Icons'

export const Likes = props => {
  count = props.count % 2;
  return (
    <TouchableOpacity
      style={[styles.likesContainer,
      (count == 1 && { borderColor: '#00AEEF' })
      ]}
      onPress={props.onClick}
    >
      <Image style={styles.img} source={{ uri: props.item.img }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.h1}>{props.item.name}</Text>
            <Text style={styles.h2}>{props.item.service}</Text>
          </View>
          <View style={{ width: p(100), flexDirection: 'row', alignItems: 'center' }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={parseFloat(5)}
              fullStarColor={'gold'}
              starSize={p(15)}
              starStyle={styles.start}
            />
            <Text style={styles.h3}>({props.item.rating})</Text>
          </View>
        </View>
        <Image source={{ uri: props.item.avatar }} style={styles.avatar} />

      </View>
    </TouchableOpacity>
  )
}

export const ProductosItem = props => {
  count = props.count % 2;
  return (
    <TouchableOpacity
      style={[styles.likesContainer,
      (count == 1 && { borderColor: '#00AEEF' })
      ]}
      onPress={props.onClick}
    >
      <Image style={styles.img} source={{ uri: props.item.img }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.h1}>{props.item.name}</Text>
            <Text style={styles.h2}>{props.item.service}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Mis = props => {
  return (
    <View
      style={styles.misContainer}
      // onPress={props.onClick}
    >
      <Image style={styles.img} source={{ uri: props.item.img }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.h1}>{props.item.name}</Text>
            <Text style={styles.h2}>{props.item.address}</Text>
            <Text style={styles.h2}>{props.item.phone}</Text>
          </View>
          <View style={{ width: p(100), flexDirection: 'row', alignItems: 'center' }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={parseFloat(5)}
              fullStarColor={'gold'}
              starSize={p(15)}
              starStyle={styles.start}
            />
            <Text style={styles.h3}>({props.item.rating})</Text>
          </View>
        </View>
        {
          !props.disable &&
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <TouchableOpacity onPress={props.onEdit}>
              <ICON.Pencil left={p(12)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onDelete}>
              <ICON.Delete left={p(12)} />
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )
}

export const Comentarios = props => {
  return (
    <TouchableOpacity
      style={[styles.misContainer, { height: p(60), marginHorizontal: p(12) }]}
      onPress={props.onClick}
    >
      <Image style={styles.img} source={{ uri: props.item.img }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ justifyContent: 'space-between', height: p(50) }}>
          <View>
            <Text style={styles.h1}>{props.item.name}</Text>
            <Text style={styles.h2}>{props.item.address}</Text>
          </View>
          <View style={{ width: p(60), flexDirection: 'row', alignItems: 'center' }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={parseFloat(5)}
              fullStarColor={'gold'}
              starSize={p(11)}
              starStyle={styles.start}
            />
          </View>
        </View>

      </View>

      <View style={{ alignItems: 'center', width: p(40) }}>
        <ICON.Trash left={p(12)} />
      </View>

    </TouchableOpacity>
  )
}

export const FavoritosItem = props => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row' }}
      onPress={props.onClick}
    >
      <View style={[styles.misContainer, { height: p(60), marginHorizontal: p(12), flex: 1 }]}>
        <Image style={styles.img3} source={{ uri: props.item.logo }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
          <View style={{ justifyContent: 'space-between', height: p(50) }}>
            <View style={{ marginLeft: p(5) }}>
              <Text style={styles.h1} numberOfLines={1}>{props.item.nombreNegocio}</Text>
              <Text style={styles.h2} numberOfLines={1}>{props.item.direccion}</Text>
            </View>
            <View style={{ width: p(60), flexDirection: 'row', alignItems: 'center', marginLeft: p(5) }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={parseFloat(props.item.rating)}
                fullStarColor={'gold'}
                starSize={p(11)}
                starStyle={styles.start}
              />
            </View>
          </View>

        </View>
      </View>

      <View style={{ width: p(90), alignItems: 'center', flexDirection: 'row' }}>
        <ICON.Share left={p(12)} />
        <ICON.Trash left={p(12)} />
      </View>

    </TouchableOpacity>
  )
}



export const MISComentariosItem = props => {
  full = props.item.full;
  return (
    <View
      style={[styles.misContainer, { backgroundColor: props.color }, { height: p(60), marginHorizontal: p(4), borderColor: props.color, }]}
      onPress={props.onClick}
    >
      <Image style={styles.img} source={{ uri: props.item.imagen }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <Text style={[styles.h4, full && { color: '#fff' }]}>{props.item.nameCategory}</Text>
      </View>

    </View>
  )
}

export const VisaCard = props => {
  return (
    <TouchableOpacity
      style={styles.misContainer}
      onPress={props.onClick}
    >
      <ICON.logoVisa />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={styles.h1}>{'********2115'}</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <ICON.Pencil left={p(12)} />
          <ICON.Delete left={p(12)} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Messages = props => {
  const read = props.item.read
  return (
    <TouchableOpacity
      style={[styles.msgContainer,
      (read && { backgroundColor: '#E6E7E9' })
      ]}
      onPress={props.onClick}
    >
      <Image source={{ uri: props.item.avatar }} style={styles.avatar} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginLeft: p(12) }}>
        <View style={{ justifyContent: 'space-between', height: p(55) }}>
          <View>
            <Text style={styles.h11}>{props.item.name}</Text>
            <Text style={styles.h12}>{props.item.msg}</Text>
          </View>
          <Text style={styles.h13}>Hace{props.item.time}</Text>
        </View>
      </View>
      <ICON.Delete right={p(12)} />
    </TouchableOpacity>
  )
}

export const NotificacionesItem = props => {
  return (
    <TouchableOpacity
      style={[styles.misContainer, { height: p(60), marginTop: p(8), borderColor: props.item.color, marginHorizontal: p(5), borderTopWidth: p(5) }]}
    >
      <Image style={styles.img2} source={{ uri: props.item.avatar }} />
      <View style={{ justifyContent: 'space-between', flex: 5, marginLeft: p(12) }}>
        <Text style={styles.h2}>{props.item.name}</Text>
        <Text style={styles.h3}>{props.item.address}</Text>
        <Text style={styles.h3}>{props.item.title}</Text>
      </View>
      <View style={{ justifyContent: 'space-between', flex: 4 }}>
        <Text style={styles.h6}>{props.item.note}</Text>
        <Text style={styles.h14}>{props.item.time}</Text>
      </View>

    </TouchableOpacity>
  )
}

export const RecientesItem = props => {
  return (
    <TouchableOpacity
      style={[styles.misContainer, { height: p(60), marginTop: p(8), borderColor: props.item.color, marginHorizontal: p(5), borderTopWidth: p(5) }]}
    >
      <Image style={styles.img2} source={{ uri: props.item.avatar }} />
      <View style={{ justifyContent: 'space-between', flex: 5, marginLeft: p(12) }}>
        <Text style={styles.h2}>{props.item.name}</Text>
        <Text style={styles.h3}>{props.item.address}</Text>
        <Text style={styles.h3}>{props.item.title}</Text>
        <View style={{ width: p(60), flexDirection: 'row', alignItems: 'center' }}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={parseFloat(5)}
            fullStarColor={'gold'}
            starSize={p(11)}
            starStyle={styles.start}
          />
        </View>
      </View>
      <View style={{ justifyContent: 'space-between', flex: 4 }}>
        <Text style={styles.h6}>{props.item.note}</Text>
        <Text style={styles.h14}>{props.item.time}</Text>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  likesContainer: {
    paddingHorizontal: p(12),
    paddingVertical: p(6),
    borderRadius: p(12),
    marginHorizontal: p(3),
    marginVertical: p(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f26d03',
    borderWidth: p(4)
  },
  misContainer: {
    paddingHorizontal: p(12),
    paddingVertical: p(6),
    borderRadius: p(12),
    marginHorizontal: p(2),
    marginVertical: p(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#797979',
    borderWidth: 1
  },
  msgContainer: {
    paddingHorizontal: p(12),
    paddingVertical: p(6),
    borderRadius: p(6),
    marginHorizontal: p(2),
    marginVertical: p(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E6E7E9',
    borderWidth: 1
  },
  avatar: {
    width: p(60),
    height: p(60),
    borderRadius: p(30)
  },
  img: {
    width: p(72),
    height: p(45),
    resizeMode: 'contain'
  },
  img2: {
    width: p(72),
    height: p(50),
    resizeMode: 'contain'
  },
  img3: {
    width: p(65),
    height: p(50),
    resizeMode: 'contain'
  },
  h1: {
    fontSize: p(14),
    fontFamily: 'GeosansLight'
  },
  h2: {
    fontSize: p(11),
    fontFamily: 'GeosansLight'
  },
  h3: {
    fontSize: p(10),
    fontFamily: 'GeosansLight'
  },
  h4: {
    fontSize: p(22),
    fontFamily: 'GeosansLight',
    marginLeft: p(12)
  },
  h6: {
    fontSize: p(13),
    fontFamily: 'GeosansLight',
    textAlign: 'center'
  },
  h11: {
    fontSize: p(15),
    fontFamily: 'Caviar_Dreams_Bold'
  },
  h12: {
    fontSize: p(10),
    fontFamily: 'CaviarDreams'
  },
  h13: {
    fontSize: p(10),
    fontFamily: 'CaviarDreams'
  },
  h14: {
    fontSize: p(14),
    fontFamily: 'CaviarDreams'
  },
  icon: {
    width: p(20),
    height: p(20)
  },
  start: {
    paddingRight: 5
  },
});
