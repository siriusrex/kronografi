/*
Kronografi top navigation bar component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, Text, Alert, Button, Image} from 'react-native';

export default class BottomNav extends Component {
  render() {
    return (
      <View style={{height: 50, backgroundColor: 'rgba(255, 255, 255, 0.05)', flexDirection:'row'}}>

          <Image style={{width: 35, height: 35, margin: 7}} source={require('./img/favicon.png')}/>
          <Image style={{width: 35, height: 35, margin: 7}} source={require('./img/threeLines.png')}/>

      </View>

    )

  }
}
