/*
Kronografi Time Ruler Segment component

*/
import React, { Component } from 'react';
import { AppRegistry,  View, ScrollView, Text, StyleSheet} from 'react-native';




export default class TimeRulerSegment extends Component {
  render() {
    return (
      <View style={{width: this.props.width, height: 30, borderRightWidth: 1, borderRightColor: '#fff' }}>
        <View style={{width: this.props.width/2, height: 15, borderRightWidth: 1, borderRightColor: '#fff'}}/>
      <Text style={styles.timeRulerText}>{this.props.id}</Text>
      </View>

    )

  }
}

const styles = StyleSheet.create({


  timeRulerText:{
    fontFamily: 'Futura',
    color: '#fff',
    marginTop:20,
    marginLeft: -18,
    width: 35,

    textAlign: 'center',
  }

});
