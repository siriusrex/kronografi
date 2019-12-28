/*
Kronografi middle viewport component

*/
import React, { Component } from 'react';
import {View, ScrollView, Text} from 'react-native';
import TimeLine from './TimeLine';
import TimeRuler from './TimeRuler';

export default class TimeScope extends Component {
  constructor(props){
    super(props);
    this.state={
      timeLineTitlesOpacity: this.props.timeLineTitlesOpacity,
      pinchStarted: false,
      initialPinchGap: 0,
      currentPinchGap:300,
      scopeWidth: this.props.scopeWidth
    };
  }







  render() {
    return (

        <View  style={{flex: 1}}>
            <TimeRuler scopeSpan={this.props.scopeSpan} scopeWidth={this.state.scopeWidth}/>
            <ScrollView horizontal={false} onScroll={this.props.updateDummyTitleScroll} scrollEventThrottle={16} >

            { this.props.timeLineArray.map((item, key)=>(

            <TimeLine key={key} title={item.title}  start={item.start} timeSpans={item.timeSpans} scopeSpan={this.props.scopeSpan} scopeWidth={this.state.scopeWidth} titlesMargin={this.props.titlesMargin} timeLineTitlesOpacity={this.props.timeLineTitlesOpacity}/>
           )

         )}
            </ScrollView>



        </View>

    )

  }
}
