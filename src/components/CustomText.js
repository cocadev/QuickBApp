/**
 * @file CustomText.js
 * @description This file the configuration for use custom fonts bringing the new Text label.
 * @author Fernando Mondragón
 * @date 18 MAY 2019
 * @version v1.1
 */
import React, { Component } from 'react';
import { Text } from 'react-native';

/**
 * @class CustomText()
 * @description This class add the news fonts.
 * @constructor
 * @extends Component
 */
class CustomText extends Component {
    setFontType = (type) => {
        switch(type){
            case 'Caviar_Dreams_Bold':
                return 'Caviar_Dreams_Bold'
            case 'CaviarDreams_BoldItalic':
                return 'CaviarDreams_BoldItalic'
            case 'CaviarDreams_Italic':
                return 'CaviarDreams_Italic'
            case 'CaviarDreams':
                return 'CaviarDreams'
            case 'GeosansLight-Oblique':
                return 'GeosansLight-Oblique'
            case 'GeosansLight':
                return 'GeosansLight'
            case 'gothamblack':
                return 'gothamblack'
            case 'gothamblackitalic':
                return 'gothamblackitalic'
            case 'gothambold2':
                return 'gothambold2'
            case 'gothambolditalic2':
                return 'gothambolditalic2'
            case 'gothambook2':
                return 'gothambook2'
            case 'gothambookitalic2':
                return 'gothambookitalic2'
            case 'GothamLightItalic':
                return 'GothamLightItalic'
            case 'gothammedium2':
                return 'gothammedium2'
            case 'gothammediumitalic':
                return 'gothammediumitalic'
            default:
                return 'sans-serif-light'
        }
    }

    render() {
        const font = this.setFontType(this.props.type ? this.props.type : 'normal');
        const style = [{ fontFamily: font }, this.props.style || {}];
        const allProps = Object.assign({}, this.props, {style:style})
        return (
            <Text {...allProps}>{this.props.children}</Text>
        );
    }
}

 /**
 * @description Export the class for than we can use in other side.
 * @export {Class}
 */
export default CustomText;