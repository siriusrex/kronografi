/*
Kronografi main application component

*/

import React, { Component } from 'react';
import { AppRegistry, ScrollView,PanResponder, View} from 'react-native';
import MainView from './MainView';
import timeLineArrayData from './Data.json';

//scopeSpan is the length in time that the TimeScope is covering
//scopeWidth is the width in pixels of the TimeScope as it is displayed

export default class Kronografi extends Component {
  constructor(props){
    super(props);
    this.state={
      timeLineArray: timeLineArrayData['timeLineArray'],
      scopeWidth:2000,
      pinchStarted: false,
      initialPinchGap: 0,
      currentPinchGap:300
    };

    this.scopeSpan=0;
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


  }

  handlePanResponderMove(evt: Object, gestureState: Object){
    //when change to gesture, calculate pinch data
    if (evt.nativeEvent.touches.length>1){
      var touch1X:Number=parseFloat(evt.nativeEvent.touches[1].locationX);
      var touch0X:Number=parseFloat(evt.nativeEvent.touches[0].locationX);
      if (this.state.pinchStarted==false){

        this.setState({initialPinchGap: Math.abs(parseFloat(touch1X-touch0X)), pinchStarted:true});

      }
      else {
        this.setState({currentPinchGap: Math.abs(parseFloat(touch1X-touch0X))});
      }
    }


    console.log('this.state.initialPinchGap='+this.state.initialPinchGap);
    console.log('this.state.currentPinchGap='+this.state.currentPinchGap);

  }

  render() {
    timeLineArrayData["timeLineArray"].map(item=>{

      //loop over start times of timeLines in timeLineArray to get earliest start time, this becomes scopeSpan
      if (parseInt(item.start)>parseInt(this.scopeSpan)) {

        this.scopeSpan=parseInt(item.start);
      }
      console.log('Kronografi.render: after running, this.scopeSpan='+this.scopeSpan);

    });

    return (
      <View>
    
      <MainView timeLineArray={this.state.timeLineArray} scopeWidth={this.state.scopeWidth} scopeSpan={this.scopeSpan+10}/>
      </View>
    );

  }
}
