
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Header } from '../components/Headers'
import { p } from '../components/normalize';
import Images from '../constants/Images';
import * as ImagePicker from 'expo-image-picker';

const imageURL = 'https://garufasteakhouse.com/wp-content/uploads/2018/06/logo-garufa.jpg'

export default class _FotodePerfil extends Component {

  static navigationOptions = () => ({
    header: null
  });

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        //  let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: response.uri,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={'Foto de Perfil'}
          right={(
            <View style={styles.rightHeader}>
              <Image source={Images.ok} style={styles.headerImg} />
            </View>
          )}
          onBack={() => this.props.navigation.pop()}
        />
        <View style={styles.view}>
          <View style={styles.pan}>
            <TouchableOpacity onPress={() => this.chooseFile()} style={styles.board}>
              <Image source={{ uri: imageURL }} style={{ width: p(150), height: p(90) }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    paddingTop: p(50),
    justifyContent: 'center',
    alignItems: 'center'
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
  board: {
    width: p(180),
    height: p(180),
    backgroundColor: '#fff',
    borderRadius: p(120),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: p(2),
    borderColor: '#e9eaeb'
  },
  pan: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#e6e7e9',
    width: p(240),
    height: p(240),
    justifyContent: 'center',
    alignItems: 'center'
  }

})
