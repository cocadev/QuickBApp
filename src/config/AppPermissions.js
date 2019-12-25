/**
 * @file AppPermissions.js
 * @description This file contain all the permissions than we need of the phone.
 * @author Fernando Mondragón
 * @date 18 JUN 2019
 * @version v1.1
 */
import * as Permissions from 'expo-permissions';
import { Alert, Linking } from 'react-native';

/**
 * @description Export the permissions
 * @export {Object}
 */
export const AppPermissions = {
    cameraRoll,
    location
};

/**
 * @function cameraRoll()
 * @description This function return us the permission of the camera and photo.
 * @param {NULL}
 * @return {Object} 
 */
function cameraRoll() {
    return hasPermission(Permissions.CAMERA_ROLL);
}

/**
 * @function location()
 * @description This function return us the permission of the camera and photo.
 * @param {NULL}
 * @return {Object} 
 */
function location() {
  return hasPermission(Permissions.LOCATION);
}

/**
 * @function showSettingsAlert()
 * @description This function show the alert when we need some persmission.
 * @param {NULL} 
 * @return {Object} 
 */
function showSettingsAlert() {
    if(isAlertPresented) { return }
    isAlertPresented = true;
  
    Alert.alert(
      'Permiso',
      'Este permiso es necesario para continuar, ¿Quiere modificar las configuraciones?',
      [
        {text: 'Ir a configuración', onPress: () => {
          isAlertPresented = false;
          Linking.openURL("app-settings:");
        }},
        {text: 'No', onPress: () => { isAlertPresented = false; }, style: 'cancel'}
      ],
      { cancelable: false }
    )
}

/**
 * @function hasPermission()
 * @description This function ask the permission with the askAsync propiertie.
 * @param {*} permissionType
 * @return {Object} 
 */
async function hasPermission(permissionType) {
    const { status: existingStatus } = await Permissions.askAsync(permissionType);

    let finalStatus = existingStatus;
    if(existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(permissionType);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      showSettingsAlert();
      return false;
    } 
    return true;
}