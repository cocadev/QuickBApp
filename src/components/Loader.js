/**
 * @file Loader.js
 * @description This file contain the loader action when render some component.
 * @author Fernando Mondragón
 * @date 24 JUN 2019
 * @version v1.1
 */
import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ViewPropTypes
} from 'react-native';

/**
 * @proyect QuickB
 * @const  {*} Loader
 */
const Loader = (props) => {
  const { visible, containerStyle } = props;

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator
        size="large"
        animating={visible}
      />
    </View>
  );
};

Loader.ViewPropTypes = {
  containerStyle: ViewPropTypes.style,
  visible: ViewPropTypes.bool,
};

/**
 * @proyect QuickB
 * @const  {*} styles
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

/**
 * @description Export the Loader action.
 * @export {Class}
 */
export default Loader;