/*
Kronografi middle viewport component

*/
import React, { Component } from 'react';
import {View, ScrollView, Text, PanResponder} from 'react-native';
import TimeLine from './TimeLine';
import TimeRuler from './TimeRuler';

export default class TimeScope extends Component {
  constructor(props){
    super(props);
    this.state={
      timeLineTitlesOpacity: this.props.timeLineTitlesOpacity,


    };
  }








  render() {
    return (

        <View  style={{position:'relative', flex: 1}}>

            <TimeRuler
              scopeSpan={this.props.scopeSpan}
              scopeWidth={this.props.scopeWidth}
              pixelUnit={this.props.pixelUnit}
            />

            <ScrollView
              name={'timelines'}
              horizontal={false}
              scrollEventThrottle={16}
              onScroll={e => {

                  var scrollY = e.nativeEvent.contentOffset.y;
                  this.props.scrollTitlesTo({ y: scrollY });
                }

              }
              >

            { this.props.timeLineArray.map((item, key)=>(

            <TimeLine
              key={key}
              title={item.title}
              start={item.start}
              timeSpans={item.timeSpans}
              scopeSpan={this.props.scopeSpan}
              scopeWidth={this.props.scopeWidth}
              pixelUnit={this.props.pixelUnit}
              titlesMargin={this.props.titlesMargin}
              
              timeLineTitlesOpacity={this.props.timeLineTitlesOpacity}
            />
            )

            )}
            </ScrollView>




        </View>

    )

  }
}
