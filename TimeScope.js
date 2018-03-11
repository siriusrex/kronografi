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
      pinchStarted: false,
      initialPinchGap: 0,
      currentPinchGap:300,
      scopeWidth: this.props.scopeWidth
    };
  }


  componentWillMount() {

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderGrant: this.handlePanResponderGrant.bind(this)
    });
  }

  handlePanResponderGrant(evt: Object, gestureState: Object){
    console.log('handlePanResponderGrant');


  }

  handlePanResponderMove(evt: Object, gestureState: Object){
    console.log('handlePanResponderMove');

    if (evt.nativeEvent.touches.length>1){
      var touch1X:Number=parseFloat(evt.nativeEvent.touches[1].locationX);
      var touch0X:Number=parseFloat(evt.nativeEvent.touches[0].locationX);
      var pinchGap:Number=Math.abs(parseFloat(touch1X-touch0X));
      if (this.state.pinchStarted==false){

        this.setState({initialPinchGap: pinchGap, pinchStarted:true});

      }
      else {
        this.setState({currentPinchGap: pinchGap, scopeWidth: pinchGap*5});
      }
    }


    console.log('this.state.initialPinchGap='+this.state.initialPinchGap);
    console.log('this.state.currentPinchGap='+this.state.currentPinchGap);
    console.log('this.state.scopeWidth='+this.state.scopeWidth);

  }




  render() {
    return (

        <View  {...this.panResponder.panHandlers} style={{flex: 1}}>
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
