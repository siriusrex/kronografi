
import React, { Component } from 'react';
import {Image} from 'react-native';

export default class CustomImage extends Component {

 constructor(props) {
  super(props);
 }
 render() {
    return (
        <Image source={this.props.imageName} resizeMode="contain" style={{opacity: this.props.opacity, marginLeft: this.props.startErrorBarWidth+10, marginTop: 50, width: 90, height: 90}} />
     );
  }
   }
